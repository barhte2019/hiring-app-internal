const merge = require("webpack-merge");
const common = require("./webpack.common.js");

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || "9000";

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
        'target': 'https://kie-hiring-kieserver-rhpam-user1.apps.9194.openshift.opentlc.com',
        'secure': false,
        'changeOrigin': true,
        'bypass': function(req, res, proxyOptions) {
          console.info('Recevied at Proxy || ' + req.method + ' - ' + req.originalUrl);
          if(req.method === 'OPTIONS') {
            res.statusCode = 200
            return 'ok'
          }
        },
        /*'headers': {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Max-Age': '3600',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-id, Content-Length, X-Requested-With',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
        },*/
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
  }
});
