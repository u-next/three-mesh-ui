/**

Job:
- Set this component attributes and call updates accordingly
- Getting this component attribute, from itself or from its parents
- Managing this component's states

This is the core module of three-mesh-ui. Every component is composed with it.
It owns the principal public methods of a component : set, setupState and setState.

 */
export default function MeshUIComponent(Base: any): {
    new (options: any): {
        [x: string]: any;
        states: {};
        currentState: any;
        isUI: boolean;
        autoLayout: boolean;
        childrenUIs: any[];
        childrenBoxes: any[];
        childrenTexts: any[];
        childrenInlines: any[];
        parentUI: any;
        getClippingPlanes(): any[];
        /** Get the highest parent of this component (the parent that has no parent on top of it) */
        getHighestParent(): any;
        /**
         * look for a property in this object, and if does not find it, find in parents or return default value
         * @private
         */
        _getProperty(propName: any): any;
        getFontSize(): any;
        getFontKerning(): any;
        getLetterSpacing(): any;
        getFontTexture(): any;
        getFontFamily(): any;
        getBreakOn(): any;
        getWhiteSpace(): any;
        getTextAlign(): any;
        getTextType(): any;
        getFontColor(): any;
        getFontSupersampling(): any;
        getFontOpacity(): any;
        getFontPXRange(): any;
        getBorderRadius(): any;
        getBorderWidth(): any;
        getBorderColor(): any;
        getBorderOpacity(): any;
        /** return the first parent with a 'threeOBJ' property */
        getContainer(): any;
        /** Get the number of UI parents above this elements (0 if no parent) */
        getParentsNumber(i: any): any;
        getBackgroundOpacity(): any;
        getBackgroundColor(): any;
        getBackgroundTexture(): any;
        /**
         * @deprecated
         * @returns {string}
         */
        getAlignContent(): string;
        getAlignItems(): any;
        getContentDirection(): any;
        getJustifyContent(): any;
        getInterLine(): any;
        getOffset(): any;
        getBackgroundSize(): any;
        getHiddenOverflow(): any;
        getBestFit(): any;
        /**
         * Filters children in order to compute only one times children lists
         * @private
         */
        _rebuildChildrenLists(): void;
        /**
         * Try to retrieve parentUI after each structural change
         * @private
         */
        _rebuildParentUI: () => void;
        /**
         * When the user calls component.add, it registers for updates,
         * then call THREE.Object3D.add.
         */
        add(...args: any[]): any;
        /**
         * When the user calls component.remove, it registers for updates,
         * then call THREE.Object3D.remove.
         */
        remove(...args: any[]): any;
        update(updateParsing: any, updateLayout: any, updateInner: any): void;
        onAfterUpdate(): void;
        /**
         * Called by FontLibrary when the font requested for the current component is ready.
         * Trigger an update for the component whose font is now available.
         * @private - "package protected"
         */
        _updateFontFamily(font: any): void;
        fontFamily: any;
        /** @private - "package protected" */
        _updateFontTexture(texture: any): void;
        fontTexture: any;
        /**
         * Set this component's passed parameters.
         * If necessary, take special actions.
         * Update this component unless otherwise specified.
         */
        set(options: any): void;
        /** Store a new state in this component, with linked attributes */
        setupState(options: any): void;
        /** Set the attributes of a stored state of this component */
        setState(state: any): void;
        /** Get completely rid of this component and its children, also unregister it for updates */
        clear(): void;
        bestFit: any;
        hiddenOverflow: any;
    };
    [x: string]: any;
};
