// Transform Coffe Function to JS
$(function() {
  $('a.ajax').on('click', function(e) {
    e.preventDefault()
    $.get($(this).attr('href'))
      .success(function(response) {
        console.log(response)
      })
  })
})

// Even Better JS without jQuery
const nodes = document.querySelectorAll('a.ajax')
Array.from(nodes).forEach( a => {
  a.addEventListener('click', (e) => {
    e.preventDefault()
    fetch(a.href).then( r => conosole.log(r))
  })
})

// ------------------------------
// Example function to mount Vue on the page
// ------------------------------
import Vue from 'vue'
import Vuex from 'vuex'
import { entries, merge } from 'lodash'

export function app(name, component, customStore = {}) {
  Vue.use(Vuex)

  const node = document.querySelector(`#vue-app[vue-app=${name}]`)

  // Basic Root store
  const defaultStore = {
    state: { ... },
    getters: { ... },
    plugins: [...]
  }

  const store = merge({}, defaultStore, customStore)

  // Read and pass props into the main coponent
  const props = {}
  entries(node.dataset).forEach(([key, value]) => {
    try {
      props[key] = JSON.parse(value)
    } catch (e) {
      props[key] = value
    }
  })

  // Basic Root instance
  const instance = {
    name: 'App',
    store: new Vuex.Store(store),
    render(h) {
      return h(
        'div',
        {
          attrs: {
            id: `app-${name}`,
          },
        },
        [h(component, { props })]
      )
    },
  }

  return new Vue(instance).$mount(node)
}
