// app.config.js
// This file reads environment variables from .env and makes them available via expo-constants
require('dotenv/config');

module.exports = {
  expo: {
    name: "fincue",
    slug: "fincue",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      // Environment variables accessible via Constants.expoConfig.extra
      openaiApiKey: process.env.OPENAI_API_KEY,
      azureTranslatorKey: process.env.AZURE_TRANSLATOR_KEY || '',
      azureTranslatorEndpoint: process.env.AZURE_TRANSLATOR_ENDPOINT || 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0',
      azureTranslatorRegion: process.env.AZURE_TRANSLATOR_REGION || 'norwayeast',
    }
  }
};

