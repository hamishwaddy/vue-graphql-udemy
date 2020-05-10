module.exports = {
  presets: ['@vue/app'],
  plugins: [
    [
      'component-scss', {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk/src',
        ext: '.scss',
      },
    ],
    'babel-plugin-istanbul',
  ],
};
