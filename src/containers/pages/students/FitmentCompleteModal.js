import React, { Component, Fragment } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Row,
  Card,
  CardBody,
  CardTitle
} from "reactstrap";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import CustomSelectInput from "../../../components/common/CustomSelectInput";
import "dropzone/dist/min/dropzone.min.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { Colxx } from "../../../components/common/CustomBootstrap";
import {
  addFitmentSchools,
  getStageHistoryData,
  getCountryName
} from "../../../redux/actions";
import * as loggedInUser from "../../../helpers/auth-service";

import { connect } from "react-redux";
import FitmentComments from "./FitmentComments";
import AddSchool from "./AddSchool";

// For drop image end
class FitmentComplete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id: this.props.props.location.search.replace("?p=", ""),
      addSchoolModal: false,
      school_array: [
        {
          school_id: "",
          intake: "",
          round: "",
          program: "",
          additional_notes: "",
          deadline: moment(new Date())
        }
      ],

      embeddedDate: moment()
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }
  handleChange(event) {
    const target = event.target;
    const { value, name } = target;
    this.setState({
      [name]: value
    });
  }
  handleBlur(event) {
    const field = event.target.name;
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    });
    this.validate(event);
  }

  componentDidMount() {
    // this.props.getCountryName();
  }
  //Handling Dynamic score

  handleAddSchoolArray = () => {
    this.setState({
      school_array: this.state.school_array.concat([
        {
          score_id: "",
          intake: "",
          round: "",
          program: "",
          deadline: moment(new Date())
        }
      ])
    });
  };
  handleRemoveSchoolArray = idx => () => {
    this.setState({
      school_array: this.state.school_array.filter((s, sidx) => idx !== sidx)
    });
  };
  SchoolArrayValueChange = idx => evt => {
    const school_array = this.state.school_array.map((SchoolArray, sidx) => {
      if (idx !== sidx) return SchoolArray;
      return { ...SchoolArray, [evt.target.name]: evt.target.value };
    });
    this.setState({ school_array: school_array });
  };
  SchoolArrayNameChange = idx => evt => {
    const school_array = this.state.school_array.map((SchoolArray, sidx) => {
      if (idx !== sidx) return SchoolArray;
      return { ...SchoolArray, school_name: evt };
    });

    this.setState({ school_array: school_array });
  };
  SchoolArrayDeadlineChange = idx => evt => {
    const school_array = this.state.school_array.map((SchoolArray, sidx) => {
      if (idx !== sidx) return SchoolArray;
      return { ...SchoolArray, deadline: evt };
    });

    this.setState({ school_array: school_array });
  };

  // End Validation
  componentDidUpdate = prevProps => {
    if (
      this.props.modalOpen === true &&
      this.props.modalOpen !== prevProps.modalOpen
    ) {
      this.getHistory();
    }
    if (this.props.studentApp.submitaddfitmentSuccess) {
      this.setState({
        school_array: [
          {
            school_name: 0,
            intake: "",
            round: "",
            program: "",
            additional_notes: "",
            deadline: moment(new Date())
          }
        ]
      });
      this.props.studentApp.submitaddfitmentSuccess = "";
    }
  };
  getHistory = () => {
    let payload = {
      case_id: this.props.StudentCaseId,
      stage_name: "School Shortlisting Document"
    };
    this.props.getStageHistoryData(payload);
  };

  validateName(value) {
    let error;
    if (!value) {
      error = "Please enter your name";
    } else if (value.length < 2) {
      error = "Value must be longer than 2 characters";
    }
    return error;
  }

  validate(event) {
    const target = event.target;
    const { value, name } = target;

    if (value.length === 0) {
      const errors = {
        required: { ...this.state.errors.required, [name]: true }
      };

      this.setState({
        errors: { ...this.state.errors, ...errors }
      });
      return;
    }

    if (name === "email") {
      this.validateEmail(value);
    }
  }

  hasError(field) {
    return (
      (this.state.errors.required[field] || !this.state.errors.valid[field]) &&
      this.state.touched[field]
    );
  }
  displayError(field, value) {
    const { required, valid } = this.state.errors;
    const errorMessage = `${value} is `;

    if (required[field]) {
      return `${errorMessage} required`;
    }

    if (!valid[field]) {
      return `${errorMessage} not valid`;
    }
  }
  resetform() {
    this.setState({
      embeddedDate: moment()
    });
  }

  onSubmit = () => {
    var scoreFinalArr = [
      {
        school_id: "",
        intake: "",
        round: "",
        program: "",
        additional_notes: "",
        deadline: ""
      }
    ];
    if (this.state.school_array.length > 0) {
      scoreFinalArr = [];

      this.state.school_array.forEach(element => {
        if (
          element.school_name !== "" &&
          element.intake !== "" &&
          element.round !== "" &&
          element.program !== "" &&
          element.deadline !== ""
        ) {
          let payload = {
            school_id: element.school_name.school_id,
            intake: element.intake,
            round: element.round,
            program: element.program,
            additional_notes: element.additional_notes,
            deadline: element.deadline
          };
          scoreFinalArr.push(payload);
        }
      });
    }

    const newItem = {
      user_id: this.state.user_id,
      case_id: this.props.StudentCaseId,
      school_array: scoreFinalArr,
      loggedInUser: loggedInUser.getProfile().user.user_id
    };
    this.props.addFitmentSchools(newItem, this.props);
  };
  toggleAddSchoolModal = () => {
    this.setState({ addSchoolModal: !this.state.addSchoolModal });
  };
  render() {
    const {
      school_array,
      addSchoolModal
      // productsList,
    } = this.state;

    // const { labels, categories } = this.props.addStudent;
    const { modalOpen, toggleModal } = this.props;
    const { schoolsMaster } = this.props.studentApp;
    return (
      <Modal
        size="xl"
        isOpen={modalOpen}
        toggle={toggleModal}
        backdrop={this.state.backdrop}
      >
        <ModalHeader toggle={toggleModal}>Add Schools</ModalHeader>
        <ModalBody>
          <FitmentComments />

          <Card>
            <CardBody>
              <div className="d-flex flex-row pb-1">
                <CardTitle>Schools</CardTitle>
                <div className="position-absolute table-right-buttons">
                  <Button
                    outline
                    color={"primary"}
                    className="close"
                    onClick={this.handleAddSchoolArray}
                  >
                    <i
                      className="simple-icon-plus"
                      style={{ fontSize: "1.5rem" }}
                    />
                  </Button>
                </div>
              </div>
              {school_array.map((SchoolArray, idx) => (
                <Fragment key={idx}>
                  <Row>
                    <Colxx xxs="12 ">
                      <div className="d-flex flex-row pb-1">
                        {idx > 0 && (
                          <div className="position-absolute table-button-top  ">
                            <Button
                              outline
                              color={"danger"}
                              className="close"
                              onClick={this.handleRemoveSchoolArray(idx)}
                            >
                              <i className="simple-icon-trash" />
                            </Button>
                          </div>
                        )}
                        <Colxx sm={2}>
                          <Select
                            components={{
                              Input: CustomSelectInput
                            }}
                            className="react-select"
                            classNamePrefix="react-select"
                            placeholder="Select Schools"
                            name="school_name"
                            // isMulti="true"
                            value={SchoolArray.school_name}
                            onChange={this.SchoolArrayNameChange(idx)}
                            getOptionLabel={option => `${option.school_name}`}
                            getOptionValue={option => `${option.school_id}`}
                            options={schoolsMaster}
                          />
                        </Colxx>

                        <Colxx sm={2}>
                          <Input
                            type="text"
                            placeholder="Intake"
                            name="intake"
                            value={SchoolArray.intake}
                            onChange={this.SchoolArrayValueChange(idx)}
                          />
                        </Colxx>
                        <Colxx sm={2}>
                          <Input
                            type="text"
                            placeholder="Round"
                            name="round"
                            value={SchoolArray.round}
                            onChange={this.SchoolArrayValueChange(idx)}
                          />
                        </Colxx>
                        <Colxx sm={2}>
                          <Input
                            type="text"
                            placeholder="Program"
                            name="program"
                            value={SchoolArray.program}
                            onChange={this.SchoolArrayValueChange(idx)}
                          />
                        </Colxx>
                        <Colxx sm={2}>
                          <DatePicker
                            selected={SchoolArray.deadline}
                            onChange={this.SchoolArrayDeadlineChange(idx)}
                            placeholderText={"MM/DD/YYYY"}
                          />
                        </Colxx>
                        <Colxx sm={2}>
                          <Input
                            type="textarea"
                            placeholder="Additional Notes"
                            className="schoolFitementTextArea"
                            name="additional_notes"
                            value={SchoolArray.additional_notes}
                            onChange={this.SchoolArrayValueChange(idx)}
                          />
                        </Colxx>
                      </div>
                    </Colxx>
                  </Row>
                </Fragment>
              ))}
            </CardBody>
          </Card>
        </ModalBody>
        <ModalFooter>
          <Button
            // size="sm"
            color="primary"
            className={`btn-shadow  btn-multiple-state ${
              this.props.studentApp.loading ? "show-spinner" : ""
              }`}
            onClick={this.toggleAddSchoolModal}
          >
            <span className="spinner d-inline-block">
              <span className="bounce1" />
              <span className="bounce2" />
              <span className="bounce3" />
            </span>
            <span className="label">Add New School</span>
          </Button>
          <Button
            color="primary"
            className={`btn-shadow btn-multiple-state ${
              this.props.studentApp.loading ? "show-spinner" : ""
              }`}
            onClick={this.onSubmit}
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
        <AddSchool
          modalOpen={addSchoolModal}
          toggleModal={this.toggleAddSchoolModal}
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

export default connect(mapStateToProps, {
  addFitmentSchools,
  getStageHistoryData,
  getCountryName
})(FitmentComplete);
