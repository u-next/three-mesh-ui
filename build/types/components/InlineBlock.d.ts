declare const InlineBlock_base: any;
/**
 * Job:
 * - computing its own size according to user measurements or content measurement
 * - creating an 'inlines' object with info, so that the parent component can organise it along with other inlines
 *
 * Knows:
 * - Its measurements parameter
 * - Parent block
 */
export default class InlineBlock extends InlineBlock_base {
    [x: string]: any;
    constructor(options: any);
    isInlineBlock: boolean;
    size: Vector2;
    frame: Frame;
    parseParams(): void;
    inlines: {
        height: any;
        width: any;
        anchor: number;
        lineBreak: string;
    }[];
    /**
     * Create text content
     *
     * At this point, text.inlines should have been modified by the parent
     * component, to add xOffset and yOffset properties to each inlines.
     * This way, TextContent knows were to position each character.
     *
     */
    updateLayout(): void;
    updateInner(): void;
}
import { Vector2 } from "three/src/math/Vector2.js";
import Frame from "../content/Frame.js";
export {};
