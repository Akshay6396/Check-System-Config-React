import React, { Component, Fragment } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Row
} from "reactstrap";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

import { Colxx } from "../../../components/common/CustomBootstrap";
import * as  loggedInUser  from "../../../helpers/auth-service";

import { connect } from "react-redux";
import { addEssay } from "../../../redux/actions";

// For drop image end
class EssayAddModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      word_limit: "",
      user_id: this.props.props.location.search.replace("?p=", ""),
      embeddedDate: moment(),
    };

    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const target = event.target;
    const { value, name } = target;
    this.setState({
      [name]: value
    });
  }

  componentDidMount() { }

  // End Validation
  componentDidUpdate() { }

  resetform() {
    this.setState({
      comment: "",
      embeddedDate: moment()
    });
  }

  onAddEssay = () => {
    const newItem = {
      title: this.state.title,
      word_limit: this.state.word_limit,
      school_case_id: this.props.schoolIdForEssay,
      user_id: this.state.user_id,
      logged_in_user: loggedInUser.getProfile().user.user_id,
      case_id: this.props.StudentCaseId,
    };
    this.props.addEssay(newItem, this.props);
  };
  render() {
    const {
      title,
      word_limit
    } = this.state;

    const { modalOpen, toggleModal } = this.props;
    return (
      <Modal
        size="lg"
        isOpen={modalOpen}
        toggle={toggleModal}
        backdrop="static"
      >
        <ModalHeader toggle={toggleModal}>Add Essay</ModalHeader>
        <ModalBody>
          <Fragment>
            <Colxx xxs="12 ">
              <Row>
                <Colxx xxs="6">

                  <Label className="mt-4">Title</Label>
                  <Input
                    type="text"
                    value={title}
                    name="title"
                    onChange={this.handleChange}

                  />
                </Colxx>
                <Colxx xxs="6">

                  <Label className="mt-4">Word Limit</Label>
                  <Input
                    type="text"
                    value={word_limit}
                    name="word_limit"
                    onChange={this.handleChange}

                  />
                </Colxx>
              </Row>
            </Colxx>
          </Fragment>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" className={`btn-shadow  btn-multiple-state ${
            this.props.studentApp.loading ? "show-spinner" : ""
            }`}
            onClick={this.onAddEssay}
            disabled={this.props.studentApp.loading}>
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

export default connect(
  mapStateToProps,
  {
    addEssay
  }
)(EssayAddModal);
