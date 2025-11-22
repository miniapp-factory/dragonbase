"use client";

import { Button } from "./ui/button";

type Props = {
  iq: number;
  percentile: number;
  strengths: string[];
  retry: () => void;
};

export default function Results({ iq, percentile, strengths, retry }: Props) {
  return (
    <div className="space-y-4 text-center">
      <h2 className="text-2xl font-bold">Your IQ Score</h2>
      <p className="text-4xl font-extrabold">{iq}</p>
      <p className="text-muted-foreground">Percentile: {percentile}%</p>
      <p className="text-muted-foreground">
        Strengths: {strengths.join(", ")}
      </p>
      <Button onClick={retry}>Retry</Button>
      <Button variant="outline" onClick={() => alert("Share functionality not implemented")}>
        Share Result
      </Button>
    </div>
  );
}
