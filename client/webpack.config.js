const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');



module.exports = {

    entry: './src/index.js',
    

    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js',
        assetModuleFilename: "assets/img/[hash][ext][query]",
        publicPath: '/',
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html',
            favicon:"./src/assets/img/logo.ico",
        }),
        new MiniCssExtractPlugin(),
    ],

    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                /**
                 * The `type` setting replaces the need for "url-loader"
                 * and "file-loader" in Webpack 5.
                 *
                 * setting `type` to "asset" will automatically pick between
                 * outputing images to a file, or inlining them in the bundle as base64
                 * with a default max inline size of 8kb
                 */
                type: "asset",
        
                /**
                 * If you want to inline larger images, you can set
                 * a custom `maxSize` for inline like so:
                 */
                // parser: {
                //   dataUrlCondition: {
                //     maxSize: 30 * 1024,
                //   },
                // },
              },
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader,
                    // This is required for asset imports in CSS, such as url()
                    options: { publicPath: "" },
                  },
                  "css-loader",
                  "postcss-loader",
                 
                  // according to the docs, sass-loader should be at the bottom, which
                  // loads it first to avoid prefixes in your sourcemaps and other issues.
                  "sass-loader",
                  
                ],
              },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [['@babel/preset-env',{ targets: "defaults" }], ['@babel/preset-react',{runtime:"automatic"}]]
                        }
                }
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx"],
      },

      devServer: {
        hot: true,
        port: 3000,
        historyApiFallback: true, 
        historyApiFallback: {
          disableDotRule: true
      },
      proxy: {
        '/api': 'http://localhost:8000',
          changeOrigin:true,
            
     },
     open:true,

 },

}