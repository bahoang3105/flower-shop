// @ts-nocheck

const withImages = require("next-images");
const withPlugins = require("next-compose-plugins");
const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = withPlugins([
  {
    sassOptions: {
      includePaths: [path.join(__dirname, "styles")],
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
]);

module.exports = nextConfig;
