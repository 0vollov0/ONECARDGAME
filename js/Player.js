function Player(id, trumpDeck, dummyDeck, loger) {
  this.id = id;
  this.trumpDeck = trumpDeck;
  this.dummyDeck = dummyDeck;
  this.loger = loger;
  this.alive = true;
  this.turn = false;
  this.playerCardList = [];
}

Player.prototype.id = null;
Player.prototype.trumpDeck = null;
Player.prototype.dummyDeck = null;
Player.prototype.loger = null;
Player.prototype.alive = true;
Player.prototype.turn = false;
Player.prototype.playerCardList = [];
Player.prototype.playCard = function(cardNumber) {};
Player.prototype.repaintCardField = function() {};
Player.prototype.sortCardId = function(cardId) {
  if (this.trumpDeck.getAttackStack() == 1) {
    if (Math.floor(cardId / 100) == 5) {
      return this.switchCardId(cardId);
    } else if (Math.floor(dummyDeck.getTop() / 100) == 5) {
      switch (Math.floor(dummyDeck.getTop() % 10)) {
        case 1:
          if (Math.floor(cardId / 100) == 1 || Math.floor(cardId / 100) == 4) {
            return this.switchCardId(cardId);
          }
          break;
        case 2:
          if (Math.floor(cardId / 100) == 2 || Math.floor(cardId / 100) == 3) {
            return this.switchCardId(cardId);
          }
          break;
      }

    } else if (Math.floor(dummyDeck.getTop() / 100) == Math.floor(cardId / 100)) {
      return this.switchCardId(cardId);
    } else if (Math.floor(dummyDeck.getTop() % 100) == Math.floor(cardId % 100)) {
      return this.switchCardId(cardId);
    }
  } else {
    if (Math.floor(dummyDeck.getTop() / 100) == 5) {
      if (cardId == 501) {
        return 5;
      }else if (cardId == 502) {
        return 7;
      }else{
        return null;
      }
    }
    if (Math.floor(dummyDeck.getTop() % 100) == Math.floor(cardId % 100)) {
      return this.switchCardId(cardId);
    } else if (Math.floor(dummyDeck.getTop() / 100) == Math.floor(cardId / 100) && Math.floor(cardId % 100) == 3) {
      return this.switchCardId(cardId);
    }
  }
  return null;
};
Player.prototype.switchCardId = function(cardId) {
  var cardStyle = Math.floor(cardId % 100);
  var style = "";
  dummyDeck.push(cardId);
  switch (cardStyle) {
    case 1:
      if (Math.floor(cardId / 100) != 5) {
        this.trumpDeck.pushAttackStack(3);
      } else {
        this.trumpDeck.pushAttackStack(5);
      }
      return 1;
      break;
    case 2:
      if (Math.floor(cardId / 100) != 5) {
        this.trumpDeck.pushAttackStack(2);
      } else {
        this.trumpDeck.pushAttackStack(7);
      }
      return 1;
      break;
    case 3:
      this.trumpDeck.resetAttackStack();
      return 1;
      break;
    case 7:
      if (this instanceof User) {
        var flag = false;
        while (!flag) {
          style = prompt("클로버 | 다이아 | 하트 | 스페이드 중 하나를 입력하세요.");
          if (style == "클로버" || style == "다이아" || style == "하트" || style == "스페이드" || style == null) {
            flag = true;
          }
          switch (style) {
            case "클로버":
              style = 107;
              break;
            case "다이아":
              style = 207;
              break;
            case "하트":
              style = 307;
              break;
            case "스페이드":
              style = 407;
              break;
            case null:
              style = (Math.floor(Math.random() * 4) + 1) * 100 + 7;
              break;
          }
        }
        this.loger.appendChangeStyleLog(this.id, cardId, style);
        dummyDeck.changeCardStyle(style);
      } else {
        style = (Math.floor(Math.random() * 4) + 1) * 100 + 7;
        this.loger.appendChangeStyleLog(this.id, cardId, style);
        dummyDeck.changeCardStyle(style);
      }
      return 1;
      break;
    case 11:
      return 2;
      break;
    case 12:
      return 0;
      break;
    case 13:
      return -1;
      break;
    default:
      return 1;
      break;
  }
}

Player.prototype.draw = function() {
  if (this.turn == true) {
    this.loger.appendDrawLog(this.id, this.trumpDeck.getAttackStack());
    this.playerCardList = this.playerCardList.concat(this.trumpDeck.draw());
    this.repaintCardField();
  }
};
Player.prototype.setTurn = function(boolean) {
  this.turn = boolean;
};
Player.prototype.setOneCard = function(boolean) {
  this.sucessOneCard = boolean;
};
Player.prototype.die = function() {
  this.alive=false;
};

