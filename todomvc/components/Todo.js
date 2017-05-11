let template = `
  <li class="todo" :class="{ completed: todo.done, editing: editing }">
    <div class="view">
      <!--avalon的bug，click指令需要在dblclick指令前执行，否则click指令将会绑定失败-->
      <button class="destroy" :click="deleteTodo({ todo: todo })"></button>
      <input class="toggle"
        type="checkbox"
        :attr="{checked:todo.done}"
        :change="toggleTodo({ todo: todo })">
      <label :dblclick="editing = true">{{todo.text}}</label>
    </div>
    <input class="edit"
      :visible="editing"
      :attr="{value: todo.text}"
      :keyup="doneEdit | enter"
      :keyup="cancelEdit | esc"
      :blur="doneEdit">
  </li>
`

import { mapMutations } from 'avalonx'

export default {
  name: 'todo',
  template,
  props: {
    todo: {
      done: false,
      text : ''
    }
  },
  data () {
    return {
      editing: false
    }
  },
  methods: {
    ...mapMutations([
      'editTodo',
      'toggleTodo',
      'deleteTodo'
    ]),
    doneEdit (e) {
      const value = e.target.value.trim()
      const { todo } = this
      if (!value) {
        this.deleteTodo({
          todo
        })
      } else if (this.editing) {
        this.editTodo({
          todo,
          value
        })
        this.editing = false
      }
    },
    cancelEdit (e) {
      e.target.value = this.todo.text
      this.editing = false
    }
  },
  watch: {
    editing (value) {
      if (value) {
        let els = this.$element.getElementsByTagName('input')
        let el = els[1]
        el.focus()
      }
    }
  }
}
