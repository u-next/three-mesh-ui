export default FontLibrary;
declare namespace FontLibrary {
    export { setFontFamily };
    export { setFontTexture };
    export { getFontOf };
    export { addFont };
}
/**

Called by MeshUIComponent after fontFamily was set
When done, it calls MeshUIComponent.update, to actually display
the text with the loaded font.

 */
declare function setFontFamily(component: any, fontFamily: any): void;
/**

Called by MeshUIComponent after fontTexture was set
When done, it calls MeshUIComponent.update, to actually display
the text with the loaded font.

 */
declare function setFontTexture(component: any, url: any): void;
/** used by Text to know if a warning must be thrown */
declare function getFontOf(component: any): any;
declare function addFont(name: any, json: any, texture: any): void;
