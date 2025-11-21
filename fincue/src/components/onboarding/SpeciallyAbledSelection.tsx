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

const SpeciallyAbledSelection = ({ onNext, selectedLang }: Props) => {
  const defaultOptions = ['Yes', 'No'];
  const defaultHeading = 'Specially abled?';

  const [heading, setHeading] = useState(defaultHeading);
  const [options, setOptions] = useState(defaultOptions);

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
      translateText([defaultHeading, ...defaultOptions], 'hi').then(([h, ...opts]) => {
        setHeading(h);
        setOptions(opts);
      });
    } else {
      setHeading(defaultHeading);
      setOptions(defaultOptions);
    }
  }, [selectedLang]);

  return (
    <VStack space={8} alignItems="center" w="100%">
      <Heading size="lg">{heading}</Heading>
      <VStack space={4} w="100%">
        {options.map((option, idx) => (
          <Button
            key={option}
            size="lg"
            variant="outline"
            onPress={() => onNext('speciallyAbled', defaultOptions[idx].toLowerCase())}
          >
            {option}
          </Button>
        ))}
      </VStack>
    </VStack>
  );
};

export default SpeciallyAbledSelection;