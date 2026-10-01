import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses"
import { NextRequest, NextResponse } from "next/server"

const sesClient = new SESClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
})

/**
 * Files the message as a ticket in the support inbox (admin.webscraper.pro), so contact-form questions
 * (plans, payments, anything) live with every other support request. Returns the ticket number, or null
 * when the admin app isn't configured or didn't answer; the email below goes out either way.
 */
async function fileTicket(req: NextRequest, fields: { name: string; email: string; subject?: string; message: string }) {
  const adminUrl = process.env.ADMIN_URL
  const secret = process.env.WEBSITE_INTAKE_SECRET
  if (!adminUrl || !secret) return null
  const form = new FormData()
  form.set("type", "other")
  form.set("source", "contact")
  form.set("subject", (fields.subject || "Inquiry via Website").slice(0, 150).padEnd(3, "."))
  form.set("description", fields.message.length >= 10 ? fields.message : `${fields.message} (sent from the contact form)`)
  form.set("email", fields.email)
  form.set("name", fields.name.slice(0, 100))
  try {
    const res = await fetch(`${adminUrl.replace(/\/+$/, "")}/api/public/tickets`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret}`,
        "X-Client-IP": req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "",
      },
      body: form,
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) {
      console.error("Support inbox refused the contact message:", res.status, await res.text())
      return null
    }
    return ((await res.json()) as { id?: number }).id ?? null
  } catch (error) {
    console.error("Support inbox unreachable:", error)
    return null
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message, captcha } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (!captcha) {
      return NextResponse.json({ error: "CAPTCHA token missing" }, { status: 400 })
    }

    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY
    if (!recaptchaSecret) {
      return NextResponse.json(
        { error: "Server configuration error: missing RECAPTCHA_SECRET_KEY" },
        { status: 500 }
      )
    }

    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${captcha}`
    const recaptchaRes = await fetch(verifyUrl, { method: "POST" })
    const recaptchaJson = await recaptchaRes.json()

    if (!recaptchaJson.success || recaptchaJson.score < 0.5) {
      return NextResponse.json(
        {
          error: `CAPTCHA verification failed: ${recaptchaJson["error-codes"]?.[0] || "low-score"}`,
        },
        { status: 400 }
      )
    }

    const ticketId = await fileTicket(req, { name, email, subject, message })

    const sourceEmail = process.env.AWS_SOURCE_EMAIL
    if (!sourceEmail) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }
    const toEmail: string = process.env.AWS_TO_EMAIL || sourceEmail

    const command = new SendEmailCommand({
      Source: sourceEmail,
      Destination: {
        ToAddresses: [toEmail],
      },
      ReplyToAddresses: [email],
      Message: {
        Subject: {
          Data: `${ticketId ? `[#${ticketId}] ` : ""}${subject || "Inquiry via Website"}`,
          Charset: "UTF-8",
        },
        Body: {
          Text: {
            Data: `You have received a new message from the contact form.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            Charset: "UTF-8",
          },
        },
      },
    })

    await sesClient.send(command)

    return NextResponse.json({ success: true, message: "Email sent successfully" })
  } catch (error) {
    console.error("Error in /api/contact:", error)
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    )
  }
}
