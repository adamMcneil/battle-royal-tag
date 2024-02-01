import { Player } from "./Player";
import { PlayerList } from "./PlayerList";

export class Game {
    player_list = new PlayerList();
    total_players = 0;
    players_left = 0;

    constructor(gameObject) {
        console.log(gameObject)
        this.player_list = new PlayerList();
        this.total_players = gameObject.total_players || 0;
        this.players_left = gameObject.players_left || 0;
        
        gameObject.player_list.player_list.forEach((player) => {
            this.player_list.addPlayer(new Player(player));
        });
        // if (gameObject.player_list && Array.isArray(gameObject.player_list)) {
        // }
      }

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