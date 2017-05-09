import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import jsx from 'rollup-plugin-jsx';
import commonJs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';

export default {
  entry: 'src/index.js',
  format: 'cjs',
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    }),
    jsx( {factory: 'React.createElement'} ),
    commonJs(),
    uglify(),
  ],
  dest: 'build/bundle.js'
};
