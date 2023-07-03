declare namespace _default {
    export { getGlyphDimensions };
    export { getGlyphPairKerning };
    export { buildText };
}
export default _default;
/**

Job:
- Computing glyphs dimensions according to this component's font and content
- Create the text Mesh (call MSDFGlyph for each letter)

Knows:
- The Text component for which it creates Meshes
- The parameters of the text mesh it must return

 */
declare function getGlyphDimensions(options: any): {
    width: number;
    height: number;
    anchor: number;
    xadvance: number;
    xoffset: number;
};
/**
 * Try to find the kerning amount of a
 * @param font
 * @param {string} glyphPair
 * @returns {number}
 */
declare function getGlyphPairKerning(font: any, glyphPair: string): number;
/**
 * Creates a THREE.Plane geometry, with UVs carefully positioned to map a particular
 * glyph on the MSDF texture. Then creates a shaderMaterial with the MSDF shaders,
 * creates a THREE.Mesh, returns it.
 * @private
 */
declare function buildText(): Mesh<import("three").BufferGeometry, any>;
import { Mesh } from "three/src/objects/Mesh.js";
