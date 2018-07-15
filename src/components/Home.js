import React from 'react'
import shallowEqual from 'react-pure-render/shallowEqual'
import { Grid, Modal, ModalBody, ModalHeader, ModalFooter, Carousel, CarouselItem } from 'react-bootstrap'

import IsotopeResponseRenderer from './IsotopeResponseRenderer'
import Element from './Element'
import _ from 'lodash'

import ElementActions from '../flux/actions/ElementActions'
import ElementStore from '../flux/stores/ElementStore'
import FilterSortActions from '../flux/actions/FilterSortActions'
import FilterSortStore from '../flux/stores/FilterSortStore'
import connectToStores from 'alt-utils/lib/connectToStores'

const log = require('ololog').configure({
  locate: false
})

require('./Home.css')

const filterData = [
  {name: 'show all', value: '*'},
  {name: 'development', value: '.development'},
  {name: 'design', value: '.design'},
  {name: 'mobile', value: '.mobile'},
]

class Home extends React.Component {
  constructor (props, context) {
    super(props, context)

    this.___load_elements = this.___load_elements.bind(this)
    this.lightBoxModal = this.lightBoxModal.bind(this)
    this.onKeyPress = this.onKeyPress.bind(this)

    this.state = {
      filter_active: 'all',
      show: true,
    }

  }

  static getStores () {
    return [ElementStore, FilterSortStore]
  }

  static getPropsFromStores () {
    return _.assign(ElementStore.getState(), FilterSortStore.getState())
  }

  componentDidMount() {
    this.___load_elements({name: 'all', value: 'all'})
    document.addEventListener('keyup', this.onKeyPress)
    window.addEventListener('keydown', function(e) {
      if(e.keyCode == 32 && e.target == document.body) {
        e.preventDefault()
      }
    })

  }

  ___load_elements (__obj) {
    ElementActions.loadElements(__obj.value)
  }

  filterElements (filter, e) {
    FilterSortActions.filter(filter)
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState)
  }

  renderElements (__elements, e) {
    return __elements.map(__obj => <Element key={__obj.id} element={__obj}/>, this)
  }

  hideModal() {
    ElementActions.clearModal()
  }

  lightBoxModal() {

    const modal_results = this.props.modal_results

    if (_.isEmpty(modal_results)) {

      return

    } else   {

      const images = _.map(modal_results.images, function (__img, __idx) {

        return (
          <CarouselItem key={__idx} id={modal_results.id}>
            <img width={'100%'} height={'100%'} src={__img} className={'img-carousel'} />
          </CarouselItem>
        )

      })

      const light_box = function () {

        let controls = false
        let indicators = false

        if (modal_results.images.length > 1) {
          controls = true
          indicators = true
        }

        return (
          <Carousel controls={controls}
                    indicators={indicators}
                    interval={null}>
            {images}
          </Carousel>
        )

      }

      let modal_header_class = 'modal-header__' + modal_results.id
      let modal_footer_class = 'modal-footer__' + modal_results.id
      let modal_body_class   = 'modal-body__' + modal_results.id

      let show
      if (modal_results.images) {
        show = true
      } else {
        show = false
      }

      const style = {
        fontSize: 24,
        color: '#FFFFFF'
      }

      return (

        <Modal show={show}
               bsSize={'large'}
               onHide={this.hideModal}>

          <div style={style} className={'pt24 pl24 pb12'}>{modal_results.title}</div>

          <ModalBody className={modal_body_class}>

            {light_box()}

          </ModalBody>

          <ModalFooter className={modal_footer_class}>

            <p className={'modal-footer--text'}>{modal_results.text}</p>

            <button className={'mdl-button mdl-js-button mdl-js-ripple-effect'} onClick={this.hideModal}>close</button>

          </ModalFooter>

        </Modal>

      )
    }

  }

  renderFilterButtons () {

    const self = this

    const active = function (d) {
      if (self.props.filter === d.value) {
        return 'mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--accent'
      } else {
        return 'mdl-button mdl-js-button mdl-js-ripple-effect'
      }
    }

    return _.map(filterData, d => <button key={d.name}
                                          className={active(d)}
                                          onClick={this.filterElements.bind(this, d.value)}>{d.name}</button>, this)

  }

  onKeyPress (e) {

    const keyCode = e.which

    // console.log('keyCode', keyCode)

    switch (keyCode) {
      case 32: {
        ElementActions.loadModal(this.props.hover_id)
        break
      }
      case 8: // DEL Macbook Pro
      case 46: { // DEL PC

        break
      }
      case 27: { // ESC

        break
      }
    }
  }

  render () {

    return (

      <div>

        <Grid fluid={true}>

          <h3 className={'main-title p12 m0'}>The Periodic Table of Flavio</h3>

          <div className={'main-btn-group mb0'}>

            <div className={'filter-btns'}>

              <div>
                {this.renderFilterButtons()}
              </div>

            </div>

          </div>

          <IsotopeResponseRenderer>

            {this.renderElements(this.props.elements)}

          </IsotopeResponseRenderer>

        </Grid>


        {this.lightBoxModal()}


      </div>

    )
  }

}

export default connectToStores(Home)