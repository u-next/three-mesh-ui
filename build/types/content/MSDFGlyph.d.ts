/**
 * Job: create a plane geometry with the right UVs to map the MSDF texture on the wanted glyph.
 *
 * Knows: dimension of the plane to create, specs of the font used, glyph requireed
 */
export default class MSDFGlyph extends PlaneBufferGeometry {
    constructor(inline: any, font: any);
    /**
     * Compute the right UVs that will map the MSDF texture so that the passed character
     * will appear centered in full size
     * @private
     */
    private mapUVs;
    /** Set all UVs to 0, so that none of the glyphs on the texture will appear */
    nullifyUVs(): void;
    /** Gives the previously computed scale and offset to the geometry */
    transformGeometry(font: any, fontSize: any, char: any, inline: any): void;
}
import { PlaneBufferGeometry } from "three/src/geometries/PlaneGeometry";
