import { Text, TextStyle } from 'pixi.js'

class LeaderBoardButton extends Text {
  constructor() {
    super('Leader Board');

    this.style = new TextStyle({
      font: 'bold italic',
      fill: '#F7EDCA',
      stroke: '#4a1850',
      fontSize: '20px',
      strokeThickness: 5,
      dropShadow: true,
      dropShadowColor: '#000000',
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 6,
    });

    this.enableButtonMode();
  }

  initPosition() {
    this.x = 800 - this.width;
    this.y = 600 - this.height;
  }

  enableButtonMode() {
    this.interactive = true;
    this.buttonMode = true;
  }

  remove() {
    this.parent.removeChild(this);
  }
}

const leaderBoardButton = new LeaderBoardButton();
export default leaderBoardButton;