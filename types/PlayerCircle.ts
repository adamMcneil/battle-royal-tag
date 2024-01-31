import Node from "./Node";
import Player from "./Player";

class PlayerCircle {
    start: Node;
    map: Map<string, Node> = new Map();
    
    addPlayer(player: Player) {
        if (this.map.size == 0) {
            this.map[player.name] = new Node(null, player, null);
            this.start = this.map[player.name];
        } else if (this.map.size == 1) {
            let new_node: Node = new Node(this.start, player, this.start);
            this.start.setBack(new_node);
            this.start.setTarget(new_node);
            this.map[player.name] = new_node;
        } else {
            let new_node: Node = new Node(this.start.getBack(), player, this.start);
            this.start.getBack()?.setTarget(new_node);
            this.start.setBack(new_node);
            this.map[player.name] = new_node;
        }
    
    }

    getTarget(player: string): string {
        return this.getTargetHelper(this.map[player].getTarget());
    }

    getTargetHelper(node: Node | null | undefined): string{
        if (node?.player.isPlayerAlive()) {
            return node.player.name;
        }
        else {
            return this.getTargetHelper(node?.getTarget());
        }
    }

    kill(killer: string) {
        let killers_target: string = this.getTarget(killer);
        let killed_persons_target: string = this.getTarget(killers_target);
        this.map[killers_target].player.kill();
        this.updateTargetAfterKill(killed_persons_target, this.map[killer]);
    }

    updateTargetAfterKill(new_target: string, current_node: Node | null | undefined) {
        if (current_node?.player.getPlayerName() == new_target) {
            return;
        } else {
            current_node?.setTarget(this.map[new_target]);
            this.updateTargetAfterKill(new_target, current_node?.getTarget());
        }
    }
}

export default PlayerCircle;