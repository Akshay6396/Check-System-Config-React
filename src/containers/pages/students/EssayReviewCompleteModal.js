import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  ModalFooter
} from "reactstrap";
import moment from "moment";
import { statusAlign } from "../../../redux/actions";

import { Colxx } from "../../../components/common/CustomBootstrap";
import * as  loggedInUser  from "../../../helpers/auth-service";

import { connect } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
class EssayReviewModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id: this.props.props.location.search.replace("?p=", ""),
      date: moment(new Date()),
      embeddedDate: moment()
    };

    this.handleChangeDate = this.handleChangeDate.bind(this);
  }
  handleChangeDate(event) {
    this.setState({
      date: event
    });
  }

  componentDidMount() { }

  componentDidUpdate() { }
  resetform() {
    this.setState({
      date: moment(new Date()),
      embeddedDate: moment()
    });
  }

  onCompleteEssayReview = () => {
    const newItem = {
      case_id: this.props.StudentCaseId,
      user_id: this.state.user_id,
      stage_id: 38,
      status: "Complete",
      logged_in_user: loggedInUser.getProfile().user.user_id,
      date: this.state.date
    };
    this.props.statusAlign(newItem, this.props);
  };
  render() {
    const { date } = this.state;

    const { modalOpen, toggleModal } = this.props;
    return (
      <Modal
        size="lg"
        isOpen={modalOpen}
        toggle={toggleModal}
        backdrop="static"
      >
        <ModalHeader toggle={toggleModal}>Essay Review</ModalHeader>
        <ModalBody>
          <FormGroup row>
            <Label for="date" sm={2}>
              Complete Date
            </Label>
            <Colxx sm={10}>
              <DatePicker
                selected={date}
                onChange={this.handleChangeDate}
                placeholderText={"MM/DD/YYYY"}
              />
            </Colxx>
          </FormGroup>
          {/* <Colxx sm={12} row>
            
           
          </Colxx> */}
        </ModalBody>
        <ModalFooter>
          <Button color="primary"
            className={`btn-shadow btn-multiple-state ${this.props.studentApp.loading ? "show-spinner" : ""}`}
            onClick={this.onCompleteEssayReview}>
            <span className="spinner d-inline-block">
              <span className="bounce1" />
              <span className="bounce2" />
              <span className="bounce3" />
            </span>
            <span className="label">Complete</span>
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
    statusAlign
    // addStudent
  }
)(EssayReviewModal);
