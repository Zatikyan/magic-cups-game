import * as PIXI from 'pixi.js';
import './index.html';

// Import components
import startButton from './components/start-button/start-button';
import leaderBoardButton from './components/leader-board-button/leader-board-button';
import leaderBoardCloseButton from './components/leader-board-close-button/leader-board-close-button';
import leaderBoard from './components/leader-board/leader-board';
import leaderTextInput from './components/text-input/text-input';
import addLeaderButton from './components/add-leader-button/add-leader-button';

import level from './components/level/level';
import title from './components/title/title';
import ball from './components/ball/ball';
import background from './components/background/background';

// Import utility functions
import { renderCups, setRotation } from './utility/cup-renderer';
import renderThingies from './utility/thingie-renderer';
import renderLines from './utility/line-renderer';

class MagicCup extends PIXI.Container {

  constructor() {
    super();

    this.app = new PIXI.Application();
    this.app.renderer.backgroundColor = 0xffffff;
    document.body.appendChild(this.app.view);

    this.thingies = renderThingies();
    this.lines = renderLines();
  }

  run() {
    this.app.stage.addChild(background);
    this.app.stage.addChild(title);

    this.lines.forEach(line => {
      this.app.stage.addChild(line);
    });

    startButton.initPosition();
    this.app.stage.addChild(startButton);
    startButton.on('pointerdown', this.startGame.bind(this));

    leaderBoardButton.initPosition();
    this.app.stage.addChild(leaderBoardButton);
    leaderBoardButton.on('pointerdown', () => {
      if (!leaderBoard.opened) {
        this.openLeaderBoard();
      }
    })

    this.thingies.forEach(thingie => {
      this.app.stage.addChild(thingie);
    });

    this.movementCount = 0;
  }

  openLeaderBoard() {
    title.remove();
    startButton.remove();
    leaderBoardButton.remove();

    this.thingies.forEach(thingie => {
      thingie.remove();
    });

    leaderBoard.open(this.app.stage)
    this.app.stage.addChild(leaderBoardCloseButton);
    leaderBoardCloseButton.on('pointerdown', this.closeLeaderBoard.bind(this));
  }

  closeLeaderBoard() {
    leaderBoardCloseButton.remove();
    leaderBoard.close(this.app.stage);
    this.run();
  }

  startGame() {
    level.setLevel(0);
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
    startButton.remove();
    level.setNewLevel();
    addLeaderButton.remove();
    leaderBoard.close(this.app.stage);
    leaderTextInput.close(this.app.stage);
    this.addCups();
    this.setRandomBall(this.startRotation.bind(this));
  }

  startRotation() {
    if (this.movementCount === 7) {
      this.movementCount = 0;
      return;
    }
    const [cup1, cup2] = this.getCupsToRotate();
    setRotation(true);
    Promise.all([
      cup2.moveTo(cup1, level.getLevel()),
      cup1.moveTo(cup2, level.getLevel())
    ])
      .then(() => {
        this.movementCount++;
        setRotation(false);
        this.startRotation()
      })
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
    title.setPositionForFail()
    this.app.stage.addChild(title);
    this.app.stage.addChild(startButton);
    if (leaderBoard.isLeader(level.getLevel())) {
      this.showAddLeaderFields();
      return;
    }
    level.setLevel(0);
  }

  showAddLeaderFields() {
    leaderTextInput.show(this.app.stage);
    this.app.stage.addChild(addLeaderButton);
    addLeaderButton.on('pointerdown', this.addNewLeader.bind(this))
  }

  addNewLeader() {
    const lev = level.getLevel();
    const name = leaderTextInput.getValue();
    leaderBoard.setLeader(name, lev);
    level.setLevel(0);
    this.startNewLevel();
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
    if (cup1.options.id === cup2.options.id || cup1.rotating || cup2.rotating) {
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