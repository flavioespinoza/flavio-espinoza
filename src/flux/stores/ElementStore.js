import alt from '../../alt'
import QueryActions from '../actions/ElementActions'

class ElementStore {
  constructor () {

    this.bindListeners({
      onHoverId: QueryActions.hoverResult,
      onModalResults: QueryActions.modalResults,
      onElementResults: QueryActions.elementResults,
    })

    this.state = {
      type: '',
      elements: [],
      loading: false,
      modal_results: {},
      hover_id:   null,
      err: null
    }

  }

  onHoverId (__id) {
    this.setState({hover_id: __id})
  }

  onModalResults (__modal_results) {
    this.setState({modal_results: __modal_results})
  }

  onElementResults (data) {

    this.setState({
      type: data.type,
      elements: data.elements,
      loading: data.loading,
      err: data.err
    })
  }

}

export default alt.createStore(ElementStore, 'ElementStore')
