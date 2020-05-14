import React, { Component } from "react";
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
import { Colxx } from "../../../components/common/CustomBootstrap";
import { updateStudentExperience } from "../../../redux/actions";
import { connect } from "react-redux";

class UpdateExperienceModal extends Component {
  state = {
    user_id: this.props.studentApp.studentDetails.user_id,
    company_name: "",
    designation: "",
    duration: "",
    role_description: "",
    experience_id: ""
  };

  componentDidUpdate(prevProps) {
    if (this.props.experience !== prevProps.experience) {
      const { experience } = this.props;
      this.setState({
        company_name: experience.company_name,
        designation: experience.designation,
        duration: experience.duration,
        role_description: experience.role_description,
        experience_id: experience.student_work_experience_id
      });
    }
  }

  onSubmit = () => {
    let payload = this.state;
    const experience = {
      user_id: payload.user_id,
      company_name: payload.company_name,
      designation: payload.designation,
      duration: payload.duration,
      role_description: payload.role_description,
      experience_id: payload.experience_id
    };
    this.props.updateStudentExperience(experience, this.props);
  };

  render() {
    const { modalOpen, toggleModal } = this.props;
    return (
      <Modal size="lg" isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Edit Experience</ModalHeader>
        <ModalBody>
          <Row className="mb-4">
            <Colxx>
              <Label>Company Name</Label>
              <Input
                value={this.state.company_name || ""}
                onChange={e => this.setState({ company_name: e.target.value })}
              ></Input>
            </Colxx>
            <Colxx>
              <Label>Designation</Label>
              <Input
                value={this.state.designation || ""}
                onChange={e => this.setState({ designation: e.target.value })}
              ></Input>
            </Colxx>
          </Row>
          <Row>
            <Colxx>
              <Label>Duration</Label>
              <Input
                value={this.state.duration || ""}
                onChange={e => this.setState({ duration: e.target.value })}
              ></Input>
            </Colxx>
            <Colxx>
              <Label>Role Description</Label>
              <Input
                type="textarea"
                className="roleDescriptionTextArea"
                value={this.state.role_description || ""}
                onChange={e =>
                  this.setState({ role_description: e.target.value })
                }
              ></Input>
            </Colxx>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className={`btn-shadow btn-multiple-state ${
              this.props.studentApp.loading ? "show-spinner" : ""
            }`}
            disabled={
              this.state.company_name === "" ||
              this.state.designation === "" ||
              this.state.duration === "" ||
              this.state.role_description === ""
            }
            onClick={() => this.onSubmit()}
          >
            <span className="spinner d-inline-block">
              <span className="bounce1" />
              <span className="bounce2" />
              <span className="bounce3" />
            </span>
            <span className="label">Update</span>
          </Button>
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
  updateStudentExperience
})(UpdateExperienceModal);
