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

const InsuranceTypeSelection = ({ onNext, selectedLang }: Props) => {
  const defaultTypes = [
    { display: 'Term Life Insurance', value: 'term' },
    { display: 'Whole Life Insurance', value: 'life' }
  ];
  const defaultHeading = 'Select Insurance Type';
  const defaultDesc = 'Choose the type of life insurance that fits your needs';

  const [heading, setHeading] = useState(defaultHeading);
  const [desc, setDesc] = useState(defaultDesc);
  const [types, setTypes] = useState(defaultTypes.map(t => t.display));

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
      translateText([defaultHeading, defaultDesc, ...defaultTypes.map(t => t.display)], 'hi').then(([h, d, ...ts]) => {
        setHeading(h);
        setDesc(d);
        setTypes(ts);
      });
    } else {
      setHeading(defaultHeading);
      setDesc(defaultDesc);
      setTypes(defaultTypes.map(t => t.display));
    }
  }, [selectedLang]);

  return (
    <VStack space={8} alignItems="center" w="100%">
      <Heading size="lg">{heading}</Heading>
      <Text textAlign="center" color="gray.600">
        {desc}
      </Text>
      <VStack space={4} w="100%">
        {types.map((type, idx) => (
          <Button
            key={defaultTypes[idx].value}
            size="lg"
            variant="outline"
            onPress={() => onNext('insuranceType', defaultTypes[idx].value)}
          >
            {type}
          </Button>
        ))}
      </VStack>
    </VStack>
  );
};

export default InsuranceTypeSelection;