const env = process.env.NODE_ENV;
const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");


module.exports = {
    output: {
        path: path.join(__dirname, "../wwwroot/dist"), // the bundle output path
        filename: "bundle.js", // the name of the bundle
    },
   
    devServer: {
        port: 3030, // you can change the port
    },
    module: {
        rules: [
            {
                test: /\.js$|jsx/, // .js and .jsx files
                exclude: /node_modules/, // excluding the node_modules folder
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
             
           
           
        ],
    },
    plugins: [
       
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default']
        }),
       
        new HtmlWebPackPlugin({
            inject: false,
            hash: true,
            template: "./public/index.html",
            filename: "index.html"
        })
    ]
};