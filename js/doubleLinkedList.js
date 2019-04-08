function Node(data) {
  this.data = data;
  this.next = null;
  this.prev = null;
}

function DoubleLinkedList() {
  this._length = 0;
  this._head = null;
  this._tail = null;
  this._ptr = null;
}

DoubleLinkedList.prototype.getPtr = function() {
  return this._ptr;
};

DoubleLinkedList.prototype.append = function(data) {
  var node = new Node(data);
  if (this._head == null) {
    this._head = node;
    this._tail = node;
  } else {
    this._tail.next = node;
    this._head.prev = node;
    node.prev = this._tail;
    node.next = this._head;
    this._tail = node;
  }
  this._length++;
};

DoubleLinkedList.prototype.removeData = function(data) {
  var removePoint = this.indexOf(data);
  if (removePoint) {
    if (this._ptr == removePoint) {
      this._ptr = this._ptr.next;
    }
    if (this._head == removePoint) {
      this._head = this._head.next;
    } else if (this._tail == removePoint) {
      this._tail = this._tail.prev;
    }
    removePoint.prev.next = removePoint.next;
    removePoint.next.prev = removePoint.prev;
    this._length--;
    return true;
  }
  return false;
};

DoubleLinkedList.prototype.indexOf = function(data) {
  if (this._length <= 0) {
    return null;
  } else {
    var temp = this._head;
    for (var i = 0; i < this._length; i++) {
      if (temp.data == data) {
        return temp;
      }
      temp = temp.next;
    }
    return null;
  }
};

DoubleLinkedList.prototype.suppleTurn = function() {
  this._ptr = this._head;
  for (var i = 0; i < Math.floor(Math.random() * this._length); i++) {
    this._ptr = this._ptr.next;
  }
  this._ptr.data.setTurn(true);
};
