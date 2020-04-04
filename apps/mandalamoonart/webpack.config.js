const path = require('path');

module.exports = {
  webpack: config => {
    config.module.rules.push({
      test: /\.css$/,
      use: [
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: [
              require('tailwindcss')(
                path.resolve(__dirname, 'tailwind.js') // the absolute path of your tailwind.config.js
              ),
              require('autoprefixer')
            ]
          }
        }
      ],
      // the absolute path of the folder contains tailwind.css
      // I reuse tailwind.css across projects and libs so I put it in the workspace root
      // Maybe I should create a lib for it.
      include: path.resolve('./global') 
    });

    return config;
  }
};