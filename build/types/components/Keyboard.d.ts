declare const Keyboard_base: any;
/**
 * Job: high-level component that returns a keyboard
 */
export default class Keyboard extends Keyboard_base {
    [x: string]: any;
    constructor(options: any);
    currentPanel: number;
    isLowerCase: boolean;
    charsetCount: number;
    keys: any[];
    panels: Block[];
    /**
     * Used to switch to an entirely different panel of this keyboard,
     * with potentially a completely different layout
     */
    setNextPanel(): void;
    setNextCharset(): void;
    /** Toggle case for characters that support it. */
    toggleCase(): void;
    parseParams(): void;
    updateLayout(): void;
    updateInner(): void;
}
import Block from "./Block.js";
export {};
