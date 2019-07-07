import { Sprite, Text, TextStyle } from 'pixi.js'

class LeaderBoard extends Sprite {

  constructor() {
    super()
    this.opened = false;
    this.title = new Text(
      'Leader Board',
      this.getTitleStyle()
    );

    this.setTitlePosition();

    this.leaderBoard = this.getLeaderBoard();
    this.leadersArray = [];
  }

  isLeader(level) {
    return !this.leaderBoard || this.leaderBoard.length < 10 || this.leaderBoard.some(el => el.level < level);
  }

  open(stage) {
    stage.addChild(this.title);
    this.displayNames(stage);
    this.opened = true;
  }

  close(stage) {
    stage.removeChild(this.title);
    this.removeNames(stage);
    this.opened = false;
  }

  removeNames(stage) {
    this.leadersArray.forEach(leader => {
      stage.removeChild(leader);
    });
    this.leadersArray.length = 0;
  }

  displayNames(stage) {
    let topCoordinate = 130;
    this.leaderBoard.forEach((item, index) => {
      const text = `N ${index + 1}: ${item.name} - level ${item.level}`;
      const leader = new Text(
        text,
        this.getLeaderBoardTextStyle()
      );
      leader.x = 400 - leader.width / 2;
      leader.y = topCoordinate;
      topCoordinate += leader.height;
      this.leadersArray.push(leader);
      stage.addChild(leader)
    })
  }

  getLeaderBoardTextStyle() {
    return new TextStyle({
      font: 'bold italic',
      fill: '#F7EDCA',
      stroke: '#4a1850',
      fontSize: '20px',
      strokeThickness: 5,
      dropShadow: true,
      dropShadowColor: '#000000',
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 6,
    })
  }

  getTitleStyle() {
    return new TextStyle({
      font: 'bold italic',
      fill: '#F7EDCA',
      stroke: '#4a1850',
      fontSize: '40px',
      strokeThickness: 5,
      dropShadow: true,
      dropShadowColor: '#000000',
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 6,
    })
  }

  setTitlePosition() {
    this.title.x = 400 - this.title.width / 2;
    this.title.y = 50;
  }

  setLeader(name, level) {
    this.leaderBoard.push({
      name,
      level
    });
    this.saveLeaderBoard();
  }

  saveLeaderBoard() {
    const board = this.leaderBoard.sort(this.sortByLevel).splice(0, 10);
    localStorage.setItem('cupGameLeaderBoard', JSON.stringify(board));
  }

  getLeaderBoard() {
    const board = JSON.parse(localStorage.getItem('cupGameLeaderBoard'));
    if (!board) {
      localStorage.setItem('cupGameLeaderBoard', JSON.stringify([]));
    }
    return board || [];
  }

  sortByLevel(a, b) {
    if (a.level < b.level) return -1;
    if (a.level > b.level) return 1;
    return 0;
  }
}

const leaderBoard = new LeaderBoard();
export default leaderBoard;