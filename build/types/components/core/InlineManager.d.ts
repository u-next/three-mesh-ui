export default function InlineManager(Base: any): {
    new (): {
        [x: string]: any;
        /** Compute children .inlines objects position, according to their pre-computed dimensions */
        computeInlinesPosition(): void;
        lines: any[][];
        calculateBestFit(bestFit: any): void;
        calculateGrowFit(): void;
        calculateShrinkFit(): void;
        calculateAutoFit(): void;
        /**
         * computes lines based on children's inlines array.
         * @private
         */
        computeLines(): any[][];
        calculateHeight(fontMultiplier: any): number;
        /**
         * Compute the width of a line
         * @param line
         * @returns {number}
         */
        computeLineWidth(line: any): number;
    };
    [x: string]: any;
};
