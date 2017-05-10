# Avalonx

> Centralized State Management for Avalon2.js.

基于Vuex修改适应avalon2

- [What is Vuex?](http://vuex.vuejs.org/en/intro.html)
- [Full Documentation](http://vuex.vuejs.org/)

部分API调整

* ~~strict~~

* `watch(getter: String, cb: Function)`<br>
响应式地监测一个 getter 表达式，当值改变时调用回调函数<br>
要停止监测，直接调用返回的处理函数。

* `unwatch(getter?: String, cb?: Function)`<br>
删除监听
  * 若 getter 为空，则删除所有监听，若 getter 为表达式，则删除该表达式的所有监听
  * 若 cb 不为空，则删除该表达式对应cb的监听

## License

[MIT](http://opensource.org/licenses/MIT)