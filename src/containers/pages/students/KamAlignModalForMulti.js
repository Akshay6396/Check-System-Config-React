import React, {
  Component
  // Fragment
} from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  // FormGroup,
  Input,
  // Label, Row
} from "reactstrap";
import moment from "moment";
import Select from "react-select";
import CustomSelectInput from "../../../components/common/CustomSelectInput";
import { alignKamMultiCase } from "../../../redux/actions";

import { Colxx } from "../../../components/common/CustomBootstrap";
import * as  loggedInUser from "../../../helpers/auth-service";

import { connect } from "react-redux";
import { NotificationManager } from "../../../components/common/react-notifications";
class KamAlignModalForMulti extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id: this.props.props.location.search.replace("?p=", ""),
      kam: "",
      reason_of_change: "",
      embeddedDate: moment()
    };
    this.HeadCoachChange = this.HeadCoachChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  HeadCoachChange(event) {
    this.setState({
      kam: event
    });
  }

  componentDidMount() { }

  // End Validation
  componentDidUpdate() {
    if (this.props.studentApp.error) {
      NotificationManager.error(
        this.props.studentApp.error,
        "Error",
        3000,
        null,
        null,
        ""
      );
    }
    if (this.props.studentApp.alignKamSuccess) {
      NotificationManager.success(
        this.props.studentApp.alignKamSuccess,
        "Success",
        3000,
        null,
        null,
        ""
      );
      this.resetform();
    }
    this.props.studentApp.error = "";
    this.props.studentApp.alignKamSuccess = "";
  }

  resetform() {
    this.setState({
      kam: "",
      reason_of_change: "",
    });
  }
  handleChange(event) {
    const target = event.target;
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }
  onSubmit = () => {
    const newItem = {
      case_ids: this.props.selectedStudents,
      kam: this.state.kam.user_id,
      logged_in_user: loggedInUser.getProfile().user.user_id
    };
    this.props.alignKamMultiCase(newItem, this.props);
  };
  render() {
    const { kam, reason_of_change } = this.state;
    const { modalOpen, toggleModal, Kam } = this.props;
    const { KAMList } = this.props.studentApp;
    return (
      <Modal
        size="lg"
        isOpen={modalOpen}
        toggle={toggleModal}
        backdrop="static"
      >
        <ModalHeader toggle={toggleModal}>
          {Kam ?
            "Update Kam" :
            "Align Kam"
          }

        </ModalHeader>
        <ModalBody className="row">
          <Colxx sm={12} md={6}>
            <Select
              components={{
                Input: CustomSelectInput
              }}
              className="react-select"
              classNamePrefix="react-select"
              placeholder="Select Kam"
              name="kam"
              // isMulti="true"
              value={kam}
              onChange={this.HeadCoachChange}
              getOptionLabel={option =>
                `${(option.user_lname) ? option.user_fname + " " + option.user_lname : option.user_fname}`
              }
              getOptionValue={option => `${option.user_id}`}
              options={KAMList}
            />
          </Colxx>
          {Kam && <Colxx sm={12} md={6}>
            <Input
              value={reason_of_change}
              placeholder="Reason of change"
              name="reason_of_change"
              onChange={this.handleChange}
              type="text"
            />
          </Colxx>}
        </ModalBody>
        <ModalFooter>

          {Kam
            ?
            <Button
              disabled={(kam === "" || reason_of_change === "")}
              className={`btn-shadow btn-multiple-state ${this.props.studentApp.loading ? "show-spinner" : ""}`}
              color="primary" onClick={this.onSubmit}>
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">Submit</span>          </Button> :
            <Button
              disabled={kam === ""}
              className={`btn-shadow btn-multiple-state ${this.props.studentApp.loading ? "show-spinner" : ""}`}
              color="primary" onClick={this.onSubmit}>
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">Submit</span>          </Button>
          }
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
    alignKamMultiCase
  }
)(KamAlignModalForMulti);
