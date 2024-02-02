// import PlayerList from "./PlayerList.js";
const PlayerList = require("./PlayerList.js");

class Game {
  player_list = new PlayerList();
  leader_board = new Map();
  total_players = 0;
  players_left = 0;

  addPlayer(player) {
    if (this.player_list.contains(player.name)) {
      return;
    }
    if (!this.hasStarted()) {
      this.player_list.addPlayer(player);
      this.leader_board.set(player.name, 0);
      this.total_players++;
      this.players_left++;
    }
  }

  kill(player) {
    this.player_list.kill(player);
    // this.leader_board.get(player.name).val++;
    console.log(this.leader_board);
    this.players_left--;
  }

  getTarget(player) {
    return this.player_list.getTarget(player);
  }

  shuffle() {
    if (!this.hasStarted()) {
      this.player_list.shuffle();
    }
  }

  hasStarted() {
    return this.players_left != this.total_players;
  }
}

module.exports = Game;
