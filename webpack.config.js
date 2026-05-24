import pathPackage from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { fileURLToPath } from "node:url";
import ImageMinimizerPlugin from "image-minimizer-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = pathPackage.dirname(__filename);

export default {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: pathPackage.resolve(__dirname, "build"),
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/index.html", inject: "body" }),
  ],
  optimization: {
    minimizer: [
      "...",
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.sharpMinify,
          options: {
            encodeOptions: {
              // Customize your `sharp` options here
              // See https://sharp.pixelplumbing.com/api-output
              jpeg:{ quality:50 }
            },
          },
        },
      }),
    ],
  },
};
