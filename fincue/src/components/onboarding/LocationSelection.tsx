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

const LocationSelection = ({ onNext, selectedLang }: Props) => {
  const defaultLocations = ['Rural', 'Semi-urban', 'Urban'];
  const defaultHeading = 'I live in';

  const [heading, setHeading] = useState(defaultHeading);
  const [locations, setLocations] = useState(defaultLocations);

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
      translateText([defaultHeading, ...defaultLocations], 'hi').then(([h, ...locs]) => {
        setHeading(h);
        setLocations(locs);
      });
    } else {
      setHeading(defaultHeading);
      setLocations(defaultLocations);
    }
  }, [selectedLang]);

  return (
    <VStack space={8} alignItems="center" w="100%">
      <Heading size="lg">{heading}</Heading>
      <VStack space={4} w="100%">
        {locations.map((location, idx) => (
          <Button
            key={location}
            size="lg"
            variant="outline"
            onPress={() => onNext('location', defaultLocations[idx].toLowerCase())}
          >
            {location}
          </Button>
        ))}
      </VStack>
    </VStack>
  );
};

export default LocationSelection;