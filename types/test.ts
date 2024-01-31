import Game from "./Game.mjs";
import Player from "./Player.mjs";

class Test {
  game = new Game();

  test() {
    this.game.addPlayer(new Player("Adam"));
    console.log(JSON.stringify(this.game));
    this.game.addPlayer(new Player("Ayden"));
    console.log(JSON.stringify(this.game));
    this.game.addPlayer(new Player("Jason"));
    console.log(JSON.stringify(this.game));
    this.game.addPlayer(new Player("Ethan"));
    console.log(JSON.stringify(this.game));
    this.game.addPlayer(new Player("Micah"));
    console.log(JSON.stringify(this.game));
  }
}

test("adding players", () => {
  new Test().test();
});
