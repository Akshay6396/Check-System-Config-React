import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";
import "dropzone/dist/min/dropzone.min.css";
import "react-datepicker/dist/react-datepicker.css";
import { deleteStudentScore } from "../../redux/actions";

import { connect } from "react-redux";

class DeleteScoreModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  deleteSchool = () => {
    const allScores = {
      student_id: this.state.user_id,
    }
    this.props.deleteStudentScore(allScores, this.props)  
  }

  render() {
    const { modalOpen, toggleModal, score } = this.props;
    return score ? (
      <Modal
        size="md"
        isOpen={modalOpen}
        toggle={toggleModal}
        backdrop={this.state.backdrop}
      >
        <ModalHeader toggle={toggleModal}>Confirm Delete {score.score_name + " Score"}</ModalHeader>
        <ModalBody>
          <p>Are you sure you want to delete {score.score_name + " Score"}?</p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            className={`btn-shadow btn-multiple-state ${
              this.props.studentApp.loading ? "show-spinner" : ""
            }`}
            onClick={this.deleteSchool}
          >
            <span className="spinner d-inline-block">
              <span className="bounce1" />
              <span className="bounce2" />
              <span className="bounce3" />
            </span>
            <span className="label">Delete</span>
          </Button>{" "}
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    ) : null;
  }
}
const mapStateToProps = ({ studentApp }) => {
  return {
    studentApp
  };
};

export default connect(
  mapStateToProps, 
  {
    deleteStudentScore
  }
)(DeleteScoreModal);
