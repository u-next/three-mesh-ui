// rollup.config.js

import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';

//TODO min
export default {
	input: 'src/three-mesh-ui.js',
	output:[{
		format: 'esm',
		file: 'build/three-mesh-ui.esm.js',
		sourcemap: true,
	}],
	plugins: [
		resolve(),
		typescript({
			declaration: true,
			rootDir: "src",
			declarationDir:'build'
		})
	]
}
