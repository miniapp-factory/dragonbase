"use client";

import { useState, useEffect } from "react";
import Question from "./question";
import ProgressBar from "./progress-bar";
import Timer from "./timer";
import Results from "./results";
import { Button } from "./ui/button";

type QuestionType = {
  id: number;
  text: string;
  options: string[];
  answer: number; // index of correct option
  category: "verbal" | "numeric" | "spatial";
};

const QUICK_QUESTIONS: QuestionType[] = [
  {
    id: 1,
    text: "What comes next in the sequence: 2, 4, 8, 16, ...?",
    options: ["24", "32", "48", "64"],
    answer: 1,
    category: "numeric",
  },
  {
    id: 2,
    text: "Which shape is missing from the series?",
    options: ["Square", "Circle", "Triangle", "Pentagon"],
    answer: 3,
    category: "spatial",
  },
  // add 8 more sample questions...
];

const FULL_QUESTIONS: QuestionType[] = [
  // 40 sample questions (use the same pattern as QUICK_QUESTIONS)
  ...QUICK_QUESTIONS,
  // add more questions to reach 40...
];

export default function IQTest() {
  const [mode, setMode] = useState<"quick" | "full">("quick");
  const [questions, setQuestions] = useState<QuestionType[]>(QUICK_QUESTIONS);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [finished, setFinished] = useState(false);
  const [percentile, setPercentile] = useState(0);
  const [strengths, setStrengths] = useState<string[]>([]);

  useEffect(() => {
    if (mode === "full") setQuestions(FULL_QUESTIONS);
    else setQuestions(QUICK_QUESTIONS);
    setCurrent(0);
    setScore(0);
    setTimer(0);
    setFinished(false);
  }, [mode]);

  useEffect(() => {
    if (finished) return;
    const id = setInterval(() => setTimer((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [finished]);

  const handleAnswer = (selected: number) => {
    if (selected === questions[current].answer) setScore((s) => s + 1);
    if (current + 1 < questions.length) setCurrent((c) => c + 1);
    else finishTest();
  };

  const finishTest = () => {
    setFinished(true);
    const iq = Math.round(100 + (score / questions.length) * 50);
    setPercentile(Math.round((iq - 100) / 50 * 100));
    const categories = {
      verbal: 0,
      numeric: 0,
      spatial: 0,
    };
    questions.forEach((q, idx) => {
      if (idx < score) categories[q.category] += 1;
    });
    setStrengths(
      Object.entries(categories)
        .filter(([, v]) => v > 0)
        .map(([k]) => k)
    );
    localStorage.setItem(
      "iq-test-result",
      JSON.stringify({ iq, percentile, strengths })
    );
  };

  const retry = () => {
    setMode("quick");
    setQuestions(QUICK_QUESTIONS);
    setCurrent(0);
    setScore(0);
    setTimer(0);
    setFinished(false);
  };

  if (finished) {
    return <Results iq={Math.round(100 + (score / questions.length) * 50)} percentile={percentile} strengths={strengths} retry={retry} />;
  }

  return (
    <div className="w-full max-w-md mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center">
        <Button onClick={() => setMode(mode === "quick" ? "full" : "quick")}>
          {mode === "quick" ? "Full Test" : "Quick Test"}
        </Button>
        <Timer seconds={timer} />
      </div>
      <ProgressBar current={current + 1} total={questions.length} />
      <Question
        question={questions[current]}
        onAnswer={handleAnswer}
      />
    </div>
  );
}
