class Player {
  name: string;
  isAlive: boolean;
    constructor(name) {
      this.name = name;
      this.isAlive = true;
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

export default Player; 