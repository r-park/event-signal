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

// alternatively, use the alias `then` to add a listener
resource.updated.then(function(data){
  console.log(data.message);
});

// optionally pass custom scope object to be
// keyword `this` within the listener function
resource.updated.addListener(listener, {});

// optionally passing `true` will automatically
// remove the listener after one call
resource.created.addListener(listener, true);

// one-liner to add a listener with custom scope,
// and remove the listener after one call
resource.created.addListener(listener, {}, true);

// emit the `updated` event to all listeners,
// passing an optional `data` object
resource.updated.emit({message: 'foo'});

// remove the listener from the `updated` event-signal
resource.updated.removeListener(listener);

// remove all listeners from the `created` event-signal
resource.created.removeAllListeners();
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

## API
##### addListener(listener)
- `{Function} listener`

##### addListener(listener, scope)
- `{Function} listener`
- `{Object} scope`

##### addListener(listener, once)
- `{Function} listener`
- `{boolean} once`

##### addListener(listener, scope, once)
- `{Function} listener`
- `{Object} scope`
- `{boolean} once`

##### then(listener [, scope] [, once])
- Alias for `addListener`

##### emit(data)
- `data` is optional

##### removeListener(listener)
- `{Function} listener`

##### removeAllListeners()
- Removes all registered listeners

##### listeners()
- Returns an array of registered listeners

##### listenersCount()
- Returns the number of registered listeners

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
