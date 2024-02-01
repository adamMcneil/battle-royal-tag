export class Player {
    name;
    isAlive;
      constructor(player) {
        this.name = player.name;
        this.isAlive = player.isAlive;
      }
    
      kill() {
        this.isAlive = false;
      }
    
      revivePlayer() {
        this.isAlive = true;
      }
    
      getPlayerName() {
        return this.name;
      }
    
      isPlayerAlive() {
        return this.isAlive;
      }
    }
  