import Player from "./Player.mjs";

class PlayerList {
  player_list = [];

  getPlayerIndex(player) {
    return this.player_list.findIndex((p) => p.getPlayerName() === player);
  }

  addPlayer(player) {
    this.player_list.push(player);
  }

  getTarget(player) {
    let start_index = this.getPlayerIndex(player);
    let length = this.player_list.length;
    for (let i = 1; i < length; i++) {
      if (this.player_list[(start_index + i) % length].isPlayerAlive()) {
        return this.player_list[(start_index + i) % length];
      }
    }
    return new Player("not possible");
  }

  kill(killer) {
    this.getTarget(killer).kill();
  }
}

export default PlayerList;
