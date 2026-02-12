module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Suppress source-map-loader warnings from html5-qrcode package
      webpackConfig.ignoreWarnings = [
        {
          module: /html5-qrcode/,
          message: /Failed to parse source map/
        }
      ];

      return webpackConfig;
    }
  }
};
