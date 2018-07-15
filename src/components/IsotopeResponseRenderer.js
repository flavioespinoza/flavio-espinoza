import React from 'react'
import ReactDom from 'react-dom'
import shallowEqual from 'react-pure-render/shallowEqual'

// Flux
import connectToStores from 'alt-utils/lib/connectToStores';
import FilterSortStore from '../flux/stores/FilterSortStore';
import $ from 'jquery'
import _ from 'lodash'
import Isotope from 'isotope-layout'

class IsotopeResponseRenderer extends React.Component {
  // This class takes no attributes, pass in children of type Element
  static propTypes = {};

  static getStores() {
    return [FilterSortStore];
  }
  static getPropsFromStores() {
    return FilterSortStore.getState();
  }

  constructor(props, context) {
    super(props, context);

    // Copied from http://codepen.io/desandro/pen/nFrte
    this.filterFns = {
      // show if number is greater than 50
      numberGreaterThan50: function () {
        let number = $(this).find('.number').text();
        return parseInt( number, 10 ) > 50;
      },
      // show if name ends with -ium
      ium: function () {
        let name = $(this).find('.name').text();
        return name.match( /ium$/ );
      }
    };

    this.isoOptions = {
      itemSelector: '.element-item',
      layoutMode: 'masonry',
      masonry: {
        // Using a sizer element is necessary to prevent a vertical collapse between data loads
        // Ex. load all, then load metal, the metal will collapse into a vertical layout if this masonry: {}
        // section is commented out.
        columnWidth: '.element-item-sizer'
      },
      //sortBy: 'name', // If you want to set the default sort, do that here.
      getSortData: {
        name: '.name',
        symbol: '.symbol',
        number: '.number parseInt',
        category: '[data-category]',
        weight: function( itemElem ) {
          let weight = $( itemElem ).find('.weight').text();
          return parseFloat( weight.replace( /[\(\)]/g, '') );
        }
      }
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  }
  // Filter and sort are coming from the Parent.
  componentWillReceiveProps(nextProps) {
    if (nextProps.filter && !_.isEqual(nextProps.filter, this.props.filter)) {
      this.iso.arrange({ filter: this.filterFns[nextProps.filter] || nextProps.filter });
    }
    if (nextProps.sort != null) {
      this.iso.arrange({sortBy: nextProps.sort});
    }
  }
  componentDidMount() {
    this.createIsotopeContainer();

    // Only arrange if there are elements to arrange
    if (_.get(this, 'props.children.length', 0) > 0) {
      this.iso.arrange();
    }
  }
  componentDidUpdate(prevProps) {
    // The list of keys seen in the previous render
    let currentKeys = _.map(prevProps.children, (n) => n.key);

    // The latest list of keys that have been rendered
    let newKeys = _.map(this.props.children, (n) => n.key);

    // Find which keys are new between the current set of keys and any new children passed to this component
    let addKeys = _.difference(newKeys, currentKeys);

    // Find which keys have been removed between the current set of keys and any new children passed to this component
    let removeKeys = _.difference(currentKeys, newKeys);

    if (removeKeys.length > 0) {
      _.each(removeKeys, removeKey => this.iso.remove(document.getElementById(removeKey)));
      this.iso.arrange();
    }
    if (addKeys.length > 0) {
      this.iso.addItems(_.map(addKeys, (addKey) => document.getElementById(addKey)));
      this.iso.arrange();
    }
  }
  componentWillUnmount() {
    if (this.iso != null) {
      this.iso.destroy();
    }
  }
  createIsotopeContainer() {
    if (this.iso == null) {
      this.iso = new Isotope(ReactDom.findDOMNode(this.refs.isotopeContainer), this.isoOptions);
    }
  }
  render() {
    return <div id={'isotope_container'} className="isotope" ref="isotopeContainer">
      <div className="element-item-sizer"></div>
      {this.props.children}
    </div>
  }
}

export default connectToStores(IsotopeResponseRenderer)