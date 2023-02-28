module.exports = {
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            'style.less-loader',
            'css-loader',
            'sass-loader',
          ],
        },
      ],
    },
  };
