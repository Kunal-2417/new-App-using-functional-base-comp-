import React, { Component } from 'react'
import loading from './loading.gif'
import PropTypes from 'prop-types'

export default class Spinner extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    return (
      <div className="text-center">

        <img className="my-3" src={loading} alt="Loading" />
      </div>
    )
  }
}
