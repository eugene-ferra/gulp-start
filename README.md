# Starter Gulp+Webpack config

This is a folders structure based on Gulp and Webpack that automates various tasks to streamline your development workflow. It combines essential functionalities to ease the process of creating, optimizing, and building web projects. From live reloading through Browsersync to image compression and conversion, from transpiling JavaScript code using Babel to minifying and bundling styles with SCSS support, this build system has got you covered.

## Features

- Local development server with live reloading powered by Browsersync.
- Image optimization and conversion to WebP format for improved performance.
- Transpiling JavaScript code to an older format using Babel for enhanced browser compatibility.
- Minification and concatenation of JavaScript files for reduced file sizes.
- Transpiling CSS files to an older format and minification for better cross-browser support.
- ES Modules support
- SCSS support for modular and maintainable styles.
- Easy project build for production-ready assets.
- Configured Prettier and ESlint for better code

## Getting Started

1. Clone this repository to your local machine or download the ZIP file and extract it.

```
    git clone https://github.com/eugene-ferra/gulp-start.git
```

2. Install all the dependencies using npm.

```
    npm install
```

## Usage

1. Run the development mode using comand below:

```
   npm start
```

2. Develop yours site.

   - You can add .html files in the /app folder.
   - Build any file structure you want in /scss, /js and /images folder
   - Use modules in .scss files and ESM in .js
   - Images are automatically optimized and converted to the .webp format during the build process.

3. If everything is done build the project using this comand:

```
    npm run build
```
