import React from 'react'
import shallowEqual from 'react-pure-render/shallowEqual'
import { Grid, Button, ButtonGroup, Alert, Modal, ModalBody, ModalHeader, ModalFooter, Carousel, CarouselItem } from 'react-bootstrap'

import IsotopeResponseRenderer from './IsotopeResponseRenderer'
import Element from './Element'
import _ from 'lodash'

import ElementActions from '../flux/actions/ElementActions'
import ElementStore from '../flux/stores/ElementStore'
import FilterSortActions from '../flux/actions/FilterSortActions'
import FilterSortStore from '../flux/stores/FilterSortStore'
import connectToStores from 'alt-utils/lib/connectToStores'

import * as elements from '../elements'

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

const sortData = [
  {name: 'original order', value: ''},
  {name: 'date', value: 'weight'},
  {name: 'symbol', value: 'symbol'},
]

let open_modal = false

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

  sortElements (sort, e) {
    FilterSortActions.sort(sort)
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState)
  }

  renderElements (__elements, e) {
    return __elements.map(__obj => <Element key={__obj.id}
                                            element={__obj}></Element>, this)
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

      return (

        <Modal show={show}
               bsSize={'large'}
               onHide={this.hideModal}>

          <ModalHeader className={modal_header_class}>
            <Modal.Title>
              {modal_results.title}
            </Modal.Title>
          </ModalHeader>

          <ModalBody className={modal_body_class}>

            {light_box()}

          </ModalBody>

          <ModalFooter className={modal_footer_class}>

            <p className={'modal-footer--text'}>{modal_results.text}</p>

            <Button onClick={this.hideModal}>close</Button>

          </ModalFooter>

        </Modal>

      )
    }

  }

  renderFilterButtons () {
    return _.map(filterData, d => <Button key={d.name} active={this.props.filter == d.value}
                                          onClick={this.filterElements.bind(this, d.value)}>{d.name}</Button>, this)
  }

  renderSortButtons () {
    return _.map(sortData, d => <Button key={d.name} active={this.props.sort == d.value}
                                        onClick={this.sortElements.bind(this, d.value)}>{d.name}</Button>, this)
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

          <h3 className={'main-title'}>The Periodic Table of Flavio</h3>

          <div className={'main-btn-group'}>

            <div className={'filter-btns'}>

              <ButtonGroup>

                {this.renderFilterButtons()}

              </ButtonGroup>

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