const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const NODE_ENV = process.env.NODE_ENV;
let config = {
    entry: './client/src/index.js',
    mode: NODE_ENV,
    output: {
        path: path.join(__dirname + '/client/public/js'),
        filename: "main.js"
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
        //     { test: /.css$/, loaders: 'style-loader!css-loader' },
        //     {
        //     test: /.(js|jsx)$/,
        //     use: 'babel-loader',
        //     exclude: /node_modules/
        //  },
        // {
        //     test: /.(js|jsx)$/,
        //     exclude: /(node_modules|bower_components)/,
        //     use: {
        //       loader: 'babel-loader',
        //       options: {
        //         presets: ["@babel/preset-react"],
        //         plugins: [ "@babel/plugin-proposal-class-properties"]
        //       }
        //     }
        //   }
        { test: /.css$/, loaders: 'style-loader!css-loader' },
        {
            test: /\.(js|jsx)$/,
            exclude: /\.(node_modules|bower_components)$/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ["@babel/preset-react"],
                plugins: [ "@babel/plugin-proposal-class-properties" ]
              }
            }
          },
          {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 1000,
                        mimetype: 'application/font-woff'
                    }
                }

            ]
        },
        {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'file-loader'
        },
        {
            use: ExtractTextPlugin.extract({
              use: ['css-loader', 'less-loader']
            }),
            test: /\.less$/
          },
          {
            test: /\.jpe?g$|\.gif$|\.ico$|\.png$|\.svg$/,
            use: 'file-loader?name=[name].[ext]?[hash]'
          },
      
          // the following 3 rules handle font extraction
          {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'url-loader?limit=10000&mimetype=application/font-woff'
          },
          
          {
            test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'file-loader'
          },
          {
          test: /\.otf(\?.*)?$/,
          use: 'file-loader?name=/fonts/[name].  [ext]&mimetype=application/font-otf'
          }
    ]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify(NODE_ENV)
          }
        })
    ],
    optimization: {
        minimize: false
    }

}

if (NODE_ENV === 'production') {
    config.plugins.push (
        //new webpack.optimize.OccurrenceOrderPlugin()
    )
}

module.exports = config