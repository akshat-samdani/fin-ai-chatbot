import React, { useEffect, useState } from 'react';
import { VStack, Heading, Button } from 'native-base';
import axios from 'axios';

type Props = {
  onNext: (key: string, value: string) => void;
  selectedLang: 'english' | 'hindi';
};

import { env } from '../../config/env';

const AZURE_TRANSLATOR_KEY = env.azureTranslatorKey || '';
const AZURE_TRANSLATOR_ENDPOINT = env.azureTranslatorEndpoint;
const AZURE_REGION = env.azureTranslatorRegion;

const GenderSelection = ({ onNext, selectedLang }: Props) => {
  const defaultGenders = ['Male', 'Female', 'Others', 'Prefer Not to Say'];
  const defaultHeading = 'Gender';

  const [heading, setHeading] = useState(defaultHeading);
  const [genders, setGenders] = useState(defaultGenders);

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

  useEffect(() => {
    if (selectedLang === 'hindi') {
      translateText([defaultHeading, ...defaultGenders], 'hi').then(([h, ...gs]) => {
        setHeading(h);
        setGenders(gs);
      });
    } else {
      setHeading(defaultHeading);
      setGenders(defaultGenders);
    }
  }, [selectedLang]);

  return (
    <VStack space={8} alignItems="center" w="100%">
      <Heading size="lg">{heading}</Heading>
      <VStack space={4} w="100%">
        {genders.map((gender, idx) => (
          <Button
            key={gender}
            size="lg"
            variant="outline"
            onPress={() => onNext('gender', defaultGenders[idx].toLowerCase())}
          >
            {gender}
          </Button>
        ))}
      </VStack>
    </VStack>
  );
};

export default GenderSelection;