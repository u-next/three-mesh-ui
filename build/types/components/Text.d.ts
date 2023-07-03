declare const Text_base: any;
/**

Job:
- computing its own size according to user measurements or content measurement
- creating 'inlines' objects with info, so that the parent component can organise them in lines

Knows:
- Its text content (string)
- Font attributes ('font', 'fontSize'.. etc..)
- Parent block

 */
export default class Text extends Text_base {
    [x: string]: any;
    constructor(options: any);
    isText: boolean;
    /**
     * Here we compute each glyph dimension, and we store it in this
     * component's inlines parameter. This way the parent Block will
     * compute each glyph position on updateLayout.
     */
    parseParams(): void;
    /**
     * Create text content
     *
     * At this point, text.inlines should have been modified by the parent
     * component, to add xOffset and yOffset properties to each inlines.
     * This way, TextContent knows were to position each character.
     */
    updateLayout(): void;
    textContent: any;
    updateInner(): void;
    calculateInlines(fontSize: any): void;
    inlines: {
        height: any;
        width: any;
        anchor: any;
        xadvance: any;
        xoffset: any;
        lineBreak: string;
        glyph: any;
        fontSize: any;
        lineHeight: number;
        lineBase: number;
    }[];
}
export {};
