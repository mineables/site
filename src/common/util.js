module.exports = {
/* convert number to a readable hashrate string ("244.32 Gh/s", "3.05 Th/s") */
  toReadableHashrate (hashrate) {
    let units = ['H/s', 'Kh/s', 'Mh/s', 'Gh/s', 'Th/s', 'Ph/s']
    let finalUnit = 'Eh/s'
    for (var idx in units) {
      var unit = units[idx]
      if (hashrate < 1000) {
        finalUnit = unit
        break
      } else {
        hashrate /= 1000
      }
    }
    var hashrateString = hashrate.toFixed(2)
    if (hashrateString.endsWith('.00')) {
      hashrateString = hashrate.toFixed(0)
    }
    return hashrateString + ' ' + finalUnit
  },
  /* convert seconds to a short readable string ("1.2 hours", "5.9 months") */
  secondsToReadableTime (seconds) {
    if (seconds <= 0) {
      return '0 seconds'
    }
    let units = ['years', 'months', 'days', 'hours', 'minutes', 'seconds']
    let divisors = [365.25 * 24 * 60 * 60, 30.4 * 24 * 60 * 60, 24 * 60 * 60, 60 * 60, 60, 1]
    for (var idx in units) {
      var unit = units[idx]
      var divisor = divisors[idx]
      if (seconds > divisor) {
        return (seconds / divisor).toFixed(1) + ' ' + unit
      }
    }
    return seconds.toFixed(1) + ' ' + 'seconds'
  },
  readable: function (num) {
    return Math.round(num / Math.pow(10, 18))
  },
  findPartImage (parts, id) {
    for (var i = 0; i < parts.length; i++) {
      if (parts[i].id === id) {
        if (parts[i].market) {
          return parts[i].market
        } else {
          return parts[i].img0
        }
      }
    }
  },
  parseModifier: function (modifier) {
    var tuple = this.parseCommand(modifier)
    var position = tuple[0]
    // var value = tuple[1]
    var op = tuple[2]
    var mod = tuple[3]

    if (op === 1) return '[+] Adds ' + mod + ' to ' + this.getPositionName(position)
    if (op === 2) return '[-] Subtracts ' + mod + ' from ' + this.getPositionName(position)
    if (op === 3) return '[*] Multiplies ' + this.getPositionName(position) + ' by ' + mod
    if (op === 4) return '[/] Divides ' + this.getPositionName(position) + ' by ' + mod
    if (op === 5) return '[+%] Adds ' + mod + '% to ' + this.getPositionName(position)
    if (op === 6) return '[-%] Subtracts ' + mod + '% from ' + this.getPositionName(position)
    if (op === 7) return 'Requires ' + this.getPositionName(position) + ' > ' + mod
    if (op === 8) return 'Requires ' + this.getPositionName(position) + ' < ' + mod
    if (op === 9) {
      let val = this.parseExponent(mod)
      if (position === 4) {
        val = this.toReadableHashrate(val)
      }
      return 'Adds ' + val + ' to ' + this.getPositionName(position)
    }
  },
  parseCommand: function (command) {
    var s = String(command)
    var position = s.substring(1, 3)
    var value = s.substring(3)
    var op = value.substring(0, 1)
    var modValue = value.substring(1, 4)
    return [Number(position), Number(value), Number(op), Number(modValue)]
  },
  getPositionName: function (position) {
    if (position === 0) {
      return 'Experience'
    } else if (position === 1) {
      return 'Life Decrement'
    } else if (position === 2) {
      return 'Execution Cost'
    } else if (position === 3) {
      return 'Socket Count'
    } else if (position === 4) {
      return 'Synthetic Hash Rate'
    } else if (position === 5) {
      return 'Accuracy'
    } else if (position === 6) {
      return 'Level'
    } else {
      return '[' + position + ']'
    }
  },
  parseExponent: function (op) {
    var s = String(op)
    var multiplier = s.substring(0, 1)
    var exp = s.substring(1, 3)
    return Number(multiplier) * Math.pow(10, Number(exp))
  }
}
