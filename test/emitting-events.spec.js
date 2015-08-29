describe('Emitting events', function(){

  var eventSignal;


  beforeEach(function(){
    eventSignal = new EventSignal();
  });


  it('should return self', function(){
    expect(eventSignal.emit()).toBe(eventSignal);

    eventSignal.addListener(function(){});
    eventSignal.emit();

    expect(eventSignal.emit()).toBe(eventSignal);
  });


  it('should invoke listeners in FIFO order', function(){
    var result = '';
    var listener1 = function() { result += '1'; };
    var listener2 = function() { result += '2'; };
    var listener3 = function() { result += '3'; };

    eventSignal.addListener(listener1); // 1
    eventSignal.addListener(listener2); // 2
    eventSignal.addListener(listener3); // 3

    eventSignal.emit();

    expect(result).toBe('123');
  });


  it('should invoke the listener within provided scope', function(){
    var object = {
      name: 'foo',
      listener: function() {
        this.name = 'foo bar';
      }
    };

    eventSignal.addListener(object.listener, object);
    eventSignal.emit();

    expect(object.name).toBe('foo bar');
  });


  it('should invoke the listener using anonymous scope when `scope` is not provided', function(){
    var object = {
      name: 'foo',
      listener: function() {
        this.name = 'foo bar';
      }
    };

    eventSignal.addListener(object.listener);
    eventSignal.emit();

    expect(object.name).toBe('foo');
  });


  it('should pass provided data', function(){
    var listener = jasmine.createSpy('listener'),
        data = {foo: 'bar'};

    eventSignal.addListener(listener);
    eventSignal.emit(data);

    expect(listener).toHaveBeenCalledWith(data);
  });



  describe('Emitting an event to a single-iteration listener', function(){
    it('should invoke the listener callback one time', function(){
      var listener = jasmine.createSpy('listener');

      eventSignal.addListener(listener, true);
      eventSignal.emit();
      eventSignal.emit();

      expect(listener.calls.count()).toBe(1);
    });


    it('should automatically remove the listener after one invocation', function(){
      eventSignal.addListener(function(){}, true);

      expect(eventSignal.listenerCount()).toBe(1);

      eventSignal.emit();

      expect(eventSignal.listenerCount()).toBe(0);
    });


    it('should continue emitting to remaining listeners after single-iteration listeners are removed', function(){
      var result = '';
      var listener1 = function() { result += '1'; };
      var listener2 = function() { result += '2'; };
      var listener3 = function() { result += '3'; };
      var listener4 = function() { result += '4'; };

      eventSignal.addListener(listener1);       // 1
      eventSignal.addListener(listener2, true); // 2
      eventSignal.addListener(listener3);       // 3
      eventSignal.addListener(listener4, true); // 4

      eventSignal.emit();

      expect(result).toBe('1234');

      eventSignal.emit();

      expect(result).toBe('123413');
    });
  });

});
