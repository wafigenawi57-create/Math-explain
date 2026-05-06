import { 
  Box, 
  Hash, 
  Binary, 
  Divide, 
  Variable, 
  Triangle, 
  Calculator, 
  Equal, 
  Percent 
} from 'lucide-react';

export interface Question {
  id: string;
  question: string;
  options?: string[];
  answer: string;
  explanation: string;
  type: 'multiple-choice' | 'short-answer';
}

export interface Topic {
  id: number;
  title: string;
  icon: any;
  description: string;
  content: string; // Markdown supported
  formulae: { name: string; formula: string }[];
  quiz: Question[];
}

export const mathTopics: Topic[] = [
  {
    id: 1,
    title: "Properties of 3D Shapes",
    icon: Box,
    description: "Explore faces, edges, vertices, and calculations for volume and surface area.",
    content: "3D shapes have three dimensions: length, width, and height. Common shapes include cuboids, prisms, and pyramids.\n\n- **Faces**: The flat surfaces of a shape.\n- **Edges**: The lines where two faces meet.\n- **Vertices**: The corners where edges meet.\n\n**Prisms**: A 3D shape with a constant cross-section. The volume is calculated as: `Area of Cross-section × Length`.\n\n**Surface Area**: The total area of all faces added together.",
    formulae: [
      { name: "Volume of a Prism", formula: "Base Area × Length" },
      { name: "Surface Area", formula: "Sum of all face areas" }
    ],
    quiz: [
      {
        id: "q1-1",
        question: "A triangular prism has a cross-section area of 10 cm² and a length of 4 cm. What is its volume?",
        options: ["14 cm³", "40 cm³", "20 cm³", "6 cm³"],
        answer: "40 cm³",
        explanation: "Volume = Area of cross-section × length = 10 × 4 = 40 cm³.",
        type: 'multiple-choice'
      },
      {
        id: "q1-2",
        question: "How many faces does a cube have?",
        answer: "6",
        explanation: "A cube has 6 identical square faces.",
        type: 'short-answer'
      }
    ]
  },
  {
    id: 2,
    title: "Factors and Multiples",
    icon: Hash,
    description: "Learn about HCF, LCM, prime numbers, and factor trees.",
    content: "- **Factors**: Numbers that divide exactly into another number (e.g., factors of 6 are 1, 2, 3, 6).\n- **Multiples**: Numbers in a given number's times table (e.g., multiples of 5 are 5, 10, 15...).\n- **Highest Common Factor (HCF)**: The largest factor shared by two numbers.\n- **Least Common Multiple (LCM)**: The smallest multiple shared by two numbers.\n- **Prime Numbers**: Numbers with exactly two factors: 1 and itself.",
    formulae: [
      { name: "Prime Factorisation", formula: "Breaking a number down into prime products (e.g., 12 = 2² × 3)" }
    ],
    quiz: [
      {
        id: "q2-1",
        question: "What is the HCF of 24 and 36?",
        options: ["6", "8", "12", "72"],
        answer: "12",
        explanation: "Factors of 24: 1, 2, 3, 4, 6, 8, 12, 24. Factors of 36: 1, 2, 3, 4, 6, 9, 12, 18, 36. The largest common factor is 12.",
        type: 'multiple-choice'
      }
    ]
  },
  {
    id: 3,
    title: "Decimals and Place Value",
    icon: Binary,
    description: "Understand place value, rounding, and significant figures.",
    content: "Place value helps us understand the size of numbers. \n\n**Significant Figures (S.F.) rules**:\n1. Non-zero digits are always significant.\n2. Zeros between non-zero digits are significant.\n3. Leading zeros are NOT significant.\n4. Trailing zeros in a decimal are significant.",
    formulae: [
      { name: "Rounding", formula: "If the next digit is 5 or more, round up." }
    ],
    quiz: [
      {
        id: "q3-1",
        question: "Round 15.21 to the nearest tenth.",
        answer: "15.2",
        explanation: "The hundredths digit is 1 (less than 5), so we keep the tenths digit as 2.",
        type: 'short-answer'
      }
    ]
  },
  {
    id: 4,
    title: "Fractions and Decimals",
    icon: Divide,
    description: "Converting between fractions and decimals, including recurring decimals.",
    content: "- **Terminating Decimals**: Decimals that end (e.g., 0.5, 0.375).\n- **Recurring Decimals**: Decimals with a pattern that repeats forever (e.g., 0.333... written as 0.3̇).\n- **Mixed Numbers**: A whole number and a fraction (e.g., 2 ½).\n- **Improper Fractions**: Numerator is larger than denominator (e.g., 5/2).",
    formulae: [
      { name: "Conversion", formula: "Divide the numerator by the denominator (e.g., 3/8 = 0.375)" }
    ],
    quiz: [
      {
        id: "q4-1",
        question: "Convert 9/4 to a mixed number.",
        answer: "2 1/4",
        explanation: "4 goes into 9 twice with a remainder of 1. So 9/4 = 2 ¼.",
        type: 'short-answer'
      }
    ]
  },
  {
    id: 5,
    title: "Algebraic Expressions",
    icon: Variable,
    description: "Expanding brackets and simplifying expressions.",
    content: "Expanding brackets involves multiplying the term outside the bracket by every term inside.\n\nExample: `3(4a + 5) = 12a + 15`\n\nYou can also use algebra to describe areas of shapes. If a rectangle has sides `3a + 1` and `2a`, its area is `2a(3a + 1) = 6a² + 2a`.",
    formulae: [
      { name: "Distributive Law", formula: "a(b + c) = ab + ac" }
    ],
    quiz: [
      {
        id: "q5-1",
        question: "Expand: 2a(3a + 2)",
        options: ["6a + 4a", "6a² + 4a", "5a + 4", "6a² + 2"],
        answer: "6a² + 4a",
        explanation: "Multiply 2a by 3a (getting 6a²) and 2a by 2 (getting 4a).",
        type: 'multiple-choice'
      }
    ]
  },
  {
    id: 6,
    title: "Construction, Lines and Angles",
    icon: Triangle,
    description: "Angle properties in triangles, parallel lines, and bisector constructions.",
    content: "- **Angles in a Triangle**: Always add up to 180°.\n- **Exterior Angle**: The sum of the two opposite interior angles.\n- **Parallel Lines**:\n  - **Alternate Angles**: Form a 'Z' shape and are equal.\n  - **Corresponding Angles**: Form an 'F' shape and are equal.\n  - **Vertically Opposite Angles**: Are equal.",
    formulae: [
      { name: "Sum of Interior Angles", formula: "(n - 2) × 180°" }
    ],
    quiz: [
      {
        id: "q6-1",
        question: "If an isosceles triangle has one angle of 100°, what is the size of one of the other two equal angles?",
        answer: "40",
        explanation: "Total is 180°. 180 - 100 = 80°. Since it is isosceles, the other two are equal: 80 ÷ 2 = 40°.",
        type: 'short-answer'
      }
    ]
  },
  {
    id: 7,
    title: "Algebraic Formulae",
    icon: Calculator,
    description: "Substitution and rearranging formulas.",
    content: "Substitution is replacing variables with numbers to find a value.\nFormula rearrangement means changing the subject of the formula.\n\nExample: If `y = √w - 2`, then to make `w` the subject:\n1. Add 2: `y + 2 = √w`\n2. Square both sides: `(y + 2)² = w`",
    formulae: [
      { name: "Subject of Formula", formula: "Isolating the variable on one side" }
    ],
    quiz: [
      {
        id: "q7-1",
        question: "If y = 5x + 16, what is y when x = 2?",
        answer: "26",
        explanation: "y = 5(2) + 16 = 10 + 16 = 26.",
        type: 'short-answer'
      }
    ]
  },
  {
    id: 8,
    title: "Equations",
    icon: Equal,
    description: "Solving simple and simultaneous equations.",
    content: "To solve an equation, perform the same operation on both sides to isolate the variable.\n\n**Simultaneous Equations** can be solved by:\n1. Elimination (making coefficients the same and adding/subtracting).\n2. Substitution.",
    formulae: [
      { name: "Simultaneous Equations", formula: "Finding values that satisfy both equations at once" }
    ],
    quiz: [
      {
        id: "q8-1",
        question: "Solve for x: 36 / x = 4",
        answer: "9",
        explanation: "36 divided by 9 is 4.",
        type: 'short-answer'
      }
    ]
  },
  {
    id: 9,
    title: "Percentage Change",
    icon: Percent,
    description: "Calculating percentage increase and decrease.",
    content: "To increase/decrease by a percentage, you can use a multiplier.\n\n- **Increase by 4%**: Multiply by 1.04.\n- **Decrease by 15%**: Multiply by 0.85.\n\nExample: A coat costs $62.50. It increases by 4%. New cost = 62.50 × 1.04 = $65.",
    formulae: [
      { name: "Percentage Change", formula: "(Change / Original) × 100%" }
    ],
    quiz: [
      {
        id: "q9-1",
        question: "A baby weighs 4kg and increases its mass by 15% each month. What is its weight after 1 month?",
        answer: "4.6",
        explanation: "4 × 1.15 = 4.6 kg.",
        type: 'short-answer'
      }
    ]
  }
];
