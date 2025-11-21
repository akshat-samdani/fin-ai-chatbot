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

const EmploymentStatus = ({ onNext, selectedLang }: Props) => {
  const defaultStatuses = ['Student', 'Self Employed', 'Salaried', 'Retired'];
  const defaultHeading = 'I am';

  const [heading, setHeading] = useState(defaultHeading);
  const [statuses, setStatuses] = useState(defaultStatuses);

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
      translateText([defaultHeading, ...defaultStatuses], 'hi').then(([h, ...sts]) => {
        setHeading(h);
        setStatuses(sts);
      });
    } else {
      setHeading(defaultHeading);
      setStatuses(defaultStatuses);
    }
  }, [selectedLang]);

  return (
    <VStack space={8} alignItems="center" w="100%">
      <Heading size="lg">{heading}</Heading>
      <VStack space={4} w="100%">
        {statuses.map((status, idx) => (
          <Button
            key={status}
            size="lg"
            variant="outline"
            onPress={() => onNext('employment', defaultStatuses[idx].toLowerCase())}
          >
            {status}
          </Button>
        ))}
      </VStack>
    </VStack>
  );
};

export default EmploymentStatus;