function User(id, trumpDeck, dummyDeck, loger) {
  this.id = id;
  this.trumpDeck = trumpDeck;
  this.dummyDeck = dummyDeck;
  this.loger = loger;
  this.fieldId = document.getElementById("bottom-trumpcard-field");
}
User.prototype = new Player();
User.prototype.playCard = function(cardId) {
  if (this.turn == true) {
    var resultTimes = this.sortCardId(cardId);
    if (resultTimes != null) {
      this.playerCardList.splice(this.playerCardList.indexOf(cardId), 1);
      this.repaintCardField();
      this.loger.appendPlayCardLog(this.id, cardId);
      dealer.nextTurn(resultTimes);
    }
  }
};
User.prototype.repaintCardField = function() {
  var innerhtml = "";
  if (this.playerCardList.length > 11) {
    for (var i = 0; i < this.playerCardList.length; i++) {
      innerhtml += "<img src='image/trumpcard/" + (this.playerCardList[i]) + ".png' id = '" + (this.playerCardList[i]) + "' style= height:70%;>";
    }
  } else {
    for (var j = 0; j < this.playerCardList.length; j++) {
      innerhtml += "<img src='image/trumpcard/" + (this.playerCardList[j]) + ".png' id = '" + (this.playerCardList[j]) + "'>";
    }
  }
  this.fieldId.innerHTML = innerhtml;
  this.TrumpCardAddEventListener(this.playerCardList.length);
};
User.prototype.TrumpCardAddEventListener = function(length) {
  for (var i = 0; i < length; i++) {
    this.TrumpCardAddClickEvent(this.playerCardList[i], this);
  }
};

User.prototype.TrumpCardAddClickEvent = function(cardId, ref) {
  document.getElementById(cardId).addEventListener('click', function() {
    ref.playCard(cardId);
  });
};

function AI(id, trumpDeck, dummyDeck, loger) {
  this.id = id;
  this.trumpDeck = trumpDeck;
  this.dummyDeck = dummyDeck;
  this.loger = loger;
  switch (this.id) {
    case "AI_1":
      this.fieldId = document.getElementById("left-trumpcard-field");
      break;
    case "AI_2":
      this.fieldId = document.getElementById("top-trumpcard-field");
      break;
    case "AI_3":
      this.fieldId = document.getElementById("right-trumpcard-field");
      break;
  }
}
AI.prototype = new Player();
AI.prototype.playCard = function() {
  var cardId = null;
  for (var i = 0; i < this.playerCardList.length; i++) {
    var resultTimes = this.sortCardId(this.playerCardList[i]);
    if (resultTimes != null) {
      this.loger.appendPlayCardLog(this.id, this.playerCardList[i]);
      this.playerCardList.splice(this.playerCardList.indexOf(this.playerCardList[i]), 1);
      this.repaintCardField();
      return resultTimes;
    }
  }
  this.draw();
  return 1;
};
AI.prototype.repaintCardField = function() {
  var innerhtml = "";
  for (var i = 0; i < this.playerCardList.length; i++) {
    if (this.id == "AI_2") {
      if (this.playerCardList.length > 11) {
        innerhtml += "<img src=image/trumpcard/trumpcard.png style= height:70%;>";
      } else {
        innerhtml += "<img src=image/trumpcard/trumpcard.png>";
      }
    } else {
      if (this.playerCardList.length <= 7) {
        innerhtml += "<img src=image/trumpcard/trumpcardtransform.png>";
      } else if (this.playerCardList.length > 7 && this.playerCardList.length <= 9) {
        innerhtml += "<img src=image/trumpcard/trumpcardtransform.png style= width:50%;>";
      } else if (this.playerCardList.length > 9) {
        innerhtml += "<img src=image/trumpcard/trumpcardtransform.png style= width:45%;>";
      }
    }
  }
  this.fieldId.innerHTML = innerhtml;
};
AI.prototype.repaintProfile = function() {
  switch (this.id) {
    case "AI_1":
      if (this.alive) {
        document.getElementById("left-profile").innerHTML = "<span><h1>AI-1</h1></span>" + "<img src='image/AI/AI_1.png'>";
      } else {
        document.getElementById("left-profile").innerHTML = "<span><h1>AI-1</h1></span>" + "<img src='image/AI/Dead_AI_1.png'>";
      }
      break;
    case "AI_2":
      if (this.alive) {
        document.getElementById("top-profile").innerHTML = "<span><h1>AI-2</h1></span>" + "<img src='image/AI/AI_2.png'>";
      } else {
        document.getElementById("top-profile").innerHTML = "<span><h1>AI-2</h1></span>" + "<img src='image/AI/Dead_AI_2.png'>";
      }
      break;
    case "AI_3":
      if (this.alive) {
        document.getElementById("right-profile").innerHTML = "<span><h1>AI-3</h1></span>" + "<img src='image/AI/AI_3.png'>";
      } else {
        document.getElementById("right-profile").innerHTML = "<span><h1>AI-3</h1></span>" + "<img src='image/AI/Dead_AI_3.png'>";
      }
      break;
    default:
  }
};
AI.prototype.screamOneCard = function() {};
