describe("Removing listeners", function(){

  var eventSignal;


  beforeEach(function(){
    eventSignal = new EventSignal();
  });


  it("should remove the listener", function(){
    var listenerFn = function(){};

    eventSignal.addListener(listenerFn);

    expect(eventSignal.listenerCount()).toBe(1);

    eventSignal.removeListener(listenerFn);

    expect(eventSignal.listenerCount()).toBe(0);
  });


  it("should do nothing if provided listener is not found", function(){
    eventSignal.addListener(function(){});

    expect(eventSignal.listenerCount()).toBe(1);

    eventSignal.removeListener(function(){});

    expect(eventSignal.listenerCount()).toBe(1);
  });


  it("should remove all listeners", function(){
    eventSignal.addListener(function(){});
    eventSignal.addListener(function(){});

    expect(eventSignal.listenerCount()).toBe(2);

    eventSignal.removeAllListeners();

    expect(eventSignal.listenerCount()).toBe(0);
  });

});
