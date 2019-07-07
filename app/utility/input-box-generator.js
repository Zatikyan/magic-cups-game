import * as PIXI from 'pixi.js';
import image from '../components/text-input/tile.png';

export default function renderInputBox(w, h, state) {
  var box = new PIXI.Container()
  var sprite = new PIXI.TilingSprite(PIXI.Texture.from(image), w, h)
  var mask = new PIXI.Graphics()

  mask.beginFill(0)
  mask.drawRoundedRect(0, 0, w, h, 36)

  box.addChild(sprite)
  box.addChild(mask)
  sprite.mask = mask

  switch (state) {
    case 'DEFAULT':
      sprite.tint = 0xffffff
      break;
    case 'FOCUSED':
      sprite.tint = 0x7EDFFF
      break;
    case 'DISABLED':
      sprite.alpha = 0.5
      break;
  }

  return box
}