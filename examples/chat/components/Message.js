let template = `
  <li class="message-list-item">
    <h5 class="message-author-name">{{ message.authorName }}</h5>
    <div class="message-time">
      {{ message.timestamp | time }}
    </div>
    <div class="message-text">{{ message.text }}</div>
  </li>
`

export default {
  name: 'message',
  template,
  props: {
    message: {}
  }
}
