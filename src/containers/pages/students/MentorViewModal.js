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
  CardSubtitle,
  CardBody,
  Card,
  CardText,
  // Label, Row
} from "reactstrap";
import moment from "moment";
import Select from "react-select";
import CustomSelectInput from "../../../components/common/CustomSelectInput";
import { alignMentor } from "../../../redux/actions";
import * as  loggedInUser from "../../../helpers/auth-service";
import { Colxx } from "../../../components/common/CustomBootstrap";
import { connect } from "react-redux";
import { NotificationManager } from "../../../components/common/react-notifications";
import ThumbnailImage from "../../../components/cards/ThumbnailImage";
import ScheduleCallModal from "./ScheduleCallModal";
import MentorAlignModal from "./MentorAlignModal";
import { SessionsTable } from "./SessionsTable";

class MentorViewModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addMentorModal: false,
      scheduleCallModal: false,
      user_id: this.props.studentApp.studentDetails.user_id,
      mentor: "",
      reason_of_change: "",
      embeddedDate: moment()
    };
    this.handleChange = this.handleChange.bind(this);

    this.MentorChange = this.MentorChange.bind(this);
  }
  MentorChange(event) {
    this.setState({
      mentor: event
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
    if (this.props.studentApp.alignMentorSuccess) {
      NotificationManager.success(
        this.props.studentApp.alignMentorSuccess,
        "Success",
        3000,
        null,
        null,
        ""
      );
      this.resetform();
    }
    this.props.studentApp.error = "";
    this.props.studentApp.alignMentorSuccess = "";
  }

  resetform() {
    this.setState({
      mentor: "",
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
      case_id: this.props.StudentCaseId,
      case_school_id: this.props.studentCaseSchoolId,
      reason_of_change: this.state.reason_of_change,
      mentor: this.state.mentor.user_id,
      user_id: this.state.user_id,
      logged_in_user: loggedInUser.getProfile().user.user_id
    };
    this.props.alignMentor(newItem, this.props);
  };
  toggleAddMentorModal = () => {
    this.setState({ addMentorModal: !this.state.addMentorModal });
  };
  onScheduleCall = () => {
    this.setState({ scheduleCallModal: !this.state.scheduleCallModal });
  };
  render() {
    const { mentor, reason_of_change, addMentorModal, scheduleCallModal } = this.state;

    const { modalOpen, toggleModal, statusSchoolMentor } = this.props;
    const { mentorsDetails } = this.props.studentApp;
    return (
      <Modal
        size="xl"
        isOpen={modalOpen}
        toggle={toggleModal}
        backdrop="static"
      >
        <ModalHeader toggle={toggleModal}>Mentor Details</ModalHeader>
        <ModalBody className="row">
          <Colxx md="12" sm="12" lg="12" xxs="12">
            <Card className="d-flex flex-row mb-4">
              <a
                href="null"
                onClick={e => e.preventDefault()}
                className="d-flex"
              >
                <ThumbnailImage
                  rounded
                  src={
                    mentorsDetails.photo
                      ? mentorsDetails.photo
                      : "https://postsales.s3.ap-south-1.amazonaws.com/default_image.png"
                  }
                  alt="Card image cap"
                  className="m-4"
                />
              </a>
              <div className=" d-flex flex-grow-1 min-width-zero">
                <CardBody className=" pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero">
                  <div className="min-width-zero">
                    <a
                      href="null"
                      onClick={e => e.preventDefault()}
                    >
                      <CardSubtitle className="truncate mb-1">
                        {mentorsDetails
                          .user_lname
                          ? mentorsDetails
                            .user_fname +
                          " " +
                          mentorsDetails
                            .user_lname
                          : mentorsDetails
                            .user_fname}
                      </CardSubtitle>
                    </a>
                    <CardText className="text-muted text-small mb-2">
                      {
                        mentorsDetails.user_role === "Experts" && "Mentor"
                      }
                    </CardText>
                  </div>
                </CardBody>
              </div>
            </Card>
          </Colxx>
          <Colxx md="12" sm="12" lg="12" xxs="12">

            <SessionsTable
              Sessions={this.props.studentApp.mentorsDetails.sessions}
            />
          </Colxx>
        </ModalBody>
        <ModalFooter>
          <Button
            // size="sm"
            color="primary"
            className={`btn-shadow  btn-multiple-state ${
              this.props.studentApp.loading ? "show-spinner" : ""
              }`}
            onClick={this.toggleAddMentorModal}
          >
            <span className="spinner d-inline-block">
              <span className="bounce1" />
              <span className="bounce2" />
              <span className="bounce3" />
            </span>
            <span className="label">Change Mentor</span>
          </Button>
          {statusSchoolMentor
            ?
            (<Button
              // disabled={(mentor === "" || reason_of_change === "")}
              className={`btn-shadow btn-multiple-state ${this.props.studentApp.loading ? "show-spinner" : ""}`}
              color="primary" onClick={this.onScheduleCall}>
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">Schedule a Session</span></Button>) :
            (<Button
              disabled={mentor === ""}
              className={`btn-shadow btn-multiple-state ${this.props.studentApp.loading ? "show-spinner" : ""}`}
              color="primary" onClick={this.onSubmit}>
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">Submit</span>
            </Button>
            )
          }
        </ModalFooter>
        <ScheduleCallModal
          studentCaseSchoolId={this.props.studentCaseSchoolId}
          statusSchoolMentor={statusSchoolMentor}
          mentorId={mentorsDetails.user_id}
          StudentCaseId={this.props.StudentCaseId}
          modalOpen={scheduleCallModal}
          toggleModal={this.onScheduleCall}
        />
        <MentorAlignModal
          studentCaseSchoolId={this.props.studentCaseSchoolId}
          StudentCaseId={this.props.StudentCaseId}
          modalOpen={addMentorModal}
          statusSchoolMentor={statusSchoolMentor}
          toggleModal={this.toggleAddMentorModal}
        />
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
    alignMentor
  }
)(MentorViewModal);
