module.exports.merge = function(_default, _custom, doNotCopyList) {
  if (!_custom) _custom = {}

  let _new = {}
  for (let key in _default) {
    const _customDescriptor = Object.getOwnPropertyDescriptor(_custom, key)
    const _defaultDescriptor = Object.getOwnPropertyDescriptor(_default, key)
    if (typeof _default[key] == 'object') {
      if (_customDescriptor != undefined && (_customDescriptor.get != undefined || _customDescriptor.set != undefined)) {
        Object.defineProperty(_new, key, _customDescriptor)
      }
      else {
        if (_defaultDescriptor.get != undefined || _defaultDescriptor.set != undefined) {
          Object.defineProperty(_new, key, _defaultDescriptor)
        }
        else {
          let found = false
          if (doNotCopyList != undefined && doNotCopyList.length > 0) {
            for (let i = 0; i < doNotCopyList.length; i++) {
              if (doNotCopyList[i] == key) {
                found = true
                if (_customDescriptor == undefined) _new[key] = _default[key]
                else _new[key] = _custom[key]
                break
              }
            }
          }
          if (found == false) _new[key] = module.exports.merge(_default[key], _custom[key], doNotCopyList)
        }
      }
    }
    else {
      if (_custom[key] != undefined) {
        Object.defineProperty(_new, key, _customDescriptor)
      }
      else {
        Object.defineProperty(_new, key, _defaultDescriptor)
      }
    }
  }
  for (let key in _custom) {
    if (_new[key] == undefined) {
      const _customDescriptor = Object.getOwnPropertyDescriptor(_custom, key)
      if (typeof _custom[key] == 'object') {
        if (_customDescriptor != undefined && (_customDescriptor.get != undefined || _customDescriptor.set != undefined)) {
          Object.defineProperty(_new, key, _customDescriptor)
        }
        else {
          let found = false
          if (doNotCopyList != undefined && doNotCopyList.length > 0) {
            for (let i = 0; i < doNotCopyList.length; i++) {
              if (doNotCopyList[i] == key) {
                found = true
                _new[key] = _custom[key]
                break
              }
            }
          }
          if (found == false) _new[key] = module.exports.merge(_custom[key], {}, doNotCopyList)
        }
      }
      else {
        Object.defineProperty(_new, key, _customDescriptor)
      }
    }
  }

  return _new
}

module.exports.logerr = function(message) {
  throw new Error(message)
}

module.exports.logwarn = function() {
  console.warn(message)
}
