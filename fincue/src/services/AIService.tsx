export interface PersonaAnalysis {
  detectedPersona: string;
  confidence: number;
  recommendations: FinancialRecommendation[];
  insights: string[];
}

export interface FinancialRecommendation {
  category: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  actionItems: string[];
}

import { env } from '../config/env';

class AIService {
  private apiKey: string | null = null;

  constructor() {
    // Get API key from environment variables via expo-constants
    this.apiKey = env.openaiApiKey || null;
  }

  async analyzeUserProfile(userProfile: any): Promise<PersonaAnalysis> {
    // Mock delay to simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Generate persona analysis based on user profile
    return this.generatePersonaAnalysis(userProfile);
  }

  private generatePersonaAnalysis(userProfile: any): PersonaAnalysis {
    const { age, employment, goal, location, gender, insuranceType } = userProfile;
    
    // Simple persona detection logic
    let detectedPersona = 'general';
    let confidence = 85;

    // Special case for insurance goal
    if (goal === 'insurance') {
      detectedPersona = 'insurance_seeker';
      confidence = 95;
    } else if (employment === 'student') {
      detectedPersona = 'student';
      confidence = 95;
    } else if (age === '18-24' || age === '25-34') {
      detectedPersona = 'genz';
      confidence = 90;
    } else if (employment === 'self employed' && gender === 'female') {
      detectedPersona = 'women';
      confidence = 88;
    } else if (age === '45+') {
      detectedPersona = 'elderly';
      confidence = 92;
    } else if (employment === 'salaried' && location === 'urban') {
      detectedPersona = 'urban';
      confidence = 87;
    }

    return {
      detectedPersona,
      confidence,
      recommendations: this.getPersonaRecommendations(detectedPersona, userProfile),
      insights: this.getPersonaInsights(detectedPersona, userProfile)
    };
  }

  private getPersonaRecommendations(persona: string, userProfile: any): FinancialRecommendation[] {
    const recommendations: Record<string, FinancialRecommendation[]> = {
      insurance_seeker: [
        {
          category: 'Life Insurance',
          title: userProfile.insuranceType === 'term' ? 'Term Life Insurance Plan' : 'Whole Life Insurance Plan',
          description: userProfile.insuranceType === 'term' 
            ? 'Get maximum coverage at lowest cost with term insurance'
            : 'Build wealth while protecting your family with whole life insurance',
          priority: 'high',
          actionItems: userProfile.insuranceType === 'term' ? [
            'Calculate coverage needed (10-12x annual income)',
            'Compare term plans from top insurers',
            'Choose 20-30 year term based on your age',
            'Complete medical check-ups for better rates',
            'Consider increasing coverage with life changes'
          ] : [
            'Understand cash value vs death benefit',
            'Compare whole life vs universal life options',
            'Review investment component performance',
            'Plan for higher premiums vs term insurance',
            'Consider tax advantages of cash value growth'
          ]
        },
        {
          category: 'Health Insurance',
          title: 'Comprehensive Health Coverage',
          description: 'Protect against medical emergencies with adequate health insurance',
          priority: 'high',
          actionItems: [
            'Review employer health insurance options',
            'Consider family floater vs individual policies',
            'Add top-up/super top-up for higher coverage',
            'Include critical illness rider',
            'Maintain continuous coverage to avoid waiting periods'
          ]
        },
        {
          category: 'Emergency Planning',
          title: 'Financial Safety Net',
          description: 'Build emergency fund alongside insurance protection',
          priority: 'medium',
          actionItems: [
            'Save 6-12 months of expenses in liquid funds',
            'Keep insurance premiums in emergency budget',
            'Create beneficiary and nominee list',
            'Store all insurance documents securely',
            'Review and update coverage annually'
          ]
        }
      ],
      student: [
        {
          category: 'Budgeting',
          title: 'Student Budget Plan',
          description: 'Create a simple 50/30/20 budget focused on essential needs',
          priority: 'high',
          actionItems: [
            'Track all expenses for one month',
            'Use student discounts everywhere',
            'Set up automatic savings of $25/month',
            'Open a high-yield student savings account'
          ]
        },
        {
          category: 'Credit Building',
          title: 'Build Credit Early',
          description: 'Start building credit history with a student credit card',
          priority: 'medium',
          actionItems: [
            'Apply for a student credit card',
            'Keep utilization under 30%',
            'Set up automatic payments',
            'Monitor credit score monthly'
          ]
        },
        {
          category: 'Investment',
          title: 'Long-term Wealth Building',
          description: 'Start investing small amounts for compound growth',
          priority: 'low',
          actionItems: [
            'Open a Roth IRA with $500',
            'Invest in broad market index funds',
            'Use apps like Acorns for spare change',
            'Learn about compound interest'
          ]
        }
      ],
      genz: [
        {
          category: 'Digital Banking',
          title: 'Tech-Savvy Money Management',
          description: 'Use apps and digital tools for smart money management',
          priority: 'high',
          actionItems: [
            'Download Mint or YNAB for budgeting',
            'Set up automatic savings transfers',
            'Use cashback credit cards responsibly',
            'Track net worth monthly'
          ]
        },
        {
          category: 'Investment',
          title: 'App-Based Investing',
          description: 'Start investing through user-friendly mobile apps',
          priority: 'high',
          actionItems: [
            'Open account with Robinhood or Fidelity',
            'Start with broad market ETFs',
            'Invest consistently every month',
            'Follow reputable financial influencers'
          ]
        },
        {
          category: 'Side Hustles',
          title: 'Multiple Income Streams',
          description: 'Diversify income through digital opportunities',
          priority: 'medium',
          actionItems: [
            'Explore freelance opportunities',
            'Consider creating digital products',
            'Track business expenses separately',
            'Set aside taxes for side income'
          ]
        }
      ],
      women: [
        {
          category: 'Business Finance',
          title: 'Separate Business & Personal',
          description: 'Maintain clear financial boundaries for business success',
          priority: 'high',
          actionItems: [
            'Open separate business bank account',
            'Get business credit card',
            'Track all business expenses',
            'Set up business emergency fund'
          ]
        },
        {
          category: 'Retirement Planning',
          title: 'Self-Employed Retirement',
          description: 'Maximize retirement savings with SEP-IRA or Solo 401(k)',
          priority: 'high',
          actionItems: [
            'Open SEP-IRA or Solo 401(k)',
            'Contribute 20% of business income',
            'Automate retirement contributions',
            'Review contributions quarterly'
          ]
        },
        {
          category: 'Network & Support',
          title: 'Financial Community',
          description: 'Connect with other women entrepreneurs for support',
          priority: 'medium',
          actionItems: [
            'Join women entrepreneur groups',
            'Find a financial mentor',
            'Attend networking events',
            'Share knowledge with others'
          ]
        }
      ],
      elderly: [
        {
          category: 'Capital Preservation',
          title: 'Protect Your Wealth',
          description: 'Focus on preserving capital and generating steady income',
          priority: 'high',
          actionItems: [
            'Move to conservative investments',
            'Build bond ladder for income',
            'Keep 6-12 months in high-yield savings',
            'Review portfolio quarterly'
          ]
        },
        {
          category: 'Healthcare Planning',
          title: 'Healthcare Cost Management',
          description: 'Plan for increasing healthcare expenses',
          priority: 'high',
          actionItems: [
            'Review Medicare options annually',
            'Consider long-term care insurance',
            'Set up Health Savings Account',
            'Budget 15% for healthcare costs'
          ]
        },
        {
          category: 'Estate Planning',
          title: 'Legacy Planning',
          description: 'Ensure smooth transfer of wealth to beneficiaries',
          priority: 'medium',
          actionItems: [
            'Update will and beneficiaries',
            'Consider trust structures',
            'Organize financial documents',
            'Discuss plans with family'
          ]
        }
      ],
      urban: [
        {
          category: 'Tax Optimization',
          title: 'Maximize Tax Efficiency',
          description: 'Use all available tax-advantaged accounts and strategies',
          priority: 'high',
          actionItems: [
            'Max out 401(k) contributions',
            'Use HSA for triple tax advantage',
            'Consider backdoor Roth IRA',
            'Track tax-deductible expenses'
          ]
        },
        {
          category: 'Real Estate',
          title: 'Property Investment',
          description: 'Build wealth through real estate ownership',
          priority: 'medium',
          actionItems: [
            'Save 20% down payment',
            'Research neighborhood trends',
            'Consider house hacking strategies',
            'Build real estate investment fund'
          ]
        },
        {
          category: 'Advanced Investing',
          title: 'Diversified Portfolio',
          description: 'Build sophisticated investment portfolio',
          priority: 'medium',
          actionItems: [
            'Diversify across asset classes',
            'Consider international exposure',
            'Rebalance portfolio quarterly',
            'Review investment fees annually'
          ]
        }
      ]
    };

    return recommendations[persona] || recommendations.student;
  }

