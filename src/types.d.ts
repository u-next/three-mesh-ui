import type { Color, Object3D } from "three";

declare module "three-mesh-ui";

interface SetupStateOptions<
	T extends BlockOptions | TextOptions | InlineBlockOptions
> {
	state: string;
	attributes: Partial<T>;
	onSet?: () => void;
}
class MeshUIComponent<
	T extends BlockOptions | TextOptions | InlineBlockOptions
> extends Object3D {
	constructor(options: T);
	isUI: true;
	set(options: Partial<T>): void;
	setupState(options: SetupStateOptions<T>): void;
	setState(state: string): void;
}

export type BlockOptions = {
	width: number;
	height: number;
	padding?: number;
	fontFamily?: string;
	fontTexture?: string;
	backgroundColor?: Color;
	backgroundOpacity?: number;
	borderRadius?:
		| number
		| [
				topLeft: number,
				topRight: number,
				bottomRight: number,
				bottomLeft: number
		  ];
	// @todo add missing properties
	[property: string]: any;
};

// implementsには強制力がないので　methodのついかが必要になる
// NG
// export declare class Block
// 	extends Object3D
// 	implements MeshUIComponent<BlockOptions>
// {
// 	constructor(options: BlockOptions); // object3Dのconstructorと違うのでoverrideしてる
// }

// 素直にMeshUIComponentsをextendするのがよさげ

export declare class Block extends MeshUIComponent<BlockOptions> {}

export type TextOptions = {
	// @todo add missing properties
	[property: string]: any;
};

export declare class Text extends MeshUIComponent<TextOptions> {}

export type InlineBlockOptions = {
	// @todo add missing properties
	[property: string]: any;
};

export declare class InlineBlock extends MeshUIComponent<InlineBlockOptions> {}

export type KeyboardOptions = {
	// @todo add missing properties
	[property: string]: any;
};

export declare class Keyboard extends Object3D {
	constructor(options: KeyboardOptions);
}

export declare namespace FontLibrary {
	export function setFontFamily(): void;

	export function setFontTexture(): void;

	export function getFontOf(): void;

	// @todo fix type
	export function addFont(...args: any[]): any;
}

export declare function update(): void;

declare global {
	namespace JSX {
		interface IntrinsicElements {
			block: any;
			text: any;
		}
	}
}
