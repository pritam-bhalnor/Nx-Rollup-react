import { defineConfig } from 'rollup';
import externals from 'rollup-plugin-node-externals';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';

export default defineConfig({
  input: ['src/index.ts'],
  output: { 
    dir: 'dist/esm', 
    format: 'es', 
    preserveModules: true,
    preserveModulesRoot: 'src',
    sourcemap: false
  },
  plugins: [
    externals(), 
    typescript({ tsconfig: './tsconfig.lib.json', outDir: 'dist/esm', declaration: true, declarationDir: 'dist/esm/types', sourceMap: false }), 
    postcss({ extensions: ['.css'], minimize: true })
  ]
});