  private getPersonaInsights(persona: string, userProfile: any): string[] {
    const insights: Record<string, string[]> = {
      insurance_seeker: userProfile.insuranceType === 'term' ? [
        "Term insurance provides 10-20x more coverage than whole life for same premium",
        "Buy term insurance early - premiums increase significantly with age",
        "Online term plans are 40-60% cheaper than offline plans",
        "Term insurance premiums are tax deductible under Section 80C",
        "Consider increasing coverage with major life events (marriage, children, home purchase)"
      ] : [
        "Whole life insurance combines protection with forced savings",
        "Cash value grows tax-deferred but returns are typically 4-6% annually",
        "Premiums are 10-20x higher than term insurance for same coverage",
        "Consider whole life only if you've maxed other investment options",
        "Policy loans against cash value can provide tax-free income in retirement"
      ],
      student: [
        "Starting early gives you a 40-year head start on compound growth",
        "Even $50/month invested now could become $175,000 by retirement",
        "Student loan interest may be tax-deductible",
        "Building credit now will save thousands on future loans"
      ],
      genz: [
        "Your generation has the longest investment timeline - use it!",
        "Apps make investing accessible, but don't let convenience override strategy",
        "Social media financial advice needs verification - stick to fundamentals",
        "Multiple income streams provide security in the gig economy"
      ],
      women: [
        "Women entrepreneurs often under-invest in retirement - don't be one of them",
        "Business credit separation protects personal assets",
        "Women live longer on average - plan for higher retirement costs",
        "Networking with other women entrepreneurs accelerates success"
      ],
      elderly: [
        "Sequence of returns risk is your biggest threat in retirement",
        "Healthcare costs typically double every 10 years in retirement",
        "Social Security optimization can add $100,000+ to lifetime benefits",
        "Estate planning mistakes can cost families 40%+ in taxes"
      ],
      urban: [
        "High earners often lifestyle inflate - automate savings first",
        "Tax-advantaged accounts can save 25-35% on investments",
        "Urban real estate appreciation often beats inflation long-term",
        "Professional networking can unlock higher earning opportunities"
      ]
    };

    return insights[persona] || insights.student;
  }
}

export default new AIService();