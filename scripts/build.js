const rollup = require('rollup').rollup;
const path = require('path');
const process = require('process');
const pkg = require('../package.json');
const progress = require('rollup-plugin-progress');
const babel = require('rollup-plugin-babel');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const postcss = require('rollup-plugin-postcss');
const typescript = require('@rollup/plugin-typescript');
const strip = require('@rollup/plugin-strip');
const { terser } = require('rollup-plugin-terser');
const clear = require('rollup-plugin-clear');

const outputPath = path.resolve(__dirname, '../dist');

// import process from "process";
// import pkg from "./package.json" assert { type: "json" };

// import progress from "rollup-plugin-progress";
// import babel from "rollup-plugin-babel";
// import nodeResolve from "rollup-plugin-node-resolve";
// import commonjs from "rollup-plugin-commonjs";
// import postcss from "rollup-plugin-postcss";
// import typescript from "@rollup/plugin-typescript";
// import strip from "@rollup/plugin-strip";
// import { terser } from "rollup-plugin-terser";
// import clear from "rollup-plugin-clear";
const env = process.env.NODE_ENV;
const isProd = env === 'production';

function getExternal(pkg) {
  const { dependencies = {}, peerDependencies = {} } = pkg;
  // 外部依赖包
  const externalPackage = [
    ...Object.keys(dependencies),
    ...Object.keys(peerDependencies),
  ];

  return (id) => {
    return externalPackage.some((item) => {
      // 避免不是package的包也在范围内
      const reg = new RegExp(`^${item}`, 'gi');
      return reg.test(id);
    });
  };
}

// rollup({
//   input: "src/index.ts",
//   output: [
//     {
//       file: path.resolve(outputPath, "index.js"),
//       format: "es",
//       sourcemap: true,
//       globals: {
//         react: "React",
//         "react-dom": "ReactDom",
//       },
//     },
//   ],
//   // external: ["react", "react-vant", "@jdfed/hooks"],
//   external: getExternal(pkg),
//   plugins: [
//     progress(),
//     clear({
//       targets: ["dist", "build-info"],
//       watch: true,
//     }),
//     nodeResolve({
//       extensions: [
//         ".ts",
//         ".tsx",
//         ".js",
//         ".jsx",
//         ".mjs",
//         ".json",
//         ".node",
//         ".styl",
//       ],
//     }),
//     typescript(),
//     commonjs(),
//     postcss({
//       extract: path.resolve(outputPath, `index.css`),
//     }),
//     babel({
//       extends: "./babel.config.js",
//       exclude: "**/node_modules/**",
//       runtimeHelpers: true,
//       plugins: ["@babel/plugin-external-helpers"],
//     }),
//     // 清除console.debugger
//     strip(),
//     isProd && terser(),
//   ],
// });

const inputOptions = {
  input: 'src/index.ts',
  external: getExternal(pkg),
  plugins: [
    progress(),
    clear({
      targets: ['dist', 'build-info'],
      watch: true,
    }),
    nodeResolve({
      extensions: [
        '.ts',
        '.tsx',
        '.js',
        '.jsx',
        '.mjs',
        '.json',
        '.node',
        '.styl',
      ],
    }),
    typescript(),
    commonjs(),
    postcss({
      extract: path.resolve(outputPath, `index.css`),
    }),
    babel({
      extends: './babel.config.js',
      exclude: '**/node_modules/**',
      runtimeHelpers: true,
      plugins: ['@babel/plugin-external-helpers'],
    }),
    // 清除console.debugger
    strip(),
    isProd && terser(),
  ],
};

const outputOptionsList = [
  {
    file: path.resolve('dist', 'index.js'),
    format: 'es',
    sourcemap: true,
    globals: {
      react: 'React',
      'react-dom': 'ReactDom',
    },
  },
];
async function build() {
  let bundle;
  let buildFailed = false;
  try {
    // 启动一次打包
    bundle = await rollup(inputOptions);

    // 一个文件名数组，表示此产物所依赖的文件
    console.log(bundle.watchFiles);
    await generateOutputs(bundle);
  } catch (error) {
    buildFailed = true;
    // 进行一些错误报告
    console.error(error);
  }
  if (bundle) {
    // 关闭打包过程
    await bundle.close();
  }
  process.exit(buildFailed ? 1 : 0);
}

async function generateOutputs(bundle) {
  for (const outputOptions of outputOptionsList) {
    // 生成特定于输出的内存中代码
    // 你可以在同一个 bundle 对象上多次调用此函数
    // 使用 bundle.write 代替 bundle.generate 直接写入磁盘
    const { output } = await bundle.write(outputOptions);

    // for (const chunkOrAsset of output) {
    //   if (chunkOrAsset.type === "asset") {
    //     console.log("Asset", chunkOrAsset);
    //   } else {
    //     console.log("Chunk", chunkOrAsset.modules);
    //   }
    // }
  }
}

build();
