var x = 5;

function scopeTest() {
  return x + 1;
}

o = {
  objectScopeTest: function() {
    var y = 10;
    return x + 1;
  }
}

console.log(o.objectScopeTest());
console.log(x);
console.log(y);
