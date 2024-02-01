class Player {
  name;
  isAlive;
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

module.exports = Player;

// export default Player; 