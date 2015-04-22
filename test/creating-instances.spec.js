describe("Creating instances", function(){

  it("should create an instance when called with the `new` keyword", function(){
    var eventSignal = new EventSignal();
    expect(eventSignal instanceof EventSignal).toBe(true);
  });


  it("should auto-instantiate when called without the `new` keyword", function(){
    var eventSignal = EventSignal();
    expect(eventSignal instanceof EventSignal).toBe(true);
  });


  it("should initialize the `_listeners` array", function(){
    var eventSignal = new EventSignal();
    expect(Array.isArray(eventSignal._listeners)).toBe(true);
  });

});
