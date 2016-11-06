module.exports.merge = function(_default, _custom) {
  let _new = _default
  for (key in _default) {
    if (_custom[key] != undefined) {
      if (typeof _custom[key] == 'object') {
        module.exports.merge(_default[key], _custom[key])
      } else {
        _default[key] = _custom[key]
      }
    }
  }

  return _new
}
