/**

Job:
- Routing the request for Text dimensions and Text creation depending on Text type.

Knows:
- this component's textType attribute

Note:
Only one Text type is natively supported by the library at the moment,
but the architecture allows you to easily stick in your custom Text type.
More information here :
https://github.com/felixmariotto/three-mesh-ui/wiki/Using-a-custom-text-type

 */
export default function TextManager(Base: any): {
    new (): {
        [x: string]: any;
        createText(): any;
        /**
         * Called by Text to get the dimensions of a particular glyph,
         * in order for InlineManager to compute its position
         */
        getGlyphDimensions(options: any): {
            width: number;
            height: number;
            anchor: number;
            xadvance: number;
            xoffset: number;
        };
        /**
         * Called by Text to get the amount of kerning for pair of glyph
         * @param textType
         * @param font
         * @param glyphPair
         * @returns {number}
         */
        getGlyphPairKerning(textType: any, font: any, glyphPair: any): number;
    };
    [x: string]: any;
};
