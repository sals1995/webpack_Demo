const pathModule = require("path")
const htmlPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.min.js"
    , path: pathModule.resolve(__dirname, "build"),
    assetModuleFilename: 'images/[name][ext]'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use:  [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ]
  }
  , plugins: [
    new htmlPlugin(),
    new MiniCssExtractPlugin({ filename: "styles.css", }),
    new ImageMinimizerPlugin({
      minimizerOptions: {
        // Lossless optimization with custom option
        // Feel free to experiment with options for better result for you
        plugins: [
          ['gifsicle', { interlaced: true }],
          ['mozjpeg', { quality: 60 }],
          ['optipng', { optimizationLevel: 5 }],
          [
            'svgo',
            {
              plugins: [
                {
                  removeViewBox: false,
                },
              ],
            },
          ],
        ],
      },
    }),
    new CleanWebpackPlugin()
      , new CssMinimizerPlugin()
  ],
  optimization: {
    minimize: true,
    minimizer: [
      "..."
    ]
  }
}