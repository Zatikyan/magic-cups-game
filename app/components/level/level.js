import { Text, TextStyle } from 'pixi.js'

class Level extends Text {

  constructor() {

    super(`Level: 0`);
    this.level = 0

    this.style = new TextStyle({
      fill: 0xff0000
    });
  }

  getLevel() {
    return this.level;
  }

  setLevel(l) {
    this.level = l;
  }

  setNewLevel() {
    this.level++;
    this.text = `Level: ${this.level}`;
  }
}

const level = new Level();
export default level;