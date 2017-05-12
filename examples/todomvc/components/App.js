let template = `
  <div class="todoapp">
    <!-- header -->
    <div class="header">
      <h1>todos</h1>
      <input class="new-todo"
        autofocus
        autocomplete="off"
        placeholder="What needs to be done?"
        :keyup="addTodo | enter">
    </div>
    <!-- main section -->
    <div class="main" :visible="todos.length">
      <input class="toggle-all"
        type="checkbox"
        :attr="{checked:allChecked}">
      <label :click="toggleAll({ done: !allChecked })"></label>
      <ul class="todo-list">
        <todo :for="(index, todo) in filteredTodos" :widget="{is: 'todo', key:index, todo: todo}"></todo>
      </ul>
    </div>
    <!-- footer -->
    <div class="footer" :visible="todos.length">
      <span class="todo-count">
        <strong>{{ remaining }}</strong>
        {{ remaining | pluralize('item') }} left
      </span>
      <ul class="filters">
        <li :for="(key, val) in $filters">
          <a :attr="{href:'#/' + key}"
            :class="{ selected: visibility === key }"
            :click="visibility = key">{{ key | capitalize }}</a>
        </li>
      </ul>
      <button class="clear-completed"
        :visible="todos.length > remaining"
        :click="clearCompleted">
        Clear completed
      </button>
    </div>
  </div>
`

import { mapMutations } from 'avalonx'
import Todo from './Todo.js'

const filters = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.done),
  completed: todos => todos.filter(todo => todo.done)
}

export default {
  name: 'app',
  template,
  components: { Todo },
  data () {
    return {
      visibility: 'all',
      $filters: filters
    }
  },
  computed: {
    todos () {
      return this.$store.state.todos
    },
    allChecked () {
      return this.todos.every(todo => todo.done)
    },
    filteredTodos () {
      return this.$filters[this.visibility](this.todos)
    },
    remaining () {
      return this.todos.filter(todo => !todo.done).length
    }
  },
  methods: {
    addTodo (e) {
      var text = e.target.value
      if (text.trim()) {
        this.$store.commit('addTodo', { text })
      }
      e.target.value = ''
    },
    ...mapMutations([
      'toggleAll',
      'clearCompleted'
    ])
  },
  filters: {
    pluralize: (n, w) => n === 1 ? w : (w + 's'),
    capitalize: s => s.charAt(0).toUpperCase() + s.slice(1)
  }
}
