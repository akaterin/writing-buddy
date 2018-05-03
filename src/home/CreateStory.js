import React, { Component } from 'react'
import { connect } from "react-redux"
import { createStory } from '../infrastructure/actions'
import Button from 'material-ui/Button'
import AddIcon from '@material-ui/icons/Add'
import Dialog, {
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog';
import CreateStoryForm from './CreateStoryForm'

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

  handleCreateStory(story) {
    this.props.createStory(story)
    this.handleCloseModal()
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
            <CreateStoryForm
              onCreate={ this.handleCreateStory.bind(this) }
              onCancel = { this.handleCloseModal.bind(this) } />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

const ConnectedCreateStory = connect(null, mapDispatchToProps)(CreateStory);

export default ConnectedCreateStory
