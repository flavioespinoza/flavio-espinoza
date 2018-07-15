import alt from '../../alt'
import Promise from 'bluebird'
import * as elements from '../../elements'

const log = require('ololog').configure({
  locate: false
})

Promise.longStackTraces()

class ElementActions {

  constructor () {
    this.generateActions('elementResults')
    this.generateActions('modalResults')
    this.generateActions('hoverResult')

  }

  loadElements (__class) {

    Promise.resolve(elements.__all()).then((response) => {

      // log.lightBlue(JSON.stringify(response))
      // console.log('this', this)

      this.elementResults({
        type: __class,
        elements: response,
        loading: false,
        err: null
      })

    }).catch((err) => {

      log.red('ACTION__loadElements__ERROR', err.stack || err.message || err)

    })

  }

  setHoverId (__id) {
    Promise.resolve(__id).then((__hover_id) => {
      this.hoverResult(__hover_id)
    }).catch((err) => {
      log.red('ACTION__hoverIdResult__ERROR', err.stack || err.message || err)
    })
  }

  clearModal () {

    let result = {}

    Promise.resolve(result).then((__modal_results) => {

      this.modalResults(__modal_results)

    }).catch((err) => {
      log.red('ACTION__clearModal__ERROR', err.stack || err.message || err)
    })

  }

  loadModal (__id) {

    let result = elements.__modal(__id)

    Promise.resolve(result).then((__modal_results) => {

      this.modalResults(__modal_results)

    }).catch((err) => {
      log.red('ACTION__loadModal__ERROR', err.stack || err.message || err)
    })

  }


}

export default alt.createActions(ElementActions)