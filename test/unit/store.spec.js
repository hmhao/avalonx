import avalon from 'avalon2/dist/avalon.js'
import Avalonx from '../../dist/avalonx.js'

const TEST = 'TEST'

describe('Store', () => {
  it('committing mutations', () => {
    const store = new Avalonx.Store({
      state: {
        a: 1
      },
      mutations: {
        [TEST] (state, n) {
          state.a += n
        }
      }
    })
    store.commit(TEST, 2)
    expect(store.state.a).toBe(3)
  })

  it('committing with object style', () => {
    const store = new Avalonx.Store({
      state: {
        a: 1
      },
      mutations: {
        [TEST] (state, payload) {
          state.a += payload.amount
        }
      }
    })
    store.commit({
      type: TEST,
      amount: 2
    })
    expect(store.state.a).toBe(3)
  })

  it('asserts committed type', () => {
    const store = new Avalonx.Store({
      state: {
        a: 1
      },
      mutations: {
        // Maybe registered with undefined type accidentally
        // if the user has typo in a constant type
        undefined (state, n) {
          state.a += n
        }
      }
    })
    expect(() => {
      store.commit(undefined, 2)
    }).toThrowError(/Expects string as the type, but found undefined/)
    expect(store.state.a).toBe(1)
  })

  it('dispatching actions, sync', () => {
    const store = new Avalonx.Store({
      state: {
        a: 1
      },
      mutations: {
        [TEST] (state, n) {
          state.a += n
        }
      },
      actions: {
        [TEST] ({ commit }, n) {
          commit(TEST, n)
        }
      }
    })
    store.dispatch(TEST, 2)
    expect(store.state.a).toBe(3)
  })

  it('dispatching with object style', () => {
    const store = new Avalonx.Store({
      state: {
        a: 1
      },
      mutations: {
        [TEST] (state, n) {
          state.a += n
        }
      },
      actions: {
        [TEST] ({ commit }, payload) {
          commit(TEST, payload.amount)
        }
      }
    })
    store.dispatch({
      type: TEST,
      amount: 2
    })
    expect(store.state.a).toBe(3)
  })

  it('dispatching actions, with returned Promise', done => {
    const store = new Avalonx.Store({
      state: {
        a: 1
      },
      mutations: {
        [TEST] (state, n) {
          state.a += n
        }
      },
      actions: {
        [TEST] ({ commit }, n) {
          return new Promise(resolve => {
            setTimeout(() => {
              commit(TEST, n)
              resolve()
            }, 0)
          })
        }
      }
    })
    expect(store.state.a).toBe(1)
    store.dispatch(TEST, 2).then(() => {
      expect(store.state.a).toBe(3)
      done()
    })
  })

  it('composing actions with async/await', done => {
    const store = new Avalonx.Store({
      state: {
        a: 1
      },
      mutations: {
        [TEST] (state, n) {
          state.a += n
        }
      },
      actions: {
        [TEST] ({ commit }, n) {
          return new Promise(resolve => {
            setTimeout(() => {
              commit(TEST, n)
              resolve()
            }, 0)
          })
        },
        two: async ({ commit, dispatch }, n) => {
          await dispatch(TEST, 1)
          expect(store.state.a).toBe(2)
          commit(TEST, n)
        }
      }
    })
    expect(store.state.a).toBe(1)
    store.dispatch('two', 3).then(() => {
      expect(store.state.a).toBe(5)
      done()
    })
  })

  it('detecting action Promise errors', done => {
    const store = new Avalonx.Store({
      actions: {
        [TEST] () {
          return new Promise((resolve, reject) => {
            reject('no')
          })
        }
      }
    })
    const spy = jasmine.createSpy()
    const thenSpy = jasmine.createSpy()
    store.dispatch(TEST)
      .then(thenSpy)
      .catch(err => {
        expect(thenSpy).not.toHaveBeenCalled()
        expect(err).toBe('no')
        expect(spy).toHaveBeenCalledWith('avalonx:error', 'no')
        done()
      })

    spy('avalonx:error', 'no')
  })

  it('asserts dispatched type', () => {
    const store = new Avalonx.Store({
      state: {
        a: 1
      },
      mutations: {
        [TEST] (state, n) {
          state.a += n
        }
      },
      actions: {
        // Maybe registered with undefined type accidentally
        // if the user has typo in a constant type
        undefined ({ commit }, n) {
          commit(TEST, n)
        }
      }
    })
    expect(() => {
      store.dispatch(undefined, 2)
    }).toThrowError(/Expects string as the type, but found undefined/)
    expect(store.state.a).toBe(1)
  })

  it('getters', () => {
    const store = new Avalonx.Store({
      state: {
        a: 0
      },
      getters: {
        state: state => state.a > 0 ? 'hasAny' : 'none'
      },
      mutations: {
        [TEST] (state, n) {
          state.a += n
        }
      },
      actions: {
        check ({ getters }, value) {
          // check for exposing getters into actions
          expect(getters.state).toBe(value)
        }
      }
    })
    expect(store.getters.state).toBe('none')
    store.dispatch('check', 'none')

    store.commit(TEST, 1)

    expect(store.getters.state).toBe('hasAny')
    store.dispatch('check', 'hasAny')
  })

  it('watch: with resetting vm', done => {
    const store = new Avalonx.Store({
      state: {
        count: 0
      },
      mutations: {
        [TEST]: state => state.count++
      }
    })

    const spy = jasmine.createSpy()
    store.watch('count', spy)
    // reset store vm
    store.registerModule('test', {})

    setTimeout(()=>{
      store.commit(TEST)
      expect(store.state.count).toBe(1)

      setTimeout(()=>{
        expect(spy).toHaveBeenCalled()
        done()
      }, 1)
    }, 1)
  })

  it('watch: after watch then call it', done => {
    const store = new Avalonx.Store({
      state: {
        count: 0
      },
      mutations: {
        [TEST]: state => state.count++
      }
    })

    const spy = jasmine.createSpy()
    const uw = store.watch('count', spy)
    uw()
    setTimeout(()=>{
      store.commit(TEST)
      expect(store.state.count).toBe(1)

      setTimeout(()=>{
        expect(spy).not.toHaveBeenCalled()
        done()
      }, 1)
    }, 1)
  })

  it('should accept state as function', () => {
    const store = new Avalonx.Store({
      state: () => ({
        a: 1
      }),
      mutations: {
        [TEST] (state, n) {
          state.a += n
        }
      }
    })
    expect(store.state.a).toBe(1)
    store.commit(TEST, 2)
    expect(store.state.a).toBe(3)
  })
})