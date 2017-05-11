let template = `
  <ul>
    <li :for="p in products">
      {{ p.title }} - {{ p.price | currency }}
      <br>
      <button
        :attr="{disabled:!p.inventory}"
        :click="addToCart(p)">
        Add to cart
      </button>
    </li>
  </ul>
`

import { mapGetters, mapActions } from 'avalonx'

export default {
  name: 'product-list',
  template,
  computed: mapGetters({
    products: 'allProducts'
  }),
  methods: {
    ...mapActions([
      'addToCart'
    ]),
    onReady () {
      this.$store.dispatch('getAllProducts')
    }
  }
}
