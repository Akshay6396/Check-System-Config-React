import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  // ModalFooter,
  // Input,
  Label,
  Row,
  FormGroup,
} from "reactstrap";
import * as  loggedInUser from "../../../helpers/auth-service";
import { Colxx } from "../../../components/common/CustomBootstrap";
import { connect } from "react-redux";
import { addMentor, scheduleCall } from "../../../redux/actions";
import { NotificationManager } from "../../../components/common/react-notifications";
import {
  AvForm,
  AvGroup,
  AvField,
  AvInput,
} from "availity-reactstrap-validation";

// import AvFeedback from "availity-reactstrap-validation/lib/AvFeedback";
class ScheduleCallModal extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      Status: ["Scheduled", "Ongoing", "Completed", "Cancelled", "Rescheduled", "Requested"]
      // school_name: '',
      // school_country: '',
      // country_id: ""
    };
  }


  componentDidMount() {

  }

  componentDidUpdate = prevProps => {
    if (
      this.props.modalOpen === true &&
      this.props.modalOpen !== prevProps.modalOpen
    ) {
    }
    
    if (this.props.studentApp.scheduleCallSuccess) {
      NotificationManager.success(
        this.props.studentApp.scheduleCallSuccess,
        "Success",
        3000,
        null,
        null,
        ""
      );
      this.setState({
      });
      this.props.studentApp.scheduleCallSuccess = "";
    }
  }

  handleSubmit(event, errors, values) {
    if (errors.length === 0) {
      let data = {
        user_id: this.props.studentApp.studentDetails.user_id,
        logged_in_user: loggedInUser.getProfile().user.user_id,
        mentor_id: this.props.mentorId,
        case_id: this.props.StudentCaseId,
        date: values.date,
        time: values.time,
        duration: values.duration,
        topic: values.topic,
        description: values.description,
        status: "Scheduled"
      }
      this.props.scheduleCall(data, this.props);
    }
  }


  render() {
    const { modalOpen, toggleModal } = this.props;
    const { Status } = this.state;
    return (

      <Modal
        size="xl"
        isOpen={modalOpen}
        toggle={toggleModal}
      >
        <ModalHeader toggle={toggleModal}>Schedule Call Modal</ModalHeader>
        <ModalBody>
          <AvForm
            className=" form-container av-tooltip tooltip-label-right"
            model={this.state}
            onSubmit={this.handleSubmit}
            ref={c => (this.form = c)}
          >
            <Row>
              <Colxx xxs="12" sm="6">
                <AvGroup className=" error-l-50 error-t-negative">
                  <Label>
                    {" "}
                    Date
                    <span className="text-danger">&#42;</span>
                  </Label>
                  <AvField name="date" type="date" validate={{
                    required: {
                      value: true,
                      errorMessage: "Please enter date"
                    },
                    dateRange: { start: { value: -5, units: 'years', }, end: { value: 5, units: 'years', } }
                  }} />
                </AvGroup>
              </Colxx>

              <Colxx xxs="12" sm="6">
                <AvGroup className="error-l-50 error-t-negative">
                  <Label>
                    Time
                    <span className="text-danger">&#42;</span>
                  </Label>
                  <AvField
                    name="time"
                    type="time"
                    validate={{
                      required: {
                        value: true,
                        errorMessage: "Please enter Time"
                      },
                    }}
                  />
                </AvGroup>
              </Colxx>
              <Colxx xxs="12" sm="6">
                <AvGroup className="error-l-75 error-t-negative">
                  <Label>Duration</Label>
                  <span className="text-danger">&#42;</span>
                  <AvField name="duration" type="number" validate={{
                    required: {
                      value: true,
                      errorMessage: "Please enter Duration"
                    },
                  }} />
                </AvGroup>
              </Colxx>

              <Colxx xxs="12" sm="6">
                <AvGroup className="error-l-100 error-t-negative">
                  <Label>Session Topic</Label>
                  <span className="text-danger">&#42;</span>
                  <AvField name="topic" type="text" validate={{
                    required: {
                      value: true,
                      errorMessage: "Please enter Session Topic"
                    },
                  }} />
                </AvGroup>
              </Colxx>
              <Colxx xxs="12" sm="6">
                <AvGroup className="error-l-100 error-t-negative">
                  <Label>Description</Label>
                  <span className="text-danger">&#42;</span>
                  <AvField name="description" type="text" validate={{
                    required: {
                      value: true,
                      errorMessage: "Please enter Description"
                    },
                  }} />
                </AvGroup>
              </Colxx>
              {/* <Colxx xxs="12" sm="6">
                <AvGroup className="error-l-50 error-t-negative">
                  <Label>Status </Label>
                  <span className="text-danger">&#42;</span>
                  <AvField
                    type="select"
                    name="status"
                    required
                    errorMessage="Please select Status!"
                  >
                    <option value="" disabled>
                      Please Select Status
                        </option>
                    {Status.map((status, idx) => {
                      return (
                        <option key={idx} value={status}>
                          {status}
                        </option>
                      );
                    })}
                  </AvField>

                </AvGroup>
              </Colxx> */}
            </Row>
            <FormGroup className="text-center">
              <Button
                color="primary"
                className={`btn-shadow btn-multiple-state ${
                  this.props.studentApp.loading ? "show-spinner" : ""
                  }`}
              >
                <span className="spinner d-inline-block">
                  <span className="bounce1" />
                  <span className="bounce2" />
                  <span className="bounce3" />
                </span>
                <span className="label">Submit</span>
              </Button>
            </FormGroup>
          </AvForm>
        </ModalBody>
      </Modal>

    );
  }
}
const mapStateToProps = ({ studentApp }) => {
  return {
    studentApp
  };
};
export default connect(mapStateToProps,
  {
    addMentor,
    scheduleCall
  }
)(ScheduleCallModal);

