"use client";

import { Button } from "./ui/button";

type Props = {
  question: {
    id: number;
    text: string;
    options: string[];
    answer: number;
    category: string;
  };
  onAnswer: (selected: number) => void;
};

export default function Question({ question, onAnswer }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{question.text}</h2>
      <div className="grid gap-2">
        {question.options.map((opt, idx) => (
          <Button
            key={idx}
            variant="outline"
            onClick={() => onAnswer(idx)}
          >
            {opt}
          </Button>
        ))}
      </div>
    </div>
  );
}
