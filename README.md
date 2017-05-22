# Avalonx [![Build Status](https://circleci.com/gh/hmhao/avalonx/tree/master.png?style=shield)](https://circleci.com/gh/hmhao/avalonx)

> Centralized State Management for Avalon2.js.

基于[Vuex](https://github.com/vuejs/vuex)修改适应[avalon2](https://github.com/RubyLouvre/avalon)

- [What is Vuex?](http://vuex.vuejs.org/en/intro.html)
- [Full Documentation](http://vuex.vuejs.org/)

## Examples

- [Counter](https://github.com/hmhao/avalonx/tree/master/examples/counter)
- [Counter with Hot Reload](https://github.com/hmhao/avalonx/tree/master/examples/counter-hot)
- [Shopping Cart](https://github.com/hmhao/avalonx/tree/master/examples/shopping-cart)
- [TodoMVC](https://github.com/hmhao/avalonx/tree/master/examples/todomvc)
- [Flux Chat](https://github.com/hmhao/avalonx/tree/master/examples/chat)

Running the examples:

``` bash
$ npm install
$ npm run dev # serve examples at localhost:8080
```

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
