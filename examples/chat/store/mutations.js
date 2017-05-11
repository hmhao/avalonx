import * as types from './mutation-types'

export default {
  [types.RECEIVE_ALL] (state, { messages }) {
    let $threads = state.threads.$model
    let latestMessage
    messages.forEach(message => {
      // create new thread if the thread doesn't exist
      if (!$threads[message.threadID]) {
        createThread($threads, message.threadID, message.threadName)
      }
      // mark the latest message
      if (!latestMessage || message.timestamp > latestMessage.timestamp) {
        latestMessage = message
      }
      // add message
      addMessage($threads, state.currentThreadID, message)
    })
    state.threads = $threads
    // set initial thread to the one with the latest message
    setCurrentThread(state, latestMessage.threadID)
  },

  [types.RECEIVE_MESSAGE] (state, { message }) {
    addMessage(state.threads, state.currentThreadID, message)
  },

  [types.SWITCH_THREAD] (state, { id }) {
    setCurrentThread(state, id)
  }
}

function createThread (threads, id, name) {
  threads[id] = {
    id,
    name,
    messages: [],
    lastMessage: ''
  }
}

function addMessage (threads, threadID, message) {
  // add a `isRead` field before adding the message
  message.isRead = message.threadID === threadID
  // add it to the thread it belongs to
  const thread = threads[message.threadID]
  if (!thread.messages.some(id => id === message.id)) {
    thread.messages.push(message)
    thread.lastMessage = message
  }
}

function setCurrentThread (state, id) {
  state.currentThreadID = id
  if (!state.threads[id]) {
    debugger
  }
  // mark thread as read
  state.threads[id].lastMessage.isRead = true
}
