let template = `
  <div>
    <h1>Shopping Cart Example</h1>
    <hr>
    <h2>Products</h2>
    <product-list :widget="{is: 'product-list'}"></product-list>
    <hr>
    <cart :widget="{is: 'cart'}"></cart>
  </div>
`

import ProductList from './ProductList.js'
import Cart from './Cart.js'

export default {
  name: 'app',
  template,
  components: { ProductList, Cart }
}
