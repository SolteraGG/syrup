const { resolve } = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

// set env
if (process.env.NODE_ENV === undefined) {
	console.log("\n'NODE_ENV' is undefined - falling back to 'development'.\n");
	process.env.NODE_ENV = "development";
}

module.exports = {
	context: resolve(__dirname, "../src"),

	resolve: {
		alias: {
			assets: resolve(__dirname, "../src/assets/"),
		},
		extensions: [".ts", ".tsx", ".js", ".json"],
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: resolve(__dirname, "../src/index.html"),
			title: "webpack-eslint-config",
			filename: resolve(__dirname, "../dist/index.html"),
		}),

		new ForkTsCheckerWebpackPlugin({
			typescript: { configFile: `${__dirname}/../tsconfig.json` },
		}),
	],

	module: {
		rules: [
			{
				test: /\.(j|t)sx?$/,
				use: ["babel-loader", "source-map-loader"],
				exclude: /node_modules/,
			},
			{
				test: /\.s(a|c)ss$/,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
			{
				test: /\.(png|webp|jpg)$/,
				loader: "url-loader",
				options: {
					limit: 8192,
				},
			},
			{
				test: /\.(png|webp|jpe?g|svg)$/,
				loader: "file-loader",
			},
		],
	},
};
