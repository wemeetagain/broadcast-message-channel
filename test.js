const Feed = require('./index').Feed

let f = new Feed('my_feed')

let p1 = f.openPort()
let f1 = function(e) {console.log('p1', e)}
p1.onmessage = f1

let p2 = f.openPort()
let f2 = function(e) {console.log('p2', e)}
p2.onmessage = f2
//p2.addEventListener('message', f2)

let p3 = f.openPort()
let f3 = function(e) {console.log('p3', e)}
//p3.addEventListener('message', f3)

console.log('postMessage')
p1.postMessage('lol')

/*
p1.removeEventListener('message', f1)
p2.removeEventListener('message', f2)
p3.removeEventListener('message', f3)
*/

setTimeout(() => {
  p1.close()
  p2.close()
  p3.close()

  f.close()
}, 100)

