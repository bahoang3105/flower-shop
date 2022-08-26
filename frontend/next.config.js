// @ts-nocheck

const { i18n } = require('./next-i18next.config');
const path = require('path');
const withSass = require('@zeit/next-sass');
const withImages = require('next-images');
const withPlugins = require('next-compose-plugins');

module.exports = withSass({
  cssModules: false,
});

module.exports = withPlugins([
  {
    i18n,
  },
  {
    sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
    },
  },
  {
    images: {
      disableStaticImages: true,
      domains: [],
      deviceSizes: [375, 720, 1080],
      imageSizes: [300, 600, 900],
    },
  },
  [withImages],
  {
    eslint: {
      dirs: ['pages', 'components'],
    },
  },
]);
