// rollup.config.js

import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import visualizer from "rollup-plugin-visualizer";

//TODO min
export default {
	input: "src/three-mesh-ui.js",
	output: [
		{
			format: "esm",
			file: "build/three-mesh-ui.esm.js",
			sourcemap: true,
		},
		{
			format: "cjs",
			file: "build/three-mesh-ui.cjs.js",
			sourcemap: true,
		},
	],
	external: ["three"],
	plugins: [
		resolve(),
		typescript({
			declaration: true,
			rootDir: "src",
			declarationDir: "build",
		}),
		visualizer(),
	],
};
