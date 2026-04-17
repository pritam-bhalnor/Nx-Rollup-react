import { defineConfig } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import replace from '@rollup/plugin-replace';
import html from '@rollup/plugin-html';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import fs from 'fs';

const isDev = process.env.ROLLUP_WATCH;

const htmlPlugin = () => {
    return html({
        title: 'Framework Demo',
        template: ({ attributes, files, meta, publicPath, title }) => {
            const scripts = (files.js || []).map(({ fileName }) => `<script type="module" src="/${fileName}"></script>`).join('\n');
            const links = (files.css || []).map(({ fileName }) => `<link rel="stylesheet" href="/${fileName}">`).join('\n');
            let template = fs.readFileSync('./index.html', 'utf8');
            template = template.replace('</head>', `${links}\n</head>`);
            template = template.replace('</body>', `${scripts}\n</body>`);
            // Strip out vite-specific things if they exist
            template = template.replace(/<script type="module" src="\/src\/main\.tsx"><\/script>/, '');
            return template;
        }
    });
};

export default defineConfig({
  input: 'src/main.tsx',
  output: {
    dir: 'dist',
    format: 'es',
    sourcemap: true,
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(isDev ? 'development' : 'production'),
      preventAssignment: true
    }),
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.app.json',
      sourceMap: true
    }),
    postcss({
      extract: true,
      minimize: !isDev
    }),
    htmlPlugin(),
    isDev && serve({
      contentBase: ['dist', 'public'],
      historyApiFallback: true,
      port: 4200
    }),
    isDev && livereload('dist')
  ]
});
