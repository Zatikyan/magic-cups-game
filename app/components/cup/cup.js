import { Sprite, Texture, Ticker } from 'pixi.js'
import ball from '../ball/ball';
import image from './cup.png';

export default class Cup extends Sprite {
  constructor(cupOptions) {
    const texture = Texture.from(image);
    super(texture);

    this.rising = false;
    this.rotating = false;

    // Ball options
    this.hasBall = false;
    this.ballPositions = {
      x: -100,
      y: -100
    }

    // Cup position variables in rotating circle
    this.leftAngle = Math.PI / 2;
    this.rightAngle = 3 * Math.PI / 2;
    this.centerX = null;
    this.centerY = null;
    this.radius = null;

    // Cup options: id, position, etc...
    this.options = cupOptions;

    // Call initial functions
    this.enableButtonMode();
    // this.addEventListeners();
    this.setPosition();
    this.setSizes();
  }

  remove() {
    this.parent && this.parent.removeChild(this);
  }

  // Ball functionality

  setBall() {
    this.hasBall = true;
  }

  showBall() {
    if (this.hasBall) {
      this.ballPositions = {
        x: this.position.x + this.width / 2 - ball.width / 2,
        y: this.position.y + this.height - ball.height - 2
      }
      ball.setPosition(this.ballPositions);
    }
  }

  hideBall() {
    if (this.hasBall) {
      ball.setPosition({ x: -100, y: -100 });
    }
  }

  // Rotation functionality

  moveTo(cup, callback) {
    this.movementCallback = callback;

    this.rotating = true;
    if (cup.position.x > this.position.x) {
      this.setPositionInCircle(cup, true);
      Ticker.shared.add(this.moveToRight, this);
      return;
    }
    this.setPositionInCircle(cup, false);
    Ticker.shared.add(this.moveToLeft, this);
  }

  moveToLeft() {
    if (this.leftAngle > (3 * Math.PI / 2)) {
      this.leftAngle = Math.PI;
      this.rotating = false;
      Ticker.shared.remove(this.moveToLeft, this);
      setTimeout(() => {
        this.movementCallback();
      }, 500)
      return;
    }

    const [x, y] = this.getXAndYCoordinates(this.leftAngle);

    this.position.set(x, y);
    this.leftAngle += Math.PI / 20;
  }

  moveToRight() {
    if (this.rightAngle > (5 * Math.PI / 2)) {
      this.rightAngle = 3 * Math.PI / 2;
      this.rotating = false;
      Ticker.shared.remove(this.moveToRight, this);
      setTimeout(() => {
        this.movementCallback();
      }, 500)
      return;
    }

    const [x, y] = this.getXAndYCoordinates(this.rightAngle);

    this.position.set(x, y);
    this.rightAngle += Math.PI / 20;
  }

  setPositionInCircle(cup, moveToRight) {
    this.radius = moveToRight ? (cup.position.x - this.position.x) / 2 : (this.position.x - cup.position.x) / 2;
    this.centerX = moveToRight ? this.position.x + this.radius : this.position.x - this.radius;
    this.centerY = this.position.y
  }

  getXAndYCoordinates(angle) {
    const xPos = this.radius * Math.sin(angle);
    const yPos = this.radius * -Math.cos(angle);

    return [
      this.centerX + Math.floor(xPos),
      this.centerY + Math.floor(yPos)
    ]
  }

  // Rise functionality

  riseUp(callback = () => { }) {
    this.rising = true;
    this.riseUpCallback = callback;
    this.showBall();
    this.yPosition = this.position.y - 40;
    Ticker.shared.add(this.animateUp, this);
  }

  riseDown() {
    this.yPosition = this.position.y + 40;
    Ticker.shared.add(this.animateDown, this);
  }

  animateUp() {
    if (this.yPosition === this.position.y) {
      Ticker.shared.remove(this.animateUp, this);
      if (this.onCupClickCallback) {
        this.onCupClickCallback(this.hasBall);
        return;
      }
      setTimeout(function () {
        this.riseDown();
      }.bind(this), 1000)
      return;
    }
    this.position.set(this.position.x, this.position.y - 2);
  }

  animateDown() {
    if (this.yPosition === this.position.y) {
      Ticker.shared.remove(this.animateDown, this);
      this.rising = false;
      this.hideBall();
      this.riseUpCallback();
      return;
    }
    this.position.set(this.position.x, this.position.y + 2);
  }

  // Initial functions

  enableButtonMode() {
    this.interactive = true;
    this.buttonMode = true;
  }

  onCupClick(callback) {
    this.onCupClickCallback = callback;
    if (!this.rising && !this.rotating) {
      this.riseUp(() => { });
    }
  }

  setPosition() {
    this.position.set(this.options.position.x, this.options.position.y);
    this.yPosition = this.options.position.y;
  }

  setSizes() {
    this.width = 100;
    this.height = 150
  }
}