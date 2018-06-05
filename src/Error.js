import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { SnackbarContent } from 'material-ui/Snackbar'

import './Error.css'


class Error extends Component {
  render(){
    return (
      <SnackbarContent className='app-error' message={this.props.message} />
    )
  }
}

Error.propTypes = {
  message: PropTypes.string.isRequired
}

export default Error
