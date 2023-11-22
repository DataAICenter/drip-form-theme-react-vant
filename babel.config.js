module.exports = (api) => {
  const isTest = api.env('test');

  return {
    env: {
      test: {
        plugins: ['@babel/plugin-transform-modules-commonjs'],
      },
    },
    presets: [
      isTest
        ? '@babel/preset-env'
        : [
            '@babel/preset-env',
            {
              modules: false,
            },
          ],
      '@babel/preset-typescript',
      '@babel/preset-react',
    ],
    plugins: [
      '@babel/plugin-transform-runtime',
      [
        '@babel/plugin-proposal-decorators',
        {
          legacy: true,
        },
      ],
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-class-properties',
      'babel-plugin-typescript-to-proptypes',
    ],
    sourceMaps: true,
  };
};
