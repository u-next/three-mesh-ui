declare const Block_base: any;
/**

Job:
- Update a Block component
- Calls BoxComponent's API to position its children box components
- Calls InlineManager's API to position its children inline components
- Call creation and update functions of its background planes

 */
export default class Block extends Block_base {
    [x: string]: any;
    constructor(options: any);
    isBlock: boolean;
    size: Vector2;
    frame: Frame;
    parseParams(): void;
    updateLayout(): void;
    updateInner(): void;
}
import { Vector2 } from "three/src/math/Vector2.js";
import Frame from "../content/Frame.js";
export {};
