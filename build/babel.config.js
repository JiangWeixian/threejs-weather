module.exports = function (modules) {
  const plugins = [
    [
      require.resolve('@babel/plugin-transform-typescript'),
      {
        isTSX: true,
      },
    ],
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }, 'ant'],
  ]
  return {
    presets: [
      require.resolve('@babel/preset-react'),
      [
        require.resolve('@babel/preset-env'),
        {
          modules,
          targets: {
            browsers: [
              'last 2 versions',
              'Firefox ESR',
              '> 1%',
              'ie >= 9',
              'iOS >= 8',
              'Android >= 4',
            ],
          },
        },
      ],
    ],
    plugins,
  }
}
