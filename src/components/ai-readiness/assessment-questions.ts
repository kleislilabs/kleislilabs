interface QuestionOption {
  value: string;
  label: string;
  description?: string;
}

interface Question {
  id: string;
  category: string;
  question: string;
  description?: string;
  type: "single" | "multi" | "scale";
  options?: QuestionOption[];
  scaleLabels?: {
    min: string;
    max: string;
  };
  scoring?: {
    max: number;
    values: Record<string, number>;
  };
}

export const assessmentQuestions: Question[] = [
  {
    id: "motivation",
    category: "Business Strategy",
    question: "What is your primary motivation for exploring AI?",
    type: "single",
    options: [
      { value: "cost_reduction", label: "Cost reduction and efficiency gains" },
      { value: "revenue_growth", label: "Revenue growth and new opportunities" },
      { value: "customer_experience", label: "Customer experience improvement" },
      { value: "competitive_advantage", label: "Competitive advantage" },
      { value: "regulatory_compliance", label: "Regulatory compliance" },
      { value: "exploring", label: "Exploring possibilities" }
    ],
    scoring: {
      max: 10,
      values: {
        "cost_reduction": 8,
        "revenue_growth": 10,
        "customer_experience": 9,
        "competitive_advantage": 9,
        "regulatory_compliance": 7,
        "exploring": 5
      }
    }
  },
  {
    id: "objectives_clarity",
    category: "Business Strategy",
    question: "How clear are your AI objectives?",
    type: "scale",
    scaleLabels: {
      min: "Just Starting",
      max: "Very Clear"
    },
    scoring: {
      max: 10,
      values: {
        "1": 2,
        "2": 4,
        "3": 6,
        "4": 8,
        "5": 10
      }
    }
  },
  {
    id: "business_functions",
    category: "Business Strategy",
    question: "Which business functions would benefit most from AI?",
    description: "Select up to 3 areas",
    type: "multi",
    options: [
      { value: "customer_service", label: "Customer Service" },
      { value: "sales", label: "Sales" },
      { value: "operations", label: "Operations" },
      { value: "marketing", label: "Marketing" },
      { value: "hr", label: "Human Resources" },
      { value: "finance", label: "Finance" },
      { value: "product", label: "Product Development" },
      { value: "other", label: "Other" }
    ],
    scoring: {
      max: 10,
      values: {
        "customer_service": 9,
        "sales": 9,
        "operations": 10,
        "marketing": 8,
        "hr": 7,
        "finance": 8,
        "product": 10,
        "other": 5
      }
    }
  },
  {
    id: "data_quality",
    category: "Data & Infrastructure",
    question: "How would you describe your data quality and accessibility?",
    type: "single",
    options: [
      { 
        value: "well_organized", 
        label: "Well-organized and easily accessible",
        description: "Data is clean, structured, and readily available"
      },
      { 
        value: "somewhat_structured", 
        label: "Somewhat structured with some gaps",
        description: "Most data is organized but needs some work"
      },
      { 
        value: "basic_systems", 
        label: "Basic systems, needs improvement",
        description: "Data exists but requires significant organization"
      },
      { 
        value: "limited_data", 
        label: "Limited data or poor organization",
        description: "Minimal data infrastructure in place"
      }
    ],
    scoring: {
      max: 10,
      values: {
        "well_organized": 10,
        "somewhat_structured": 7,
        "basic_systems": 4,
        "limited_data": 2
      }
    }
  },
  {
    id: "cloud_adoption",
    category: "Data & Infrastructure",
    question: "What is your current level of cloud adoption?",
    type: "single",
    options: [
      { value: "fully_cloud", label: "Fully cloud-based" },
      { value: "hybrid", label: "Hybrid (cloud and on-premise)" },
      { value: "mostly_onpremise", label: "Mostly on-premise" },
      { value: "no_cloud", label: "No cloud usage" }
    ],
    scoring: {
      max: 10,
      values: {
        "fully_cloud": 10,
        "hybrid": 8,
        "mostly_onpremise": 5,
        "no_cloud": 2
      }
    }
  },
  {
    id: "current_tools",
    category: "Data & Infrastructure",
    question: "Do you currently use any analytics or automation tools?",
    type: "single",
    options: [
      { 
        value: "advanced_tools", 
        label: "Yes, advanced analytics and ML tools",
        description: "Using tools like Python, R, TensorFlow, etc."
      },
      { 
        value: "basic_analytics", 
        label: "Yes, basic analytics tools",
        description: "Using Excel, Tableau, Power BI, etc."
      },
      { 
        value: "some_automation", 
        label: "Some automation but no analytics",
        description: "Basic workflow automation tools"
      },
      { 
        value: "no_tools", 
        label: "No significant tools in use",
        description: "Manual processes primarily"
      }
    ],
    scoring: {
      max: 10,
      values: {
        "advanced_tools": 10,
        "basic_analytics": 7,
        "some_automation": 4,
        "no_tools": 2
      }
    }
  },
  {
    id: "team_capabilities",
    category: "Skills & Culture",
    question: "Does your team have AI/data science capabilities?",
    type: "single",
    options: [
      { value: "strong_expertise", label: "Strong internal expertise" },
      { value: "some_capabilities", label: "Some capabilities, need more" },
      { value: "limited_knowledge", label: "Limited knowledge" },
      { value: "no_expertise", label: "No current expertise" }
    ],
    scoring: {
      max: 10,
      values: {
        "strong_expertise": 10,
        "some_capabilities": 7,
        "limited_knowledge": 4,
        "no_expertise": 2
      }
    }
  },
  {
    id: "leadership_support",
    category: "Skills & Culture",
    question: "How supportive is leadership of AI initiatives?",
    type: "scale",
    scaleLabels: {
      min: "Need Convincing",
      max: "Very Supportive"
    },
    scoring: {
      max: 10,
      values: {
        "1": 2,
        "2": 4,
        "3": 6,
        "4": 8,
        "5": 10
      }
    }
  },
  {
    id: "biggest_barrier",
    category: "Implementation Readiness",
    question: "What's your biggest barrier to AI adoption?",
    type: "single",
    options: [
      { value: "budget", label: "Budget constraints" },
      { value: "expertise", label: "Technical expertise" },
      { value: "data_quality", label: "Data quality" },
      { value: "roi_unclear", label: "Unclear ROI" },
      { value: "security", label: "Security concerns" },
      { value: "time", label: "Time constraints" }
    ],
    scoring: {
      max: 10,
      values: {
        "budget": 6,
        "expertise": 7,
        "data_quality": 5,
        "roi_unclear": 4,
        "security": 7,
        "time": 6
      }
    }
  },
  {
    id: "timeline",
    category: "Implementation Readiness",
    question: "What's your preferred timeline for AI implementation?",
    type: "single",
    options: [
      { value: "already_started", label: "Already started" },
      { value: "3_6_months", label: "3-6 months" },
      { value: "6_12_months", label: "6-12 months" },
      { value: "1_2_years", label: "1-2 years" },
      { value: "exploring", label: "Just exploring" }
    ],
    scoring: {
      max: 10,
      values: {
        "already_started": 10,
        "3_6_months": 9,
        "6_12_months": 7,
        "1_2_years": 5,
        "exploring": 3
      }
    }
  }
];