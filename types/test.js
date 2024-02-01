const Game = require("../types/Game.js");
const Player = require("../types/Player.js");

let game = new Game();

game.addPlayer(new Player("Adam"));
console.log(JSON.stringify(game));
game.addPlayer(new Player("Ayden"));
console.log(JSON.stringify(game));
game.addPlayer(new Player("Jason"));
console.log(JSON.stringify(game));
game.addPlayer(new Player("Ethan"));
console.log(JSON.stringify(game));
game.addPlayer(new Player("Micah"));
console.log(JSON.stringify(game));

game.kill("Adam");
game.kill("Adam");
game.kill("Micah");

console.log(JSON.stringify(game));
console.log(game);
console.log(game.getTarget("Micah"));
console.log(game.getTarget("Adam"));
console.log(game.getTarget("Ethan"));
