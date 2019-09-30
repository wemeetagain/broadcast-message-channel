const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

const {
  eventData,
  MessageChannelFeed,
} = require('../index')

const expect = chai.expect
chai.use(sinonChai)

describe('MessageChannelFeed', () => {
  it('should send messages across open ports', () => {
    const feed = new MessageChannelFeed('test_feed')

    const p1 = feed.openPort()
    p1.start()

    const cb = sinon.spy()
    p1.onmessage = cb

    const p2 = feed.openPort()
    p2.start()

    sinon.spy(p2, 'postMessage')
    p2.postMessage('test_message')

    setTimeout(() => {
      expect(p2.postMessage).to.have.been.calledOnce
      expect(cb).to.have.been.calledOnce

      p1.close()
      p2.close()
      feed.close()
    }, 10)
  })
})
