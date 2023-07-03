/**

Job:
- Host the materials of a given component.
- Update a component's materials clipping planes.
- Update a material uniforms and such.

Knows:
- Its component materials.
- Its component ancestors clipping planes.

 */
export default function MaterialManager(Base: any): {
    new (options: any): {
        [x: string]: any;
        textUniforms: {
            u_texture: {
                value: any;
            };
            u_color: {
                value: any;
            };
            u_opacity: {
                value: any;
            };
            u_pxRange: {
                value: any;
            };
            u_useRGSS: {
                value: any;
            };
        };
        backgroundUniforms: {
            u_texture: {
                value: any;
            };
            u_color: {
                value: any;
            };
            u_opacity: {
                value: any;
            };
            u_backgroundMapping: {
                value: any;
            };
            u_borderWidth: {
                value: any;
            };
            u_borderColor: {
                value: any;
            };
            u_borderRadiusTopLeft: {
                value: any;
            };
            u_borderRadiusTopRight: {
                value: any;
            };
            u_borderRadiusBottomRight: {
                value: any;
            };
            u_borderRadiusBottomLeft: {
                value: any;
            };
            u_borderOpacity: {
                value: any;
            };
            u_size: {
                value: Vector2;
            };
            u_tSize: {
                value: Vector2;
            };
        };
        /**
         * Update backgroundMaterial uniforms.
         * Used within MaterialManager and in Block and InlineBlock innerUpdates.
         */
        updateBackgroundMaterial(): void;
        /**
         * Update backgroundMaterial uniforms.
         * Used within MaterialManager and in Text innerUpdates.
         */
        updateTextMaterial(): void;
        /** Called by Block, which needs the background material to create a mesh */
        getBackgroundMaterial(): ShaderMaterial;
        backgroundMaterial: ShaderMaterial;
        /** Called by Text to get the font material */
        getFontMaterial(): ShaderMaterial;
        fontMaterial: ShaderMaterial;
        /** @private */
        _makeTextMaterial(): ShaderMaterial;
        /** @private */
        _makeBackgroundMaterial(): ShaderMaterial;
        /**
         * Update a component's materials clipping planes.
         * Called every frame.
         */
        updateClippingPlanes(value: any): void;
        clippingPlanes: any;
    };
    [x: string]: any;
};
import { Vector2 } from "three/src/math/Vector2.js";
import { ShaderMaterial } from "three/src/materials/ShaderMaterial.js";
