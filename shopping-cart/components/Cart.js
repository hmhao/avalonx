let template = `
  <div class="cart">
    <h2>Your Cart</h2>
    <p :visible="!products.length"><i>Please add some products to cart.</i></p>
    <ul>
      <li :for="p in products">
        {{ p.title }} - {{ p.price | currency }} x {{ p.quantity }}
      </li>
    </ul>
    <p>Total: {{ total | currency }}</p>
    <p><button :attr="{disabled:!products.length}" :click="checkout(products)">Checkout</button></p>
    <p :visible="checkoutStatus">Checkout {{ checkoutStatus }}.</p>
  </div>
`

import { mapGetters } from 'avalonx'

export default {
  name: 'cart',
  template,
  computed: {
    ...mapGetters({
      products: 'cartProducts',
      checkoutStatus: 'checkoutStatus'
    }),
    total () {
      return this.products.reduce((total, p) => {
        return total + p.price * p.quantity
      }, 0)
    }
  },
  methods: {
    checkout (products) {
      this.$store.dispatch('checkout', products)
    }
  }
}
