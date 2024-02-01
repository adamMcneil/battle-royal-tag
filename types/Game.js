// import PlayerList from "./PlayerList.js";
const PlayerList = require('./PlayerList.js')

class Game {
  player_list = new PlayerList();

  addPlayer(player) {
    this.player_list.addPlayer(player);
  }
}

module.exports = Game
// export default Game;