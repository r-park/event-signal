[![Build Status](https://travis-ci.org/r-park/event-signal.svg?branch=master)](https://travis-ci.org/r-park/event-signal)
[![Coverage Status](https://coveralls.io/repos/r-park/event-signal/badge.svg?branch=master)](https://coveralls.io/r/r-park/event-signal?branch=master)
[![npm version](https://badge.fury.io/js/event-signal.svg)](http://badge.fury.io/js/event-signal)
[![Bower version](https://badge.fury.io/bo/event-signal.svg)](http://badge.fury.io/bo/event-signal)

# EventSignal
EventSignal is a lightweight, browser-safe event messaging controller.

## Installing
**bower**
```bash
bower install event-signal
```
**npm**
```bash
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
object.updated = new EventSignal();

function MyClass() {
  this.updated = new EventSignal();
}
```

## addListener(listener)
Add a `listener` to the event signal instance.

Returns the `EventSignal`.

Throws `TypeError` if `listener` was already previously added.

Param          | Type          |Description
---------------|---------------|---------------------------------------------------
listener       | Function      | The listener function
```javascript
object.saved.addListener(function(){});

// alternatively, use alias `then`
object.saved.then(function(){});
```

## addListener(listener, scope)
Add a `listener` to the event signal instance, passing a `scope` object that will be `this` from inside the listener function. If `scope` is not provided, `listener` will be called using an anonymous `{}` as `scope`.

Returns the `EventSignal`.

Throws `TypeError` if `listener` was already previously added.

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
Add a `listener` to the event signal instance. Passing `true` for `once` will automatically remove the listener after one call.

Returns the `EventSignal`.

Throws `TypeError` if `listener` was already previously added.

Param          | Type          | Description
---------------|---------------|---------------------------------------------------
listener       | Function      | The listener function
once           | boolean       | Optional; if `true`, listener will be removed after one call
```javascript
object.saved.addListener(function(){}, true);
```

## addListener(listener, scope, once)
The trifecta — add a `listener` to the event signal instance, passing a `scope` object that will be `this` from inside the listener function, and boolean `true` for `once` to automatically remove the listener after one call.

Returns the `EventSignal`.

Throws `TypeError` if `listener` was already previously added.

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
Emit the signal to all listeners. Optionally pass `data` to listeners.

Returns the `EventSignal`.

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
Removes the provided `listener` function.

Returns the `EventSignal`.

Param          | Type          |Description
---------------|---------------|---------------------------------------------------
listener       | Function      | The listener function to be removed
```javascript
var listener = function(){};
object.saved.addListener(listener);
object.saved.removeListener(listener);
```

## removeAllListeners()
Removes all registered listeners.

Returns the `EventSignal`.

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
