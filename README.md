[![Build Status](https://travis-ci.org/r-park/event-signal.svg?branch=master)](https://travis-ci.org/r-park/event-signal)
[![Coverage Status](https://coveralls.io/repos/r-park/event-signal/badge.svg)](https://coveralls.io/r/r-park/event-signal)
# EventSignal
EventSignal is a lightweight event messaging controller inspired by [js-signals](https://github.com/millermedeiros/js-signals).

## Installing
**bower**
```
bower install event-signal
```
**npm**
```
npm install event-signal
```

## Examples
```javascript
function listener(data) {
  console.log(data.message);
}

var resource = {};

// add support for `created` and `updated` events
resource.created = new EventSignal();
resource.updated = new EventSignal();

// add a listener to the `updated` event
resource.updated.addListener(listener);

// emit the `updated` event to all listeners,
// passing an optional `data` object
resource.updated.emit({message: 'foo'});

// remove the listener from the `updated` event-signal
resource.updated.removeListener(listener);
```

## Constructor
```javascript
var object = {};
object.saved = new EventSignal();
```

## addListener(listener)
Add a `listener` to the event signal instance. Returns self.

Param          | Type          |Description
---------------|---------------|---------------------------------------------------
listener       | Function      | The listener function
```javascript
object.saved.addListener(function(){});

// alternatively, use alias `then`
object.saved.then(function(){});
```

## addListener(listener, scope)
Add a `listener` to the event signal instance, passing an optional `scope` object that will be `this` from inside the listener function. If `scope` is not provided, `listener` will execute within an anonymous {} scope. Returns self.

Param          | Type          | Description
---------------|---------------|---------------------------------------------------
listener       | Function      | The listener function 
scope          | Object        | Optional; scope that will be `this` inside the listener function
```javascript
var scope = {
  listener: function(){}
};

object.saved.addListener(scope.listener, scope);
```

## addListener(listener, once)
Add a `listener` to the event signal instance. Passing an optional `true` for `once` will automatically remove the listener after one call. Returns self.

Param          | Type          | Description
---------------|---------------|---------------------------------------------------
listener       | Function      | The listener function  
once           | boolean       | Optional; if `true`, listener will be removed after one call
```javascript
object.saved.addListener(function(){}, true);
```

## addListener(listener, scope, once)
The trifecta — add a `listener` to the event signal instance, passing an optional `scope` object that will be `this` from inside the listener function, and optional `true` for `once` to automatically remove the listener after one call. Returns self.

Param          | Type          | Description
---------------|---------------|---------------------------------------------------
listener       | Function      | The listener function
scope          | Object        | Optional; scope that will be `this` inside the listener function
once           | boolean       | Optional; if `true`, listener will be removed after one call
```javascript
var scope = {
  listener: function(){}
};

object.saved.addListener(scope.listener, scope, true);
```

## emit(data)
Emit the signal to all listeners. Optionally pass `data` to listeners. Returns self.

Param          | Type          | Description
---------------|---------------|---------------------------------------------------
data           |    *          | Optional data to be passed to listener
```javascript
object.saved.emit();

// examples of passing optional data
object.saved.emit({status: 'success'});
object.saved.emit('foo');
```

## removeListener(listener)
Removes listener and returns self. Returns self.

Param          | Type          |Description
---------------|---------------|---------------------------------------------------
listener       | Function      | The listener function to be removed
```javascript
var listener = function(){};
object.saved.addListener(listener);
object.saved.removeListener(listener);
```

## removeAllListeners()
Removes all registered listeners and returns self. Returns self.
```javascript
object.saved.removeAllListeners();
```

## listeners()
Returns a cloned array of registered listeners.
```javascript
object.saved.listeners();
//-> [{callback:function, scope:Object, once:boolean}]
```

## listenerCount();
Returns the number of registered listeners.
```javascript
object.saved.listenerCount()
//-> number
```

## Naming Conventions
It's recommended that EventSignal instances be named using the past-tense :
- foo.created
- foo.saved
- foo.updated
- foo.ended

are preferred over :
- foo.create
- foo.onSave
- foo.afterUpdate
- foo.ending
- foo.end

## Browser Support
- Chrome 
- Firefox 
- IE 9+ 
- IE 8 with [es5-shim](https://github.com/es-shims/es5-shim)
- Safari

## Module Support
- AMD
- CommonJS
- Browser global

## License
EventSignal is free to use under the [open-source MIT license](https://github.com/r-park/event-signal/blob/master/LICENSE).
