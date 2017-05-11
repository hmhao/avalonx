let template = `
  <div class="message-section">
    <h3 class="message-thread-heading">{{ thread.name }}</h3>
    <ul class="message-list">
      <message
        :for="message in sortedMessages"
        :widget="{is: 'message', key:message.id, message:message}">
      </message>
    </ul>
    <textarea class="message-composer" :keyup="sendMessage | enter"></textarea>
  </div>
`

import Message from './Message.js'
import { mapGetters } from 'avalonx'

export default {
  name: 'message-section',
  template,
  components: { Message },
  computed: {
    ...mapGetters({
      thread: 'currentThread',
      messages: 'currentMessages'
    }),
    sortedMessages () {
      return this.messages
        .slice()
        .sort((a, b) => a.timestamp - b.timestamp)
    }
  },
  watch: {
    'thread.lastMessage': function () {
      setTimeout(() => {
        const ul = this.$element.getElementsByTagName('ul')[0]
        ul.scrollTop = ul.scrollHeight
      }, 1)
    }
  },
  methods: {
    sendMessage (e) {
      const text = e.target.value
      if (text.trim()) {
        this.$store.dispatch('sendMessage', {
          text,
          thread: this.thread
        })
        e.target.value = ''
      }
    }
  }
}
