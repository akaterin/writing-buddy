import React, { Component } from 'react'
import { connect } from "react-redux"
import { createStory } from '../infrastructure/actions'
import './CreateStory.css'
import Button from 'material-ui/Button'
import AddIcon from '@material-ui/icons/Add'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { dialog } from '../electronRemote'

const mapDispatchToProps = dispatch => {
  return {
    createStory: story => dispatch(createStory(story))
  };
};

export class CreateStory extends Component {
  constructor () {
    super();
    this.state = {
      showModal: false,
      title: '',
      filename: '',
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }

  handleCreateStory() {
    const { title, filename } = this.state;
    this.props.createStory({title, filename})
    this.setState({
      showModal: false,
      title: '',
      filename: '',
    })
  }

  handleTitleChange(event){
    console.log(`Setting title to: ${event.target.value}`)
    this.setState({ title: event.target.value })
  }

  openDialog() {
    let filename = dialog.showSaveDialog()
    console.log(`Setting filename to: ${filename}`)
    this.setState({ filename: filename })
  }

  render () {
    return (
      <div>
        <Button variant="fab" className="create-story-button" color="primary" aria-label="add" onClick={this.handleOpenModal}>
          <AddIcon />
        </Button>
        <Dialog
          open={this.state.showModal}
          onClose={this.handleCloseModal}
          className="create-story-form"
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create Story</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Title"
              type="text"
              value={this.state.title}
              onChange={this.handleTitleChange.bind(this)}
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
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button className="create-story-cancel-button" onClick={this.handleCloseModal}
              color="primary">
              Cancel
            </Button>
            <Button className="create-story-create-button"
              onClick={this.handleCreateStory.bind(this)}
              color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const ConnectedCreateStory = connect(null, mapDispatchToProps)(CreateStory);

export default ConnectedCreateStory
