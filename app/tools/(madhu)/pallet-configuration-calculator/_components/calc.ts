// Pallet configuration maths. No imports, so node:test can run it directly. Sizes in inches.

/** Standard pallet deck thickness in inches, taken off the stack height. */
export const PALLET_HEIGHT = 5.5

export interface PalletInput {
    boxL: number
    boxW: number
    boxH: number
    palletL: number
    palletW: number
    /** Max stack height, pallet included. */
    maxHeight: number
    allowRotation: boolean
    /** Optional weights, all in the same unit; 0 = not given. */
    boxWeight?: number
    maxWeight?: number
    /** The empty pallet's own weight; counts toward maxWeight and the total. */
    palletWeight?: number
}

export interface PalletResult {
    unitsAlongLength: number
    unitsAlongWidth: number
    unitsPerLayer: number
    layers: number
    totalUnits: number
    areaEfficiency: number
    loadHeight: number
    orientation: string
    /** Boxes plus pallet; null without a box weight. */
    totalWeight: number | null
    weightLimited: boolean
}

const pos = (n: number | undefined): n is number => n !== undefined && Number.isFinite(n) && n > 0

/** Returns null until the box, pallet and height are all above 0. */
export function palletConfig(i: PalletInput): PalletResult | null {
    if (![i.boxL, i.boxW, i.boxH, i.palletL, i.palletW, i.maxHeight].every((n) => pos(n))) return null
    const bxWt = pos(i.boxWeight) ? i.boxWeight : 0
    const palWt = pos(i.palletWeight) ? i.palletWeight : 0
    const maxWt = pos(i.maxWeight) ? i.maxWeight : 0
    const availableHeight = i.maxHeight - PALLET_HEIGHT
    const { boxL: L, boxW: W, boxH: H } = i
    const orientations = i.allowRotation
        ? [
            { name: "Standard", l: L, w: W, h: H },
            { name: "Rotated 90°", l: W, w: L, h: H },
            { name: "On Side (L)", l: H, w: W, h: L },
            { name: "On Side (W)", l: L, w: H, h: W },
            { name: "On End (L)", l: H, w: L, h: W },
            { name: "On End (W)", l: W, w: H, h: L },
        ]
        : [{ name: "Standard", l: L, w: W, h: H }]

    let best: PalletResult = {
        unitsAlongLength: 0, unitsAlongWidth: 0, unitsPerLayer: 0, layers: 0, totalUnits: 0,
        areaEfficiency: 0, loadHeight: PALLET_HEIGHT, orientation: "Standard", totalWeight: null, weightLimited: false,
    }
    for (const o of orientations) {
        const uL = Math.floor(i.palletL / o.l)
        const uW = Math.floor(i.palletW / o.w)
        const perLayer = uL * uW
        if (perLayer === 0) continue
        let layers = availableHeight > 0 ? Math.floor(availableHeight / o.h) : 0
        let weightLimited = false
        if (bxWt > 0 && maxWt > 0) {
            const byWeight = Math.floor(Math.max(0, maxWt - palWt) / bxWt)
            const weightLayers = Math.floor(byWeight / perLayer)
            if (weightLayers < layers) {
                layers = weightLayers
                weightLimited = true
            }
        }
        const total = perLayer * layers
        const areaEfficiency = ((perLayer * o.l * o.w) / (i.palletL * i.palletW)) * 100
        const better =
            total > best.totalUnits ||
            (total === best.totalUnits && total > 0 && areaEfficiency > best.areaEfficiency) ||
            (best.totalUnits === 0 && total === 0 && perLayer > best.unitsPerLayer)
        if (better) {
            best = {
                unitsAlongLength: uL, unitsAlongWidth: uW, unitsPerLayer: perLayer, layers, totalUnits: total,
                areaEfficiency, loadHeight: layers * o.h + PALLET_HEIGHT, orientation: o.name,
                totalWeight: bxWt > 0 ? total * bxWt + palWt : null, weightLimited,
            }
        }
    }
    return best
}
