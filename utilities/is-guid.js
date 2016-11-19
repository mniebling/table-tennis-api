// Very naive guid checker
function isGuid (param) {
  return (param.length === 36)
}

module.exports = isGuid
