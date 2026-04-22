module.exports = {
  mode: "production",
	entry: './src/js/main.js',
	output: {
    filename: '../static/js/bundle.js',
  },
	module: {
		rules: [
			{
				test: /.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				options: {
					presets: [require.resolve('@babel/preset-env')]
				}
			},
		],
	},
};
