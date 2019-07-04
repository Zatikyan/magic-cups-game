// This component is from "PIXI-SEED" GitHub project
// Url: "https://github.com/edwinwebb/pixi-seed"

import { Sprite, Texture } from 'pixi.js';
import LINE from './line.png';
import { easing, tween } from 'popmotion';

export default class RedLine extends Sprite {
  constructor(x, y) {
    const texture = Texture.from(LINE);
    super(texture);
    const offset = this.randomRange(-500, 500);
    this.alpha = this.randomRange(0.2, 0.4);
    this.position.set(x, this.randomRange(y - 100, y + 200));
    this.scale.set(this.randomRange(0.8, 1.2), this.randomRange(0.7, 1.4));
    tween({
      from: this.y,
      to: y + offset,
      duration: this.randomRange(200000, 400000),
      ease: easing.easeInOut,
      flip: Infinity
    }).start(v => (this.position.y = v));
  }

  randomRange(m, x) {
    return Math.random() * (x - m) + m;
  }
}
