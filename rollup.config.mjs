import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

const format = process.env.FORMAT || 'esm';

const outputConfig = {
  esm: {
    dir: 'dist/esm',
    format: 'esm',
    sourcemap: true,
    preserveModules: true,
    preserveModulesRoot: 'src',
    entryFileNames: '[name].js',
  },
  cjs: {
    dir: 'dist/cjs',
    format: 'cjs',
    sourcemap: true,
    preserveModules: true,
    preserveModulesRoot: 'src',
    entryFileNames: '[name].js',
    exports: 'named',
  },
};

export default {
  input: 'src/index.ts',
  output: outputConfig[format],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: false,
      declarationDir: undefined,
      outDir: outputConfig[format].dir,
    }),
  ],
  external: ['react', 'react-dom', 'react/jsx-runtime'],
};
