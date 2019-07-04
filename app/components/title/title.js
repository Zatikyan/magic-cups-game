import { Text, TextStyle } from 'pixi.js'

class Title extends Text {

  constructor() {
    super('Magic Cups Game');

    this.style = new TextStyle({
      font: 'bold italic Arial',
      fill: '#F7EDCA',
      stroke: '#4a1850',
      fontSize: '70px',
      strokeThickness: 5,
      dropShadow: true,
      dropShadowColor: '#000000',
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 6,
    });

    this.setPosition()
  }

  setPosition() {
    this.x = 400 - this.width / 2;
    this.y = 50;
  }

  remove() {
    this.parent.removeChild(this);
  }

  setFailedText() {
    this.text = 'You failed!';
    this.setPosition();
  }

  setSuccessText() {
    this.text = 'Right answer!';
    this.setPosition();
  }
}

const title = new Title();
export default title;