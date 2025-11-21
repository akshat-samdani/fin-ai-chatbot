import React, { useEffect, useState } from 'react';
import { VStack, Heading, Button, Text } from 'native-base';
import axios from 'axios';

type Props = {
  onNext: (key: string, value: string) => void;
  selectedLang: 'english' | 'hindi';
};

import { env } from '../../config/env';

const AZURE_TRANSLATOR_KEY = env.azureTranslatorKey || '';
const AZURE_TRANSLATOR_ENDPOINT = env.azureTranslatorEndpoint;
const AZURE_REGION = env.azureTranslatorRegion;

const defaultAgeGroups = ['18-24', '25-34', '35-44', '45+'];
const defaultHeading = 'What is your age?';
const defaultDesc = 'We will personalise FinCue based on your answers';

const AgeSelection = ({ onNext, selectedLang }: Props) => {
  const [ageGroups, setAgeGroups] = useState(defaultAgeGroups);
  const [heading, setHeading] = useState(defaultHeading);
  const [desc, setDesc] = useState(defaultDesc);

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
      translateText(
        [defaultHeading, defaultDesc, ...defaultAgeGroups],
        'hi'
      ).then(([h, d, ...ages]) => {
        setHeading(h);
        setDesc(d);
        setAgeGroups(ages);
      });
    } else {
      setHeading(defaultHeading);
      setDesc(defaultDesc);
      setAgeGroups(defaultAgeGroups);
    }
  }, [selectedLang]);

  return (
    <VStack space={8} alignItems="center" w="100%">
      <Heading size="lg">{heading}</Heading>
      <Text textAlign="center">{desc}</Text>
      <VStack space={4} w="100%">
        {ageGroups.map((age, idx) => (
          <Button
            key={age}
            size="lg"
            variant="outline"
            onPress={() => onNext('age', defaultAgeGroups[idx])}
          >
            {age}
          </Button>
        ))}
      </VStack>
    </VStack>
  );
};

export default AgeSelection;