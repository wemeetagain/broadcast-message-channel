describe('BroadcastChannelFeed', () => {
  it("should send messages across open ports", () => {
    const f = new feed.BroadcastChannelFeed('test_feed')

    const p1 = f.openPort()
    p1.start()

    let x
    p1.onmessage = function() {x = 1}

    const p2 = f.openPort()
    p2.start()

    p2.postMessage('test_message')
    
    setTimeout(() => {
      chai.assert(x == 1)
      p1.close()
      p2.close()
      f.close()
    }, 10)
  })
})
