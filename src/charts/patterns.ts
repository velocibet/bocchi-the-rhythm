interface ChartNote {
  time: number; // ms
  line: number; // 0~3
}

interface PatternOptions {
  start: number;
  interval: number;
  lines: number[];
}

export function pattern({ start, interval, lines }: PatternOptions): ChartNote[] {
  return lines.map((line, i) => ({
    time: start + i * interval,
    line,
  }));
}

export const stair = (start: number, interval: number, lines?: number[]) =>
  pattern({
    start,
    interval,
    lines: lines ?? [0, 1, 2, 3],
  });

export const repeat = (start: number, interval: number, line: number, count: number) =>
  pattern({
    start,
    interval,
    lines: Array(count).fill(line),
  });