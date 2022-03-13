require('esbuild').build({
  bundle: true,
  color: true,
  drop: ['console', 'debugger'],
  // define: {},
  entryPoints : ['./src/index.ts'],
  external: ['express'],
  format: 'esm',
  // inject: [],
  keepNames: true,
  loader: {
    '.ts': 'ts',
  },
  logLevel: 'warning',
  logLimit: 10,
  minify: false,
  outdir: './dist',
  // outfile: 'app.js',
  platform: 'node',
  sourcemap: true,
  splitting: true,
  target: 'es2017',
  treeShaking: true,
  tsconfig: './tsconfig.json',
  // watch: {
  //   onRebuild(error, result) {
  //     if (error) console.error('Watch build error:', error);
  //     else console.log('Watch build result:', result);
  //   }
  // },
  write: true,
}).then(_ => {
  console.log('Build Completed');
});