var loger = new Loger();
var dealer = new Dealer(loger);
var trumpDeck = new TrumpDeck();
trumpDeck.setDealer(dealer);
dealer.setTrumpDeck(trumpDeck);
trumpDeck.addDrawClickEvent();
trumpDeck.initDeck();
trumpDeck.Suffle();
var dummyDeck = new DummyDeck(trumpDeck);
trumpDeck.setDummyDeck(dummyDeck);


document.getElementById("start-button").addEventListener('click', function() {
  document.getElementById("start-button").disabled = true;

  dummyDeck.repaintDummyDeck();

  var ai_1 = new AI("AI_1", trumpDeck, dummyDeck, loger);
  var ai_2 = new AI("AI_2", trumpDeck, dummyDeck, loger);
  var ai_3 = new AI("AI_3", trumpDeck, dummyDeck, loger);
  var user = new User("User", trumpDeck, dummyDeck, loger);

  dealer.addPlayer(ai_1);
  dealer.addPlayer(ai_2);
  dealer.addPlayer(ai_3);
  dealer.addPlayer(user);

  dealer.suppleTurn();

  dealer.gameStart();
});
document.getElementById("reset-button").addEventListener('click', function() {
  window.location.reload(true);
});
