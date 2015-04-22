describe("Adding listeners", function(){

  var eventSignal;


  beforeEach(function(){
    eventSignal = new EventSignal();
  });


  it("should add the provided listener", function(){
    eventSignal.addListener(function(){});
    expect(eventSignal.listenerCount()).toBe(1);
  });


  it("should assign an anonymous object to `scope` when `scope` is not provided", function(){
    eventSignal.addListener(function(){});

    var listener = eventSignal.listeners()[0];

    expect(listener.scope).toEqual({});
  });


  it("should set `scope` and `once` when called with addListener(listenerFn, scope)", function(){
    var object = {
      listenerFn: function(){}
    };

    eventSignal.addListener(object.listenerFn, object);

    var listener = eventSignal.listeners()[0];

    expect(listener.callback).toBe(object.listenerFn);
    expect(listener.scope).toBe(object);
    expect(listener.once).toBe(undefined);
  });


  it("should set `scope` and `once` when called with addListener(listenerFn, once)", function(){
    var object = {
      listenerFn: function(){}
    };

    eventSignal.addListener(object.listenerFn, true);

    var listener = eventSignal.listeners()[0];

    expect(listener.callback).toBe(object.listenerFn);
    expect(listener.scope).toEqual({});
    expect(listener.once).toBe(true);
  });


  it("should set `scope` and `once` when called with addListener(listenerFn, scope, once)", function(){
    var object = {
      listenerFn: function(){}
    };

    eventSignal.addListener(object.listenerFn, object, true);

    var listener = eventSignal.listeners()[0];

    expect(listener.callback).toBe(object.listenerFn);
    expect(listener.scope).toBe(object);
    expect(listener.once).toBe(true);
  });


  it("should throw if listener is not a function", function(){
    [{}, [], null, void 0, '', 1, true].forEach(function(listener){
      expect(function(){
        eventSignal.addListener(listener);
      }).toThrow();
    });
  });


  it("should throw if listener is already registered", function(){
    var listenerFn = function(){};

    eventSignal.addListener(listenerFn);

    expect(function(){
      eventSignal.addListener(listenerFn);
    }).toThrow();
  });

});
