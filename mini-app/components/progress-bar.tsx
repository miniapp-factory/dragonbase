"use client";

type Props = {
  current: number;
  total: number;
};

export default function ProgressBar({ current, total }: Props) {
  const percent = Math.round((current / total) * 100);
  return (
    <div className="w-full bg-muted rounded-full h-2">
      <div
        className="bg-primary h-full rounded-full"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
