// This functionality is from "PIXI-SEED" GitHub project
// Url: "https://github.com/edwinwebb/pixi-seed"

import RedLine from '../components/redLine/redLine';

export default function renderLines() {
  const lines = [];
  const count = 60;
  for (let index = 0; index < count; index++) {
    const y = Math.sin(index * 2) * 100;
    const step = 800 / count * index;
    const l = new RedLine(step, y);
    lines.push(l);
  }
  return lines;
}