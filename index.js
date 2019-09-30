const {
  eventData,
  MessageChannel,
} = require('message-channel')

function hasBroadcastChannel() {
  try {
    BroadcastChannel
    BroadcastChannel.prototype.start = function() {}
    return true
  } catch (e) {
    return false
  }
}

class MessageChannelFeed {
  constructor (name) {
    this.name = name
    this.channels = []
  }

  _messageHandler(channel) {
    return (e) => {
      this.channels
        .map((c) => c.port1)
        .filter((p) => p !== channel.port1)
        .forEach((p) =>
          p.postMessage(eventData(e)))
    }
  }

  openPort() {
    const channel = new MessageChannel()
    channel.port1.onmessage = this._messageHandler(channel)
    channel.port1.start()
    this.channels.push(channel)
    return channel.port2
  }

  close() {
    this.channels.forEach((c) =>
      c.port1.close())
  }
}

class BroadcastChannelFeed {
  constructor (name) {
    this.name = name
  }
  openPort() {
    return new BroadcastChannel(name)
  }
  close() {}
}

const Feed = hasBroadcastChannel()
  ? BroadcastChannelFeed
  : MessageChannelFeed

module.exports = {
  BroadcastChannelFeed,
  MessageChannelFeed,
  Feed,
  eventData,
}

