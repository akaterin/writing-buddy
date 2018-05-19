import React, { Component } from 'react'
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button'
import { dialog } from '../electronRemote'
import PropTypes from 'prop-types'
import { DialogActions } from 'material-ui/Dialog'
import './CreateStoryForm.css'

class CreateStoryForm extends Component {
  constructor () {
    super()
    this.state = {
      title: '',
      filename: '',
      titleValid: true,
      filenameValid: true
    }
  }

  handleCreateStory() {
    if( !this.form.checkValidity() ) {
      const inputs = Array.from(this.form.getElementsByTagName('input'))
      inputs.forEach((el) => {
        this.validateElement(el)
      })
      return
    }

    const { title, filename } = this.state;
    this.props.onCreate({title, filename})
  }

  handleTitleChange(event){
    this.setState({ title: event.target.value })
  }

  validate(event){
    this.validateElement(event.target)
  }

  validateElement(el){
    const key = `${el.id}Valid`
    const isValid = el.validity.valid
    this.setState({
      [key]: isValid,
    })
  }

  openDialog() {
    //TODO add tests for default filename
    let filename = dialog.showSaveDialog({
      defaultPath: `${this.state.title}.json`
    })
    if( filename === undefined ) return
    this.setState({ filename: filename })
  }

  render () {
    return (
      <form className='create-story-form' ref={(form) => { this.form = form; }}>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          type="text"
          value={this.state.title}
          onChange={this.handleTitleChange.bind(this)}
          error={!this.state.titleValid}
          onBlur={this.validate.bind(this)}
          required
          fullWidth
        />
        <TextField
          margin="dense"
          id="filename"
          label="File"
          type="text"
          onKeyUp={this.openDialog.bind(this)}
          onClick={this.openDialog.bind(this)}
          value={this.state.filename}
          onBlur={this.validate.bind(this)}
          error={!this.state.filenameValid}
          required
          fullWidth
        />
        <div className="create-story-buttons">
          <Button className="create-story-cancel-button"
            onClick={this.props.onCancel}
            color="primary">
            Cancel
          </Button>
          <Button className="create-story-create-button"
            onClick={this.handleCreateStory.bind(this)}
            color="primary">
            Create
          </Button>
        </div>
      </form>
    );
  }
}

CreateStoryForm.propTypes = {
  onCreate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}

export default CreateStoryForm
