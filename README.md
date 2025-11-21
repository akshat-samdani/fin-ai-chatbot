# Fincue - AI-Powered Financial Advisor Chatbot

A personalized financial advisory mobile application built with React Native and Expo that analyzes user profiles to provide tailored financial recommendations based on detected financial personas.

## 🎯 Project Overview

Fincue is an intelligent financial chatbot that guides users through an onboarding process to understand their financial situation and goals, then uses AI-powered persona detection to deliver personalized financial advice, recommendations, and actionable insights.

## ✨ Key Features

- **Multi-Step Onboarding Flow**: Collects comprehensive user information including:
  - Language preference (English/Hindi)
  - Demographics (gender, age, special abilities)
  - Employment status
  - Location
  - Financial goals
  - Insurance preferences (if applicable)

- **AI-Powered Persona Detection**: Automatically identifies financial personas based on user profile:
  - Student
  - Gen Z Professional
  - Women Entrepreneur
  - Senior Citizen
  - Urban Professional
  - Insurance Seeker (Term/Life)

- **Personalized Recommendations**: Provides category-specific financial recommendations with:
  - Priority levels (High/Medium/Low)
  - Detailed descriptions
  - Actionable item lists
  - Category-wise organization (Budgeting, Investment, Insurance, etc.)

- **Key Insights**: Delivers persona-specific financial insights to help users make informed decisions

- **Profile Management**: Allows users to update their profile and recalculate recommendations

## 🛠️ Tech Stack

- **Framework**: React Native with Expo (~53.0.20)
- **Language**: TypeScript
- **UI Library**: Native Base (^3.4.28)
- **State Management**: React Context API
- **Storage**: AsyncStorage for persistent data
- **Icons**: Lucide React Native, Expo Vector Icons
- **Chat UI**: Assistant UI React (@assistant-ui/react)
- **Internationalization**: i18next, react-i18next

## 📱 Platform Support

- iOS
- Android
- Web

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Emulator

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd fin-ai-chatbot/fincue
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Run on your preferred platform:
```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## 📂 Project Structure

```
fincue/
├── src/
│   ├── components/
│   │   ├── onboarding/          # Onboarding flow screens
│   │   │   ├── LanguageSelection.tsx
│   │   │   ├── GenderSelection.tsx
│   │   │   ├── AgeSelection.tsx
│   │   │   ├── EmploymentStatus.tsx
│   │   │   ├── LocationSelection.tsx
│   │   │   ├── GoalSelection.tsx
│   │   │   ├── InsuranceTypeSelection.tsx
│   │   │   └── OnboardingScreen.tsx
│   │   ├── MainApp.tsx          # Main app wrapper
│   │   └── FinancialResultsScreen.tsx  # Results display
│   ├── context/
│   │   └── UserContext.tsx      # Global state management
│   ├── services/
│   │   └── AIService.tsx        # Persona detection & recommendations
│   └── types/
│       └── userProfile.ts       # TypeScript interfaces
├── assets/                      # App icons and images
├── App.tsx                      # Root component
└── package.json
```

## 🎨 Features in Detail

### Onboarding Flow

The app guides users through 7-8 steps:
1. **Language Selection**: Choose between English and Hindi
2. **Gender Selection**: Identify gender
3. **Special Abilities**: Specify if specially abled
4. **Age Selection**: Select age range
5. **Employment Status**: Current employment situation
6. **Location**: Urban/Rural preference
7. **Financial Goal**: Primary financial objective
8. **Insurance Type** (if applicable): Term or Life insurance preference

### Persona Detection Logic

The AI service analyzes user responses to detect the most appropriate financial persona:

- **Insurance Seeker**: Users with insurance goals get specific term/life insurance recommendations
- **Student**: Identified by employment status
- **Gen Z**: Age-based detection (18-34 years)
- **Women Entrepreneur**: Self-employed female users
- **Elderly**: 45+ years
- **Urban Professional**: Salaried professionals in urban areas

### Recommendation Categories

Each persona receives recommendations across multiple categories:
- Budgeting & Money Management
- Investment Strategies
- Credit Building
- Insurance Planning
- Retirement Planning
- Tax Optimization
- Emergency Planning
- Estate Planning

## 🔧 Configuration

### Environment Variables

**⚠️ IMPORTANT: Before deploying to production, you MUST set up environment variables for API keys.**

The app uses the following environment variables:

#### Required for Production:

1. **Azure Translator API** (required for Hindi language support):
   - `AZURE_TRANSLATOR_KEY` - Your Azure Translator subscription key
   - `AZURE_TRANSLATOR_ENDPOINT` - Azure Translator API endpoint (default provided)
   - `AZURE_TRANSLATOR_REGION` - Azure region (default: `norwayeast`)

#### Optional:

2. **OpenAI API** (for enhanced AI capabilities):
   - `OPENAI_API_KEY` - Your OpenAI API key (currently uses rule-based detection)

### Setup Instructions

1. **Create a `.env` file** in the `fincue` directory:
   ```bash
   cd fincue
   touch .env
   ```

2. **Add your API keys** to the `.env` file:
   ```env
   # Azure Translator (Required for Hindi support)
   AZURE_TRANSLATOR_KEY=your_azure_translator_key_here
   AZURE_TRANSLATOR_ENDPOINT=https://api.cognitive.microsofttranslator.com/translate?api-version=3.0
   AZURE_TRANSLATOR_REGION=norwayeast

   # OpenAI (Optional - for enhanced AI)
   OPENAI_API_KEY=your_openai_api_key_here
   ```

3. **For Production Deployment:**

   - **Expo/EAS Build**: Use EAS Secrets:
     ```bash
     eas secret:create --scope project --name AZURE_TRANSLATOR_KEY --value your_key
     eas secret:create --scope project --name OPENAI_API_KEY --value your_key
     ```

   - **Standalone Builds**: Environment variables are automatically read from `.env` during build via `app.config.js`

4. **Verify the `.env` file is in `.gitignore`** (it should already be configured)

### Security Notes

- ✅ Never commit `.env` files to version control
- ✅ Use different API keys for development and production
- ✅ Rotate API keys regularly
- ✅ Use environment variable injection in CI/CD pipelines
- ✅ For Expo: Use EAS Secrets for production builds

The app configuration reads these variables via `expo-constants` and makes them available throughout the app via `src/config/env.ts`.

## 📝 Usage

1. **First Launch**: Users go through the onboarding process
2. **Profile Analysis**: App analyzes the profile and detects persona
3. **View Results**: Personalized recommendations and insights are displayed
4. **Update Profile**: Users can reset and update their profile anytime

## 🎯 Hackathon Focus

This project demonstrates:
- **User-Centric Design**: Intuitive onboarding flow
- **AI Integration**: Smart persona detection and personalization
- **Cross-Platform Development**: Single codebase for iOS, Android, and Web
- **Modern Tech Stack**: Latest React Native and Expo features
- **Accessibility**: Support for multiple languages and special needs

## 🤝 Contributing

This is a hackathon project. Contributions and improvements are welcome!

## 📄 License

0BSD License - See package.json for details

## 👥 Team

Built during Financial Inclusion Hackathon in our organization

---

**Note**: This application is for educational and demonstration purposes. For actual financial advice, please consult with certified financial advisors.
