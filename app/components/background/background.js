// This component is from "PIXI-SEED" GitHub project
// Url: "https://github.com/edwinwebb/pixi-seed"

import { Sprite, Texture } from 'pixi.js';
import image from './soft.jpg';

class Background extends Sprite {
  constructor() {
    const bg = Texture.from(image);
    super(bg);
  }
}

const background = new Background();
export default background;
