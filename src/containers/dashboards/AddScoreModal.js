import React, { Component, Fragment } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Input
} from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";
import "dropzone/dist/min/dropzone.min.css";
import "react-datepicker/dist/react-datepicker.css";
import { Colxx } from "../../components/common/CustomBootstrap";
import Select from "react-select";
import { addStudentScore } from "../../redux/actions";
import * as loggedInUser from "../../helpers/auth-service";

import { connect } from "react-redux";

class AddScoreModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: [],
      score_array: []
    };
  }

  handleSubmit = () => {
    const { user_id } = this.props.studentApp.studentDetails;

    var scoreFinalArr = [{ score_id: "", score_value: "" }];
    if (this.state.score_array.length > 0) {
      scoreFinalArr = [];
      this.state.score_array.forEach(element => {
        let payload = {
          score_id: element.score_id.ps_score_id,
          score_value: element.score_value
        };
        scoreFinalArr.push(payload);
      });
    }
    const allScores = {
      case_id: this.props.StudentCaseId,
      user_id: user_id,
      score_array: scoreFinalArr,
      loggedInUser: loggedInUser.getProfile().user.user_id
    };
    this.props.addStudentScore(allScores, this.props);
  };

  handleScoreArray = scores => {
    this.setState({ scores });
    var newArr = [];
    scores.forEach(element => {
      if (!element.score_childs || element.score_childs === null) {
        let payLoad = { score_id: element, score_value: "" };
        newArr.push(payLoad);
      } else {
        element.score_childs.forEach(elementChild => {
          let payLoad = { score_id: elementChild, score_value: "" };
          newArr.push(payLoad);
        });
      }
    });
    this.setState({
      score_array: newArr
    });
  };

  handleScoreArrayValueChange = idx => evt => {
    const newscore_array = this.state.score_array.map((ScoreArray, sidx) => {
      if (idx !== sidx) return ScoreArray;
      return { ...ScoreArray, [evt.target.name]: evt.target.value };
    });

    this.setState({ score_array: newscore_array });
  };

  render() {
    const { scores, score_array } = this.state;
    const { modalOpen, toggleModal, studentApp } = this.props;
    const { scoresMaster } = studentApp;

    return (
      <Modal
        size="lg"
        isOpen={modalOpen}
        toggle={toggleModal}
        backdrop={this.state.backdrop}
      >
        <ModalHeader toggle={toggleModal}>Add Scores</ModalHeader>
        <ModalBody>
          <Row>
            <Colxx xxs="12 mb-4">
              <label>Scores</label>
              <Select
                // components={{ Input: CustomSelectInput }}
                className="react-select"
                classNamePrefix="react-select"
                name="scores"
                isMulti="true"
                value={scores}
                onChange={this.handleScoreArray}
                getOptionLabel={option => `${option.score_name}`}
                getOptionValue={option => `${option.ps_score_id}`}
                options={scoresMaster}
              />
            </Colxx>
            {/* {score_array.length > 0 && <br />} */}
            <Fragment>
              {score_array.map((ScoreArray, idx) => {
                return (
                  <Colxx key={idx} sm={6}>
                    <Input
                      type="number"
                      pattern="[0-9]*"
                      inputMode="numeric"
                      className="number_type"
                      placeholder={ScoreArray.score_id.score_name}
                      name="score_value"
                      value={ScoreArray.score_value}
                      onChange={this.handleScoreArrayValueChange(idx)}
                    />
                  </Colxx>
                );
              })}
            </Fragment>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className={`btn-shadow btn-multiple-state ${
              this.props.studentApp.loading ? "show-spinner" : ""
            }`}
            disabled={!this.state.scores.length}
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
  addStudentScore
})(AddScoreModal);
