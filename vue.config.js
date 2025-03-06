module.exports = {
    publicPath: '/',  // Definiert den Basis-Pfad für das Projekt
    outputDir: 'dist',  // Definiert den Ordner für die Build-Dateien
    configureWebpack: {
      devServer: {
        historyApiFallback: true,  // Für Vue Router im history Mode
      },
    },
  };
  