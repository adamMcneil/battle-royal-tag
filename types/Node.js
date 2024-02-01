class Node {
  back;
  player;
  target;

  constructor(back, player, target) {
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

  setTarget(node) {
    this.target = node;
  }

  setBack(node) {
    this.back = node;
  }
}

module.exports = Node;
export default Node;
