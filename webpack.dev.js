const merge = require("webpack-merge");
const common = require("./webpack.common.js");

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || "9000";

const KIE_SERVER = process.env.REACT_APP_KIE_SERVER_URL || "http://localhost:8080"

const Dotenv = require('dotenv-webpack');

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    contentBase: "./dist",
    host: HOST,
    port: PORT,
    compress: true,
    inline: true,
    historyApiFallback: true,
    hot: true,
    overlay: true,
    open: true,
    proxy:  {
      '/services/rest/**': {
        'target': KIE_SERVER + '/kie-server',
        'secure': false,
        'changeOrigin': true,
        'bypass': function(req, res, proxyOptions) {
          if(req.method === 'OPTIONS') {
            res.statusCode = 200
            return 'ok'
          }
        },
        'logLevel': 'debug',
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new Dotenv({
      path: './.env.development',
      safe: true,
      systemvars: true,
      defaults: true,
    })
  ]
});
