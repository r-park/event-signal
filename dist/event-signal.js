/* event-signal v0.1.1 - Wed Apr 22 2015 02:41:57 GMT-0400 (EDT) */
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.EventSignal = factory();
  }
}(this, function() {
'use strict';


/**
 * @name EventSignal
 * @constructor
 */
function EventSignal() {

  if (!(this instanceof EventSignal)) {
    return new EventSignal();
  }

  /**
   * @private
   * @type {Array}
   */
  this._listeners = [];

}


EventSignal.prototype = {

  /**
   * @param {Function} listenerFn
   * @param {Object|boolean} [scope]
   * @param {boolean} [once]
   * @returns {EventSignal}
   * @throws {TypeError}
   */
  addListener : function(listenerFn, scope, once) {
    if (!this._validate(listenerFn)) {
      throw new TypeError('`listenerFn` must be a function and cannot be added more than once');
    }

    var listener = {callback: listenerFn};

    if (typeof scope === 'boolean') {
      listener.scope = {};
      listener.once = scope;
    }
    else {
      listener.scope = scope || {};
      listener.once = once;
    }

    this._listeners.push(listener);

    return this;
  },


  /**
   * @param {*} [data]
   * @returns {EventSignal}
   */
  emit : function(data) {
    var listeners = this._listeners.slice(),
        count = listeners.length,
        listener;

    for (var i = 0; i < count; i++) {
      listener = listeners[i];
      listener.callback.call(listener.scope, data);

      if (listener.once) {
        this.removeListener(listener.callback);
      }
    }

    return this;
  },


  /**
   * @param {Function} listenerFn
   * @returns {EventSignal}
   */
  removeListener : function(listenerFn) {
    var index = this._indexOf(listenerFn);

    if (index >= 0) {
      this._listeners.splice(index, 1);
    }

    return this;
  },


  /**
   * @returns {EventSignal}
   */
  removeAllListeners : function() {
    if (Array.isArray(this._listeners)) {
      this._listeners.length = 0;
    }

    return this;
  },


  /**
   * @returns {Array}
   */
  listeners : function() {
    return this._listeners.slice();
  },


  /**
   * @returns {number}
   */
  listenerCount : function() {
    return this._listeners.length;
  },


  /**
   * @private
   * @param {Function} listenerFn
   * @returns {number}
   */
  _indexOf : function(listenerFn) {
    var listeners = this._listeners,
        i = listeners.length;

    while(i--) {
      if (listenerFn === listeners[i].callback) {
        return i;
      }
    }

    return -1;
  },


  /**
   * @private
   * @param {Function} listenerFn
   * @returns {boolean}
   */
  _validate : function(listenerFn) {
    return typeof listenerFn === 'function' && this._indexOf(listenerFn) < 0;
  }

};


EventSignal.prototype.then = EventSignal.prototype.addListener;

return EventSignal;
}));
