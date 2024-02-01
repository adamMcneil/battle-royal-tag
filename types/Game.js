// import PlayerList from "./PlayerList.js";
const PlayerList = require('./PlayerList.js')

 class Game {
  player_list = new PlayerList();
  total_players = 0;
  players_left = 0;

  addPlayer(player) {
    this.player_list.addPlayer(player);
    this.total_players++;
    this.players_left++;
  }

  kill(player) {
    this.player_list.kill(player);
    this.players_left--;
  }

  getTarget(player) {
     return this.player_list.getTarget(player);
  }

  shuffle() {
    this.player_list.shuffle();
  }
}

module.exports = Game;
