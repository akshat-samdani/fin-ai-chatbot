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

const GoalSelection = ({ onNext, selectedLang }: Props) => {
  const defaultGoals = [
    { display: 'Savings/Investing', value: 'savings' },
    { display: 'Insurance', value: 'insurance' },
    { display: 'Loan Repayment/New loan', value: 'loan' }
  ];
  const defaultHeading = 'What is your goal?';
  const defaultDesc = "We'll personalize your recommendations based on your financial goal";

  const [heading, setHeading] = useState(defaultHeading);
  const [desc, setDesc] = useState(defaultDesc);
  const [goals, setGoals] = useState(defaultGoals.map(g => g.display));

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
      translateText([defaultHeading, defaultDesc, ...defaultGoals.map(g => g.display)], 'hi').then(([h, d, ...gs]) => {
        setHeading(h);
        setDesc(d);
        setGoals(gs);
      });
    } else {
      setHeading(defaultHeading);
      setDesc(defaultDesc);
      setGoals(defaultGoals.map(g => g.display));
    }
  }, [selectedLang]);

  return (
    <VStack space={8} alignItems="center" w="100%">
      <Heading size="lg">{heading}</Heading>
      <Text textAlign="center" color="gray.600">
        {desc}
      </Text>
      <VStack space={4} w="100%">
        {goals.map((goal, idx) => (
          <Button
            key={defaultGoals[idx].value}
            size="lg"
            variant="outline"
            onPress={() => onNext('goal', defaultGoals[idx].value)}
          >
            {goal}
          </Button>
        ))}
      </VStack>
    </VStack>
  );
};

export default GoalSelection;