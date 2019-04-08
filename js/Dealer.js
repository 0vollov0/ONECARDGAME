function Dealer(loger) {
  this.trumpDeck = null;
  this.attackStack = 0;
  this.gameOver = false;
  this.playerList = new DoubleLinkedList();
  this.loger = loger;
  this.setTrumpDeck = function(trumpDeck) {
    this.trumpDeck = trumpDeck;
  };
  this.addPlayer = function(player) {
    this.playerList.append(player);
  };
  this.diePlayer = function(player) {
    player.die();
    player.repaintProfile();
    this.playerList.removeData(player);
    this.loger.appendDiePlayerLog(player.id);
  };
  this.suppleTurn = function() {
    this.playerList.suppleTurn();
  };
  this.getCurrentTurn = function() {
    return this.playerList._ptr;
  };
  this.nextTurn = function(times) {
    if (!this.gameOver) {
      if (this.playerList._ptr.data.playerCardList.length > 13) {
        this.diePlayer(this.playerList._ptr.data);
      }
      if (this.playerList._ptr.data.playerCardList.length == 0 || this.playerList._length == 1) {
        this.GAMEOVER();
        loger.displayWinner(this.playerList._ptr.data.id);
        return;
      }
      this.playerList._ptr.data.setTurn(false);
      for (var i = 0; i < times; i++) {
        this.playerList._ptr = this.playerList._ptr.next;
      }
      if (times == -1) {
        this.playerList._ptr = this.playerList._ptr.prev;
      }
      this.playerList._ptr.data.setTurn(true);
      this.loger.displayCrruntTurn(this.playerList._ptr.data.id);
      if (this.playerList._ptr.data instanceof User) {
        return;
      }
      this.timer(this);
    }
  };
  this.timer = function(ref) {
    setTimeout(function() {
      ref.nextTurn(ref.playerList._ptr.data.playCard());
    }, 4000);
  };
  this.gameStart = function() {
    var player = this.playerList._head;
    for (var i = 0; i < this.playerList._length; i++) {
      if (player.data instanceof AI) {
        player.data.repaintProfile();
      }
      for (var j = 0; j < 5; j++) {
        player.data.playerCardList = player.data.playerCardList.concat(this.trumpDeck.draw());
      }
      player.data.repaintCardField();
      player = player.next;
    }
    this.nextTurn(1);
  };
  this.oneCard = function(player) {};
  this.GAMEOVER = function(){this.gameOver = true;};

}
