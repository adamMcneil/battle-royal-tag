import PlayerList from "./PlayerList.mjs";

class Game {
  player_list = new PlayerList();

  addPlayer(player) {
    this.player_list.addPlayer(player);
  }
}

export default Game;