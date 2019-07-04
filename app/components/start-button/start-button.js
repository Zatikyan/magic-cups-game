import { Text, TextStyle } from 'pixi.js'

class StartButton extends Text {
  constructor() {
    super('Click to start!');

    this.style = new TextStyle({
      font: 'bold italic',
      fill: '#F7EDCA',
      stroke: '#4a1850',
      fontSize: '40px',
      strokeThickness: 5,
      dropShadow: true,
      dropShadowColor: '#000000',
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 6,
    });

    this.enableButtonMode();
  }

  initPosition() {
    this.x = 400 - this.width / 2;
    this.y = 300;
  }

  enableButtonMode() {
    this.interactive = true;
    this.buttonMode = true;
  }

  remove() {
    this.parent.removeChild(this);
  }
}

const startButton = new StartButton();
export default startButton;