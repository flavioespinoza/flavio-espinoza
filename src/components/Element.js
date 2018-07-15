import React, { Component } from 'react'
import shallowEqual from 'react-pure-render/shallowEqual'
import ElementActions from '../flux/actions/ElementActions'
import ElementStore from '../flux/stores/ElementStore'
import connectToStores from 'alt-utils/lib/connectToStores'
import PropTypes from 'prop-types'

import _ from 'lodash'

const log = require('ololog').configure({
  locate: false
})

class Element extends Component {

  constructor (props, context) {
    super(props, context)

    this.handleShow = this.handleShow.bind(this)
    this.onHover = this.onHover.bind(this)

    this.state = {
      show: false
    }

  }
  shouldComponentUpdate (nextProps, nextState) {
    return !shallowEqual(this.props, nextProps)
  }

  handleShow(__id) {
    ElementActions.loadModal(__id)
  }

  onHover(__id) {
    ElementActions.setHoverId(__id)
  }


  static getStores () {
    return [ElementStore]
  }

  static getPropsFromStores () {
    return _.assign(ElementStore.getState())
  }


  render () {

    return (
      <div id={this.props.element.id}
           onMouseEnter={() => this.onHover(this.props.element.id)}
           onClick={() => {this.handleShow(this.props.element.id)}}
           className={`element-item mdl-shadow--2dp ${this.props.element.classes.join(' ')}`}
           data-category={this.props.element.category}>

        <p className={'symbol'}>
          <span className={'symbol-small'}>{this.props.element.symbol}</span>
          <span className={'symbol-large'}>{this.props.element.name}</span>
        </p>

        <p className={'weight date'}>{this.props.element.weight}</p>

        <p className={'title'}>{this.props.element.title}</p>

        <img className={'element-img'} src={this.props.element.img_url} />

      </div>
    )

  }

}

Element.propTypes = {
  element: PropTypes.shape({
    id: PropTypes.string,
    classes: PropTypes.array,
    category: PropTypes.string,
    name: PropTypes.string,
    symbol: PropTypes.string,
    number: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    weight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  })
}

export default connectToStores(Element)