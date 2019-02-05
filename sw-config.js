// sw-config.js
module.exports = {
    minify: false,
    stripPrefix: 'public/',
    handleFetch: true,
    staticFileGlobs:
    [ './build/**/**.html',
      './build/static/js/*.js',
      './build/static/css/*.css',
      './build/static/media/**',
      './build/locales/en/*.json',
      './build/locales/fr/*.json',
      './build/ico/*.png',
      ],
   stripPrefix: './build',
   directoryIndex: 'index.php',

  };