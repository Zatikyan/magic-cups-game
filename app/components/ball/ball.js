import { Sprite, Texture } from 'pixi.js'
import image from './ball.png';

class Ball extends Sprite {
  constructor() {
    const texture = Texture.from(image);
    super(texture);

    this.setSizes();
    this.setPosition({ x: -100, y: -100 })
  }

  setPosition(positions) {
    this.position.set(positions.x, positions.y);
  }

  setSizes() {
    this.width = 35;
    this.height = 35;
  }
}

const ball = new Ball();
export default ball;