
function Deck() {}
Deck.prototype.deck = [];
Deck.prototype.getTop = function() {
  return this.deck[this.deck.length - 1];
};
Deck.prototype.Suffle = function() {
  for (var i = 0; i < this.deck.length; ++i) {
    var dest = Math.floor(Math.random() * this.deck.length);

    var temp = this.deck[i];
    this.deck[i] = this.deck[dest];
    this.deck[dest] = temp;
  }
};

function TrumpDeck() {
  this.dealer = null;
  this.dummyDeck = null;
  this.attackStack = 1;
  this.setDealer = function(dealer) {
    this.dealer = dealer;
  };
  this.setDummyDeck = function(dummyDeck) {
    this.dummyDeck = dummyDeck;
  };
  this.addDrawClickEvent = function() {
    this.addDrawEvent(this.dealer);
  };
  this.addDrawEvent = function(ref) {
    document.getElementById("deck").addEventListener('click', function() {
      if (ref.getCurrentTurn().data instanceof User) {
        ref.getCurrentTurn().data.draw();
        ref.nextTurn(1);
      }
    });
  };
  this.initDeck = function() {
    for (var i = 0, k = 101; i < 54; i++, k++) {
      if (k % 100 > 13) {
        k = (Math.floor(k / 100 + 1)) * 100 + 1;
      }
      this.deck.push(k);
    }
  };
  this.draw = function() {
    var drawcardlist = [];
    for (var i = 0; i < this.attackStack; i++) {
      if (this.deck.length < 1) {
        this.addTrumpDummyDeck();
      }
      drawcardlist[i] = this.deck.pop();
    }
    this.attackStack = 1;
    return drawcardlist;
  };
  this.pushAttackStack = function(stack) {
    if (this.attackStack == 1) {
      this.attackStack += (stack - 1);
    } else {
      this.attackStack += stack;
    }
  };
  this.getAttackStack = function() {
    return this.attackStack;
  };
  this.resetAttackStack = function() {
    this.attackStack = 1;
  };
  this.addTrumpDummyDeck = function() {
    var temp = this.dummyDeck.deck.pop();
    this.deck = this.deck.concat(this.dummyDeck.deck);
    this.dummyDeck.deck.splice(0, this.dummyDeck.deck.length);
    this.dummyDeck.push(temp);
  };
}
TrumpDeck.prototype = new Deck();

function DummyDeck(trumpDeck) {
  this.trumpDeck = trumpDeck;
  this.deck = this.trumpDeck.draw();
  this.top = this.deck[this.deck.length - 1];
  this.push = function(cardId) {
    this.deck.push(cardId);
    this.top = cardId;
    this.repaintDummyDeck();
  };
  this.repaintDummyDeck = function() {
    document.getElementById("dummy-deck").src = "image/trumpcard/" + this.top + ".png";
  };
  this.changeCardStyle = function(cardId) {
    this.top = cardId;
    this.repaintDummyDeck();
  };
}
DummyDeck.prototype = new Deck();
DummyDeck.prototype.getTop = function() {
  return this.top;
};
