import React, { useState } from 'react';
import { VStack, Heading, Button } from 'native-base';
import axios from 'axios';

type Props = {
  onNext: (key: string, value: string) => void;
};

import { env } from '../../config/env';

const AZURE_TRANSLATOR_KEY = env.azureTranslatorKey || '';
const AZURE_TRANSLATOR_ENDPOINT = env.azureTranslatorEndpoint;
const AZURE_REGION = env.azureTranslatorRegion;

const LanguageSelection = ({ onNext }: Props) => {
  const [selectedLang, setSelectedLang] = useState<'english' | 'hindi'>('english');
  const [heading, setHeading] = useState('Language');
  const [hindiLabel, setHindiLabel] = useState('Hindi');
  const [englishLabel, setEnglishLabel] = useState('English');

  const translateText = async (texts: string[], to: string) => {
    try {
      const response = await axios.post(
        `${AZURE_TRANSLATOR_ENDPOINT}&to=${to}`,
        texts.map(text => ({ Text: text })),
        {
          headers: {
            'Ocp-Apim-Subscription-Key': AZURE_TRANSLATOR_KEY,
            'Ocp-Apim-Subscription-Region': AZURE_REGION,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data.map((item: any) => item.translations[0].text);
    } catch (error) {
      console.error('Translation error:', error);
      return texts;
    }
  };

  const handleSelect = async (lang: 'english' | 'hindi') => {
    setSelectedLang(lang);
    if (lang === 'hindi') {
      const [h, hi, en] = await translateText(['Language', 'Hindi', 'English'], 'hi');
      setHeading(h);
      setHindiLabel(hi);
      setEnglishLabel(en);
    } else {
      setHeading('Language');
      setHindiLabel('Hindi');
      setEnglishLabel('English');
    }
    onNext('language', lang);
  };

  return (
    <VStack space={8} alignItems="center" w="100%">
      <Heading size="lg">{heading}</Heading>
      <VStack space={4} w="100%">
        <Button 
          size="lg" 
          variant={selectedLang === 'hindi' ? "solid" : "outline"}
          onPress={() => handleSelect('hindi')}
        >
          {hindiLabel}
        </Button>
        <Button 
          size="lg" 
          variant={selectedLang === 'english' ? "solid" : "outline"}
          onPress={() => handleSelect('english')}
        >
          {englishLabel}
        </Button>
      </VStack>
    </VStack>
  );
};

export default LanguageSelection;