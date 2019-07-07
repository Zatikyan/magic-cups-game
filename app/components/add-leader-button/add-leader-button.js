import { Sprite, Texture } from 'pixi.js'
import image from './add-button.png';

class AddLeaderButton extends Sprite {
  constructor() {
    super(Texture.from(image));

    this.enableButtonMode();
    this.initPosition();
  }

  initPosition() {
    this.x = 600;
    this.y = 40;
  }

  enableButtonMode() {
    this.interactive = true;
    this.buttonMode = true;
  }

  remove() {
    this.parent && this.parent.removeChild(this);
  }
}

const addLeaderButton = new AddLeaderButton();
export default addLeaderButton;