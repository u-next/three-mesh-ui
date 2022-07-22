/**

Job: nothing yet, but adding a isInline parameter to an inline component

Knows: parent dimensions

 */
export default function InlineComponent(Base: any): {
    new (options: any): {
        [x: string]: any;
        isInline: boolean;
    };
    [x: string]: any;
};
