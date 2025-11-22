"use client";

type Props = {
  seconds: number;
};

export default function Timer({ seconds }: Props) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return (
    <div className="text-sm text-muted-foreground">
      {mins}:{secs < 10 ? `0${secs}` : secs}
    </div>
  );
}
