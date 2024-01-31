import PlayerCircle from "./PlayerCircle";
import Player from "./Player";

class Game {
    player_list: PlayerCircle = new PlayerCircle();

    addPlayer(player: Player) {
        this.player_list.addPlayer(player);
    }
}

export default Game;