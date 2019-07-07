import { Text, Graphics, Container } from 'pixi.js';


class LeaderTextInput extends Container {

  constructor() {
    super();
    this.input = new Text(
      "Enter your name...",
      { "fill": "#FFFFFF" }
    );

    this.input.x = 210;
    this.input.y = 42;

    this.initBackground();
    this.initDomField();

    this.focused = false;

    this.background.interactive = true;

    this.addEventListeners();
  }

  getValue() {
    return this.input.text;
  }

  show(stage) {
    stage.addChild(this.background);
    stage.addChild(this.backgroundFocused);
    stage.addChild(this.input);
    this.initDomField();
    this.addEventListeners();
  }

  close(stage) {
    stage.removeChild(this.background);
    stage.removeChild(this.backgroundFocused);
    stage.removeChild(this.input);
    document.getElementsByTagName('input')[0] && document.getElementsByTagName('input')[0].remove();
  }

  initDomField() {
    this.domField = document.createElement("input");
    this.domField.type = "text";
    this.domField.style.position = "absolute";
    document.body.appendChild(this.domField);
    this.domField.style.width = '400px';
    this.domField.style.height = '40px';
    this.domField.style.top = '95px';
    this.domField.style.left = '452px';
    this.domField.style.background = 'transparent'
    this.domField.style.color = 'transparent'
    this.domField.style.border = 'none';
    this.domField.style.outline = 'none';
    this.domField.style.fontSize = '26px';
  }

  initBackground() {
    this.background = new Graphics();
    this.background
      .beginFill(0x222222)
      .drawRect(200, 40, 400, 40)
      .endFill();
    this.background.cacheAsBitmap = true;

    this.backgroundFocused = new Graphics();
    this.backgroundFocused
      .beginFill(0x555555)
      .drawRect(200, 40, 400, 40)
      .endFill();
    this.backgroundFocused.cacheAsBitmap = true;
    this.backgroundFocused.visible = false;
  }

  addEventListeners() {
    this.background.mousedown = this.click.bind(this);
    this.background.touchstart = this.click.bind(this);

    this.domField.onfocus = this.onFocus.bind(this);
    this.domField.onblur = this.onBlur.bind(this);

    this.domField.onkeyup = function () {
      this.input.text = this.domField.value;
    }.bind(this)
    this.domField.onkeydown = function () {
      this.input.text = this.domField.value;
    }.bind(this)
  }

  click() {
    this.domField.focus();
  }
  onFocus() {
    this.backgroundFocused.visible = true;
  }
  onBlur() {
    this.backgroundFocused.visible = false;
  }

  remove() {
    this.parent.removeChild(this);
  }
}

const leaderTextInput = new LeaderTextInput();
export default leaderTextInput;