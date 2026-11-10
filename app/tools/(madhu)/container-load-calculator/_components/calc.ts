// Container load maths. No imports, so node:test can run it directly. Sizes in mm, weights in kg inside this file.

export interface ContainerSpec {
    name: string
    /** Inside sizes in mm. */
    length: number
    width: number
    height: number
    /** Max payload in kg. */
    maxWeight: number
    /** Inside volume in m³. */
    volume: number
}

export const CONTAINERS: Record<string, ContainerSpec> = {
    custom: { name: "Custom Container", length: 0, width: 0, height: 0, maxWeight: 0, volume: 0 },
    // Inside size and max payload 28,130 kg (30,480 kg gross, 2,350 kg tare), per Hapag-Lloyd's 20' Standard spec:
    // https://www.hapag-lloyd.com/en/services-information/cargo-fleet/container/20-standard.html (checked 2026-11-10)
    "20ft": { name: "20ft Standard", length: 5900, width: 2352, height: 2395, maxWeight: 28130, volume: 33.2 },
    // Inside size and max payload 28,750 kg (32,500 kg gross, 3,750 kg tare), per Hapag-Lloyd's 40' Standard spec:
    // https://www.hapag-lloyd.com/en/services-information/cargo-fleet/container/40-standard.html (checked 2026-11-10)
    "40ft": { name: "40ft Standard", length: 12032, width: 2352, height: 2395, maxWeight: 28750, volume: 67.7 },
    // Max payload 28,600 kg (32,500 kg gross, 3,900 kg tare), per Hapag-Lloyd's 40' Standard High Cube spec:
    // https://www.hapag-lloyd.com/en/services-information/cargo-fleet/container/40-standard-high-cube.html
    "40hc": { name: "40ft High Cube", length: 12032, width: 2352, height: 2698, maxWeight: 28600, volume: 76.4 },
    "45hc": { name: "45ft High Cube", length: 13556, width: 2352, height: 2698, maxWeight: 27700, volume: 86.0 },
    "20rf": { name: "20ft Reefer", length: 5444, width: 2284, height: 2267, maxWeight: 27400, volume: 28.3 },
    "40rf": { name: "40ft Reefer", length: 11583, width: 2284, height: 2250, maxWeight: 27700, volume: 59.3 },
    "40hr": { name: "40ft HC Reefer", length: 11583, width: 2284, height: 2532, maxWeight: 29500, volume: 67.3 },
}

export const MM_PER_CM = 10
export const MM_PER_IN = 25.4
export const KG_PER_LB = 0.45359237

export interface LoadInput {
    container: ContainerSpec
    loadType: "loose" | "pallet"
    canRotate: boolean
    /** Carton sizes in mm and weight in kg (0 = not given). */
    carton: { length: number; width: number; height: number; weight: number }
    /** Pallet sizes in mm and its own weight in kg (0 = not given). Needed for pallet loading. */
    pallet?: { length: number; width: number; height: number; weight: number }
}

export interface LoadResult {
    units: number
    palletsCount: number
    boxesPerPallet: number
    layers: number
    limitedBy: "weight" | "space" | "none-fit"
    /** Cargo weight in kg, including the pallets' own weight. */
    totalWeight: number
    /** m³ */
    totalVolume: number
    /** % of the container's inside volume. */
    utilization: number
    arrangement: string
    noFit: boolean
}

function bestFit(cL: number, cW: number, cH: number, iL: number, iW: number, iH: number, canRotate: boolean) {
    const orientations = canRotate
        ? [[iL, iW, iH], [iL, iH, iW], [iW, iL, iH], [iW, iH, iL], [iH, iL, iW], [iH, iW, iL]]
        : [[iL, iW, iH]]
    let maxCount = 0
    let arrangement = ""
    for (const [a, b, c] of orientations) {
        const nL = Math.floor(cL / a)
        const nW = Math.floor(cW / b)
        const nH = Math.floor(cH / c)
        if (nL * nW * nH > maxCount) {
            maxCount = nL * nW * nH
            arrangement = `${nL}L × ${nW}W × ${nH}H`
        }
    }
    return { maxCount, arrangement }
}

