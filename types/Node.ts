import Player from "./Player";

class Node {
    back: Node | null;
    player: Player;
    target: Node | null;

    constructor(back: Node | null, player: Player, target: Node | null) {
        this.back = back;
        this.player = player;
        this.target = target;
    }

    getBack() {
        return this.back;
    }

    getTarget() {
        return this.target;
    }

    setTarget(node: Node) {
        this.target = node;
    }

    setBack(node: Node) {
        this.back = node;
    }
}

export default Node;