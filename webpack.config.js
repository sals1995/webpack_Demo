const pathModule = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: pathModule.join(__dirname, "build"),
        assetModuleFilename: 'images/[name][ext]'
    }
    , mode: "production"
    , module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
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
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({ template: "src/index.html", inject: "body" }),
        new MiniCssExtractPlugin({filename:"style.min.css"})
    ],
    optimization: {
      minimizer: [
        // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
        `...`,
        new CssMinimizerPlugin()
        ,
        new ImageMinimizerPlugin({
            minimizer: {
              implementation: ImageMinimizerPlugin.sharpMinify,
              options: {
                encodeOptions: {
                  // Your options for `sharp`
                  // https://sharp.pixelplumbing.com/api-output
                },
              },
            },
          }),
      ],
    },
}