const pos = (n: number) => Number.isFinite(n) && n > 0

/** Returns null until the container, carton (and pallet, for pallet loading) sizes are all above 0. */
export function containerLoad(i: LoadInput): LoadResult | null {
    const c = i.container
    const k = i.carton
    if (![c.length, c.width, c.height, c.maxWeight, k.length, k.width, k.height].every(pos)) return null
    const cartonWt = pos(k.weight) ? k.weight : 0
    const volume = c.volume > 0 ? c.volume : (c.length * c.width * c.height) / 1e9

    if (i.loadType === "loose") {
        const { maxCount, arrangement } = bestFit(c.length, c.width, c.height, k.length, k.width, k.height, i.canRotate)
        const byWeight = cartonWt > 0 ? Math.floor(c.maxWeight / cartonWt) : Infinity
        const units = Math.min(maxCount, byWeight)
        const totalVolume = (units * k.length * k.width * k.height) / 1e9
        return {
            units,
            palletsCount: 0,
            boxesPerPallet: 0,
            layers: 0,
            limitedBy: maxCount === 0 ? "none-fit" : byWeight < maxCount ? "weight" : "space",
            totalWeight: units * cartonWt,
            totalVolume,
            utilization: (totalVolume / volume) * 100,
            arrangement,
            noFit: maxCount === 0,
        }
    }

    const p = i.pallet
    if (!p || ![p.length, p.width, p.height].every(pos)) return null
    const palletWt = pos(p.weight) ? p.weight : 0
    const layer1 = Math.floor(p.length / k.length) * Math.floor(p.width / k.width)
    const layer2 = Math.floor(p.length / k.width) * Math.floor(p.width / k.length)
    const rotated = layer2 > layer1
    const boxesPerLayer = Math.max(layer1, layer2)
    const boxLayerText = rotated
        ? `${Math.floor(p.length / k.width)}L × ${Math.floor(p.width / k.length)}W`
        : `${Math.floor(p.length / k.length)}L × ${Math.floor(p.width / k.width)}W`
    const layers = Math.floor(Math.max(0, c.height - p.height) / k.height)
    const boxesPerPallet = boxesPerLayer * layers
    const loadedPalletWt = boxesPerPallet * cartonWt + palletWt
    const loadedHeight = p.height + layers * k.height

    const normal = Math.floor(c.length / p.length) * Math.floor(c.width / p.width) * Math.floor(c.height / loadedHeight)
    const turned = Math.floor(c.length / p.width) * Math.floor(c.width / p.length) * Math.floor(c.height / loadedHeight)
    const palletsBySpace = Math.max(normal, turned)
    const palletArr = normal >= turned
        ? `${Math.floor(c.length / p.length)}L × ${Math.floor(c.width / p.width)}W pallets`
        : `${Math.floor(c.length / p.width)}L × ${Math.floor(c.width / p.length)}W pallets`
    const palletsByWeight = loadedPalletWt > 0 ? Math.floor(c.maxWeight / loadedPalletWt) : Infinity
    const pallets = boxesPerPallet > 0 ? Math.min(palletsBySpace, palletsByWeight) : 0
    const units = pallets * boxesPerPallet
    const totalVolume = (pallets * p.length * p.width * p.height + units * k.length * k.width * k.height) / 1e9
    const noFit = palletsBySpace === 0 || boxesPerPallet === 0
    return {
        units,
        palletsCount: pallets,
        boxesPerPallet,
        layers,
        limitedBy: noFit ? "none-fit" : palletsByWeight < palletsBySpace ? "weight" : "space",
        totalWeight: pallets * loadedPalletWt,
        totalVolume,
        utilization: (totalVolume / volume) * 100,
        arrangement: `${palletArr} | Boxes: ${boxLayerText} per layer × ${layers} layers`,
        noFit,
    }
}
