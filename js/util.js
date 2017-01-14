module.exports.merge = function(_default, custom, doNotCopyList) {
  // Create the custom object if it doesnt exist
  if (!custom) custom = {}
  const _new = {}

  // Check if property 'key' of 'object' is a getter and setter
  const checkGetterSetter = function(object, key) {
    const descriptor = Object.getOwnPropertyDescriptor(object, key)
    if (descriptor && (descriptor.get != undefined || descriptor.set != undefined)) {
      return true
    }
    return false
  }

  // Checks the type of 'object[key]' params and calls the respective callback
  const checkType = function(object, key, callbacks) {
    const isGetterSetter = checkGetterSetter(object, key)
    if (isGetterSetter) {
      if (callbacks['gettersetter'] != undefined) callbacks['gettersetter'](object, key)
    } else {
      const typeString = {}.toString.call(object[key])
      const type = typeString.substr(8).substr(0, typeString.length - 9)
      if (callbacks[type] != undefined) callbacks[type](object, key)
    }
  }

  // Checks if 'key' is in do not copy list
  const checkDoNotCopyList = function(key) {
    if (doNotCopyList == undefined) return false
    for (let i = 0; i < doNotCopyList.length; i++) {
      if (doNotCopyList[i] == key) return true
    }
    return false
  }

  // Straight up assign (Shallow copy)
  const primitiveCallback = function(object, key) { _new[key] = object[key] }
  // Deep copy of default object
  const objectCallback = function(object, key) {
    if (checkDoNotCopyList(key)) _new[key] = object[key]
    else {
      if (object == _default) _new[key] = module.exports.merge(object[key], {}, doNotCopyList)
      else _new[key] = module.exports.merge(_default[key], object[key], doNotCopyList)
    }
  }
  // Deep copy of array
  const arrayCallback = function(object, key) {
    const copyArray = function(object, key) {
      const newArray = []
      const array = object[key]
      for (let i = 0; i < array.length; i++) {
        const bufferObject = {}
        bufferObject['buffer'] = array[i]

        // Custom callbacks
        const arrPrimitiveCallback = function(object, keyy) { newArray.push(object[keyy]) }

        checkType(bufferObject, 'buffer', {
          Number: arrPrimitiveCallback,
          String: arrPrimitiveCallback,
          Function: arrPrimitiveCallback,
          Boolean: arrPrimitiveCallback,
          Object: function(object, keyy) {
            if (checkDoNotCopyList(keyy)) newArray.push(object[keyy])
            else newArray.push(module.exports.merge(object[keyy], {}, doNotCopyList))
          },
          Array: function(object, keyy) {
            newArray.push(copyArray(object, keyy))
          }
        })
      }

      return newArray
    }

    _new[key] = copyArray(object, key)
  }
  // Define property for getters and setters
  const getterSetterCallback = function(object, key) {
    Object.defineProperty(_new, key, Object.getOwnPropertyDescriptor(object, key))
  }

  // Callback object
  const callbacks = {
    Number: primitiveCallback,
    String: primitiveCallback,
    Boolean: primitiveCallback,
    Function: primitiveCallback,
    Null: primitiveCallback,
    Object: objectCallback,
    Array: arrayCallback,
    gettersetter: getterSetterCallback
  }

  // Loop through default properties first, then custom ones
  for (let key in _default) {
    if (custom[key] != undefined) {
      checkType(custom, key, callbacks)
    } else {
      checkType(_default, key, callbacks)
    }
  }
  for (let key in custom) checkType(custom, key, callbacks)

  return _new
}

module.exports.logerr = function(message) {
  throw new Error(message)
}

module.exports.logwarn = function() {
  console.warn(message)
}
