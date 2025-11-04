const emptyNodes = [
    `<p class="leading-7"><br></p>`,
    `<p class="leading-7" style="text-align: start;"><br></p>`,
    `<p><br></p>`,
    `<p></p>`,
]

/**
 * Checks if the HTML is empty
 */
export default function isEmptyHTML(html: string) {
    return emptyNodes.includes(html?.trim());
}