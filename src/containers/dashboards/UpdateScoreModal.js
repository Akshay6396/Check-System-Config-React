import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  // Card,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";
import "dropzone/dist/min/dropzone.min.css";
import "react-datepicker/dist/react-datepicker.css";
import { updateStudentScore } from "../../redux/actions";

import { connect } from "react-redux";

class UpdateScoreModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scoreValue: "",
      scoreName: ""
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.score !== prevProps.score) {
      const { score } = this.props;
      this.setState({
        scoreName: score.score_name,
        scoreValue: score.score_value
      });
    }
  }

  handleSubmit = () => {
    const allScores = {
      student_id: this.state.user_id,
      score_value: this.state.scoreValue,
      score_name: this.state.scoreName
    };
    this.props.updateStudentScore(allScores, this.props);
  };

  render() {
    const { scoreName, scoreValue } = this.state;
    const { modalOpen, toggleModal } = this.props;

    return (
      <Modal
        size="md"
        isOpen={modalOpen}
        toggle={toggleModal}
        backdrop={this.state.backdrop}
      >
        <ModalHeader toggle={toggleModal}>Update Scores</ModalHeader>
        <ModalBody>
          {/* <Card> */}
          <FormGroup className="error-l-100">
            <Label>{scoreName + " Score"}</Label>
            <Input
              type="number"
              pattern="[0-9]*"
              inputMode="numeric"
              className="number_type"
              name="scoreValue"
              value={scoreValue}
              onChange={e => this.setState({ scoreValue: e.target.value })}
            />
          </FormGroup>
          {/* </Card> */}
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className={`btn-shadow btn-multiple-state ${
              this.props.studentApp.loading ? "show-spinner" : ""
            }`}
            disabled={!scoreValue}
            onClick={this.handleSubmit}
          >
            <span className="spinner d-inline-block">
              <span className="bounce1" />
              <span className="bounce2" />
              <span className="bounce3" />
            </span>
            <span className="label">Submit</span>
          </Button>{" "}
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
const mapStateToProps = ({ studentApp }) => {
  return {
    studentApp
  };
};

export default connect(mapStateToProps, {
  updateStudentScore
})(UpdateScoreModal);
