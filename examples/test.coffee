# Assignment:
number   = 42
opposite = true

# Conditions:
number = -42 if opposite

# Functions:
square = (x) -> x * x

# Arrays:
list = [1, 2, 3, 4, 5]

# Objects:
math =
  root:   Math.sqrt
  square: square
  cube:   (x) -> x * square x

# Splats:
race = (winner, runners...) ->
  print winner, runners

# Existence:
alert "I knew it!" if elvis?

# Array comprehensions:
cubes = (math.cube num for num in list)

console.log "Number: #{number}"

# Print time:
time = ->
  setInterval -> 
    console.log Date.now()
  , 1000

module.exports = {
  time: time,
  square: square
}

###

在其它文件中使用 test.coffee 实例:

# 1.未在 webpage.config.js 配置 coffee-loader
import test from 'coffee-loader!./test.coffee'


# 2.已在 webpage.config.js 中配置 coffee-loader（推荐使用此方法）
import test from './test.coffee'


test.time()

let square = test.square(2)
console.log(square)

###