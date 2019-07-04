import * as PIXI from 'pixi.js';
import './index.html';

// Import components
import startButton from './components/start-button/start-button';
import level from './components/level/level';
import title from './components/title/title';
import ball from './components/ball/ball';
import background from './components/background/background';

// Import utility functions
import renderCups from './utility/cup-renderer';
import renderThingies from './utility/thingie-renderer';
import renderLines from './utility/line-renderer';

class MagicCup extends PIXI.Container {

  run() {
    this.thingies = renderThingies();

    this.app = new PIXI.Application();
    this.app.renderer.backgroundColor = 0xffffff;
    document.body.appendChild(this.app.view);

    this.app.stage.addChild(background);
    this.app.stage.addChild(title);

    this.lines = renderLines();
    this.lines.forEach(line => {
      this.app.stage.addChild(line);
    });

    startButton.initPosition();
    this.app.stage.addChild(startButton);
    startButton.on('pointerdown', () => {
      this.startGame();
    });

    this.thingies.forEach(thingie => {
      this.app.stage.addChild(thingie);
    });

    this.movementCount = 0;
  }

  startGame() {
    startButton.remove();

    this.thingies.forEach(thingie => {
      thingie.remove();
    })

    this.app.stage.addChild(level)
    this.app.stage.addChild(ball);

    this.startNewLevel();
  }

  startNewLevel() {
    if (this.cups) this.removeCups();
    title.remove();
    level.setNewLevel();
    this.addCups();
    this.setRandomBall(this.startRotation.bind(this));
  }

  startRotation() {
    if (this.movementCount === 7) {
      this.movementCount = 0;
      return;
    }
    const [cup1, cup2] = this.getCupsToRotate();
    cup2.moveTo(cup1, () => { });
    cup1.moveTo(cup2, this.startRotation.bind(this));
    this.movementCount++;
  }

  addCups() {
    this.cups = renderCups();
    this.cups.forEach(cup => {
      this.app.stage.addChild(cup);
      cup.on('pointerdown', () => {
        cup.onCupClick(this.chooseAnswer.bind(this));
      });
    });
  }

  chooseAnswer(value) {
    if (value) {
      title.setSuccessText();
      this.app.stage.addChild(title);
      setTimeout(() => {
        this.startNewLevel();
      }, 1000);
      return;
    };
    this.setFailed();
  }

  setFailed() {
    title.setFailedText();
    level.setLevel(0);
    this.app.stage.addChild(title);
    this.app.stage.addChild(startButton);
  }

  setRandomBall(callback) {
    const cup = this.cups[Math.floor(Math.random() * this.cups.length)];
    cup.setBall();
    setTimeout(() => {
      cup.riseUp(callback);
    }, 1500);
  }

  getCupsToRotate() {
    const cup1 = this.cups[Math.floor(Math.random() * this.cups.length)];
    const cup2 = this.cups[Math.floor(Math.random() * this.cups.length)];
    if (cup1.options.id === cup2.options.id && !cup1.rotating && !cup2.rotating) {
      return this.getCupsToRotate();
    }
    return [cup1, cup2];
  }

  removeCups() {
    this.cups.forEach(cup => {
      cup.remove();
    })
  }
}

const game = new MagicCup();
game.run();