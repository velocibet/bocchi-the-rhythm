import { pattern, stair, repeat } from "./patterns";

export const BPM = 184;
export const BEAT = 60000 / BPM;

export interface ChartNote {
  time: number;
  line: number;
}

export const testChart: ChartNote[] = [
    ...pattern({start: BEAT * 17, interval: BEAT / 2, lines: [0, 3, 1, 2]}),
    ...pattern({start: BEAT * 19, interval: BEAT / 2, lines: [0, 3, 1, 2]}),
    ...pattern({start: BEAT * 21, interval: BEAT / 2, lines: [0, 3, 1, 2]}),
    ...pattern({start: BEAT * 23, interval: BEAT / 2, lines: [0, 3, 1, 2]}),
    ...pattern({start: BEAT * 25, interval: BEAT / 2, lines: [0]}),
    ...pattern({start: BEAT * 25, interval: BEAT / 2, lines: [1]}),
    ...pattern({start: BEAT * 25.5, interval: BEAT / 2, lines: [2]}),
    ...pattern({start: BEAT * 25.5, interval: BEAT / 2, lines: [3]}),
    ...pattern({start: BEAT * 26, interval: BEAT / 2, lines: [0]}),
    ...pattern({start: BEAT * 26, interval: BEAT / 2, lines: [1]}),
    ...pattern({start: BEAT * 26.5, interval: BEAT / 2, lines: [2]}),
    ...pattern({start: BEAT * 26.5, interval: BEAT / 2, lines: [3]}),
    ...pattern({start: BEAT * 27, interval: BEAT / 2, lines: [0]}),
    ...pattern({start: BEAT * 27, interval: BEAT / 2, lines: [1]}),
    ...pattern({start: BEAT * 27.5, interval: BEAT / 2, lines: [2]}),
    ...pattern({start: BEAT * 27.5, interval: BEAT / 2, lines: [3]}),
    ...pattern({start: BEAT * 28, interval: BEAT / 2, lines: [0]}),
    ...pattern({start: BEAT * 28, interval: BEAT / 2, lines: [1]}),
    ...pattern({start: BEAT * 28.5, interval: BEAT / 2, lines: [2]}),
    ...pattern({start: BEAT * 28.5, interval: BEAT / 2, lines: [3]}),
    ...pattern({start: BEAT * 29, interval: BEAT / 2, lines: [0]}),
    ...pattern({start: BEAT * 29, interval: BEAT / 2, lines: [1]}),
    ...pattern({start: BEAT * 29.5, interval: BEAT / 2, lines: [2]}),
    ...pattern({start: BEAT * 29.5, interval: BEAT / 2, lines: [3]}),
    ...stair(BEAT * 30, BEAT / 4, [1, 0, 1, 2]),
    ...stair(BEAT * 31, BEAT / 4, [3, 2, 1, 0]),
    ...stair(BEAT * 32, BEAT / 4, [1, 2, 3, 2]),
    ...pattern({start: BEAT * 33, interval: BEAT / 4, lines: [1, 0]}),
];