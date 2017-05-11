let template = `
  <div class="chatapp">
    <thread-section :widget="{is: 'thread-section'}"></thread-section>
    <message-section :widget="{is: 'message-section'}"></message-section>
  </div>
`

import ThreadSection from './ThreadSection.js'
import MessageSection from './MessageSection.js'

export default {
  name: 'app',
  template,
  components: {
    ThreadSection,
    MessageSection
  }
}
