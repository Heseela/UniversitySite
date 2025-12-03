function hexToRgb(hex: string): [number, number, number] {
    const raw = hex.replace(/^#/, '');
    const bigint = parseInt(raw, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
}

function relativeLuminance(r: number, g: number, b: number): number {
    const [R, G, B] = [r, g, b].map(c => {
        const v = c / 255;
        return v <= 0.03928
            ? v / 12.92
            : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

function contrastRatio(backgroundHex: string, foregroundHex: string): number {
    const [r1, g1, b1] = hexToRgb(backgroundHex);
    const [r2, g2, b2] = hexToRgb(foregroundHex);
    const L1 = relativeLuminance(r1, g1, b1);
    const L2 = relativeLuminance(r2, g2, b2);
    const lighter = Math.max(L1, L2);
    const darker = Math.min(L1, L2);
    return (lighter + 0.05) / (darker + 0.05);
}

export default contrastRatio;