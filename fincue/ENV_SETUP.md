# Environment Variables Setup Guide

This document outlines what environment variables need to be configured before deploying to production.

## Required Environment Variables

### Azure Translator API (Required for Hindi Language Support)

The app uses Azure Translator API for translating UI text to Hindi. You need to set these variables:

- `AZURE_TRANSLATOR_KEY` - Your Azure Translator subscription key
- `AZURE_TRANSLATOR_ENDPOINT` - API endpoint (default: `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0`)
- `AZURE_TRANSLATOR_REGION` - Azure region (default: `norwayeast`)

**Note:** If these are not set, Hindi translation will not work and the app will fall back to English.

### OpenAI API (Optional)

- `OPENAI_API_KEY` - Your OpenAI API key (currently the app uses rule-based persona detection)

## Setup Steps

### 1. Create `.env` file

In the `fincue` directory, create a `.env` file:

```bash
cd fincue
touch .env
```

### 2. Add your API keys

Add the following to your `.env` file:

```env
# Azure Translator (Required for Hindi support)
AZURE_TRANSLATOR_KEY=your_actual_key_here
AZURE_TRANSLATOR_ENDPOINT=https://api.cognitive.microsofttranslator.com/translate?api-version=3.0
AZURE_TRANSLATOR_REGION=norwayeast

# OpenAI (Optional)
OPENAI_API_KEY=your_actual_key_here
```

### 3. Verify `.env` is ignored

Make sure `.env` is in `.gitignore` (it should already be configured).

## Production Deployment

### For Expo/EAS Build

Use EAS Secrets to securely store environment variables:

```bash
# Install EAS CLI if not already installed
npm install -g eas-cli

# Login to Expo
eas login

# Create secrets
eas secret:create --scope project --name AZURE_TRANSLATOR_KEY --value your_key
eas secret:create --scope project --name AZURE_TRANSLATOR_REGION --value norwayeast
eas secret:create --scope project --name OPENAI_API_KEY --value your_key
```

EAS will automatically inject these secrets as environment variables during build.

### For Standalone Builds

Environment variables are automatically read from `.env` during build via `app.config.js`. Make sure your `.env` file is present when building.

## How It Works

1. **Development**: `app.config.js` loads `.env` using `dotenv` and makes variables available via `expo-constants`
2. **Access**: Components access variables through `src/config/env.ts` which reads from `Constants.expoConfig.extra`
3. **Production**: EAS Secrets or `.env` file values are injected during build

## Security Checklist

- ✅ `.env` file is in `.gitignore`
- ✅ Never commit API keys to version control
- ✅ Use different keys for development and production
- ✅ Rotate keys regularly
- ✅ Use EAS Secrets for Expo production builds

## Troubleshooting

### Translation not working
- Check if `AZURE_TRANSLATOR_KEY` is set correctly
- Verify the Azure Translator service is active in your Azure account
- Check network connectivity to Azure endpoints

### Environment variables not loading
- Ensure `.env` file exists in the `fincue` directory
- Restart Expo development server after creating/updating `.env`
- For production builds, verify EAS Secrets are set correctly

