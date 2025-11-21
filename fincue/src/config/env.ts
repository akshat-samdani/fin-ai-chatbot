import Constants from 'expo-constants';

interface EnvConfig {
  openaiApiKey: string | undefined;
  azureTranslatorKey: string | undefined;
  azureTranslatorEndpoint: string;
  azureTranslatorRegion: string;
}

// Get environment variables from Expo Constants
const getEnvConfig = (): EnvConfig => {
  const extra = Constants.expoConfig?.extra || {};

  return {
    openaiApiKey: extra.openaiApiKey || undefined,
    azureTranslatorKey: extra.azureTranslatorKey || '',
    azureTranslatorEndpoint: extra.azureTranslatorEndpoint || 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0',
    azureTranslatorRegion: extra.azureTranslatorRegion || 'norwayeast',
  };
};

export const env = getEnvConfig();

