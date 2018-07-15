import alt from '../../alt'
import FilterSortActions from '../actions/FilterSortActions'

class FilterSortStore {
  constructor () {
    this.object = null
    this.state = {
      filter: '*',
      sort: ''
    }

    this.bindListeners({
      onFilter: FilterSortActions.filter,
      onSort: FilterSortActions.sort,
    });

  }

  onFilter (filter) {
    // console.log('filter', filter)
    this.setState({
      filter: filter
    })
  }

  onSort (sort) {
    this.setState({
      sort: sort
    })
  }
}

export default alt.createStore(FilterSortStore, 'FilterSortStore')
