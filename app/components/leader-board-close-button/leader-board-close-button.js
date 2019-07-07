import { Sprite, Texture } from 'pixi.js'
import image from './close.png';

class LeaderBoardCloseButton extends Sprite {
  constructor() {
    super(Texture.from(image));

    this.enableButtonMode();
    this.initPosition();
  }

  initPosition() {
    this.x = 600 + this.width;
    this.y = this.height;
  }

  enableButtonMode() {
    this.interactive = true;
    this.buttonMode = true;
  }

  remove() {
    this.parent.removeChild(this);
  }
}

const leaderBoardCloseButton = new LeaderBoardCloseButton();
export default leaderBoardCloseButton;