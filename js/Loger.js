function Loger() {
  this.autoScroll = function() {
    document.getElementById("log").scrollTop = document.getElementById("log").scrollHeight;
  };
  this.appendDrawLog = function(playerId, attackStack) {
    document.getElementById("log").append(playerId + " 님이 " + attackStack + "장 드로우 하셨습니다.\n");
    this.autoScroll();
  };
  this.appendPlayCardLog = function(playerId, cardId) {
    document.getElementById("log").append(playerId + " 님이 " + this.changeCardIdToWord(cardId) + " 카드를 내셨습니다.\n");
    this.autoScroll();
  };
  this.appendChangeStyleLog = function(playerId, beforeCardId, afterCardID) {
    var beforeStyle = this.convertToStyle(beforeCardId);
    var afterStyle = this.convertToStyle(afterCardID);
    document.getElementById("log").append(playerId + " 님이 " + beforeStyle + "를 " + afterStyle + "로 바꾸셨습니다.\n");
    this.autoScroll();
  };
  this.appendDiePlayerLog = function(playerId){
    document.getElementById("log").append(playerId + " 님이 고인이 되셨습니다.\n");
  };
  this.displayWinner = function(playerId){
    document.getElementById("display-winner").innerHTML = playerId +"님이 우승하셨습니다.";
  };
  this.displayCrruntTurn = function(playerId) {
    document.getElementById("current-turn").innerHTML = "<h1>"+playerId + "님의 차례입니다.</h1>";
  };
  this.changeCardIdToWord = function(cardId) {
    if (cardId == 501) {
      return "흑백 조커";
    }
    if (cardId == 502) {
      return "컬러 조커";
    }
    var style = this.convertToStyle(cardId);
    var cardNumber = cardId % 100;

    switch (cardNumber) {
      case 1:
        cardNumber = "A";
        break;
      case 11:
        cardNumber = "J";
        break;
      case 12:
        cardNumber = "K";
        break;
      case 13:
        cardNumber = "Q";
        break;
      default:
        break;
    }
    return (style + cardNumber);
  };
  this.convertToStyle = function(cardId) {
    var style = Math.floor(cardId / 100);
    switch (style) {
      case 1:
        style = "클로버 ";
        break;
      case 2:
        style = "다이아 ";
        break;
      case 3:
        style = "하트 ";
        break;
      case 4:
        style = "스페이드 ";
        break;
      case 5:
        style = "조커 ";
        break;
    }
    return style;
  };
}
