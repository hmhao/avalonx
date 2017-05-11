let template = `
  <div class="thread-section">
    <div class="thread-count">
      <span :visible="unreadCount">
        Unread threads: {{ unreadCount }}
      </span>
    </div>
    <ul class="thread-list">
      <thread
        :for="thread in threads"
        :widget="{is: 'thread', key:thread.id, thread:thread, active:thread.id === currentThread.id, 'switchThread':switchThread}">
      </thread>
    </ul>
  </div>
`

import Thread from './Thread.js'
import { mapGetters } from 'avalonx'

export default {
  name: 'thread-section',
  template,
  components: { Thread },
  computed: {
    ...mapGetters([
      'threads',
      'currentThread'
    ]),
    unreadCount () {
      const threads = this.threads
      return Object.keys(threads).reduce((count, id) => {
        return threads[id].lastMessage.isRead
          ? count
          : count + 1
      }, 0)
    }
  },
  methods: {
    switchThread (id) {
      this.$store.dispatch('switchThread', { id })
    }
  }
}
