import React, { Component } from 'react'
import { connect } from "react-redux"
import Error from './Error'

const mapStateToProps = (state) => {
  return { errors: state.errors }
}

export class ErrorBar extends Component {

  render() {
    if( this.props.errors.length > 0 ){
      return (
        <div className='error-container'>
          {this.props.errors.map( (error, index) => {
            return <Error message={error} key={index} />
          })}
        </div>
      )
    }
    return ''
  }

}

const ConnectedErrorBar = connect(mapStateToProps, null)(ErrorBar);

export default ConnectedErrorBar
