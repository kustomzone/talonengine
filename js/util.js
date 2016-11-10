module.exports.merge = function(_default, _custom) {
  if (!_custom) _custom = {}
  
  let _new = {}
  for (key in _default) {
    if (typeof _default[key] == 'object') {
      _new[key] = module.exports.merge(_default[key], _custom[key])
    } else {
      if (_custom[key] != undefined) {
        _new[key] = _custom[key]
      } else {
        _new[key] = _default[key]
      }
    }
  }

  return _new
}
