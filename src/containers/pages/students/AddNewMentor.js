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
// import Select from "react-select";
// import CustomSelectInput from "../../../components/common/CustomSelectInput";
import { Colxx } from "../../../components/common/CustomBootstrap";
import { connect } from "react-redux";
import { addMentor } from "../../../redux/actions";
import { NotificationManager } from "../../../components/common/react-notifications";
import {
  AvForm,
  AvGroup,
  AvField,
  // AvRadioGroup,
  // AvRadio,
  AvInput
} from "availity-reactstrap-validation";
// import AvFeedback from "availity-reactstrap-validation/lib/AvFeedback";
class AddNewMentor extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
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
    if (this.props.studentApp.schoolAddSuccess) {
      NotificationManager.success(
        this.props.studentApp.schoolAddSuccess,
        "Success",
        3000,
        null,
        null,
        ""
      );
      this.setState({
        // school_name: '',
        // country_id: ''
      });
      this.props.studentApp.mentorAddSuccess = "";
    }
  }

  handleSubmit(event, errors, values) {
    if (errors.length === 0) {
      this.props.addMentor(values, this.props);
    }
  }


  render() {
    const { modalOpen, toggleModal } = this.props;
    // const { countryMaster } = this.props.studentApp;
    // const { country_id } = this.state;
    // console.log('state', this.state, 'and props are', this.props);
    return (

      <Modal
        size="xl"
        isOpen={modalOpen}
        toggle={toggleModal}
      // backdrop={this.state.backdrop}
      >
        <ModalHeader toggle={toggleModal}>Add New Mentor</ModalHeader>
        <ModalBody>
          <AvForm
            className=" form-container av-tooltip tooltip-label-right"
            model={this.state}
            onSubmit={this.handleSubmit}
            ref={c => (this.form = c)}
          >
            <Row>
              <Colxx xxs="12" sm="6">
                <AvGroup className=" error-l-75 error-t-negative">
                  <Label>
                    {" "}
                    Name <span className="text-danger">&#42;</span>
                  </Label>
                  <AvField
                    name="name"
                    type="text"
                    validate={{
                      required: {
                        value: true,
                        errorMessage: "Please enter a name"
                      }
                    }}
                  />
                </AvGroup>
              </Colxx>

              <Colxx xxs="12" sm="6">
                <AvGroup className="error-l-50 error-t-negative">
                  <Label>
                    Email <span className="text-danger">&#42;</span>
                  </Label>
                  <AvField
                    name="email"
                    type="email"
                    validate={{
                      required: {
                        value: true,
                        errorMessage: "Please enter email address"
                      },
                      email: {
                        value: true,
                        errorMessage: "Please enter a valid email address"
                      }
                    }}
                  />
                </AvGroup>
              </Colxx>
              <Colxx xxs="12" sm="6">
                <AvGroup className="error-l-75 error-t-negative">
                  <Label>
                    Mobile <span className="text-danger">&#42;</span>
                  </Label>
                  <AvField
                    name="phone_number"
                    type="text"
                    validate={{
                      number: {
                        value: true,
                        errorMessage: "Value must be a number"
                      },

                      required: {
                        value: true,
                        errorMessage: "Please enter a number"
                      }
                    }}
                  />
                </AvGroup>
              </Colxx>
              {/* <Colxx xxs="12" sm="6">
                <AvRadioGroup
                  className="error-l-75"
                  inline
                  name="gender"
                  required
                  errorMessage="Please select gender!"
                >
                  <Label className="d-block">
                    Gender <span className="text-danger">&#42;</span>
                  </Label>
                  <AvRadio label="Male" value="Male" />
                  <AvRadio label="Female" value="Female" />
                  <AvRadio label="Others" value="Others" />
                </AvRadioGroup>
              </Colxx> */}
              <Colxx xxs="12" sm="6">
                <AvGroup className=" error-t-negative">
                  <Label>Country / City</Label>
                  <AvField name="city" type="text" />
                </AvGroup>
              </Colxx>

              <Colxx xxs="12" sm="6">
                <AvGroup className="error-l-125 error-t-negative">
                  <Label>Linked in Profile</Label>
                  <AvField name="linked_in_profile" type="text" />
                </AvGroup>
              </Colxx>
              <Colxx xxs="12" sm="6">
                <AvGroup className="error-l-125 error-t-negative">
                  <Label>UG Course</Label>
                  <AvField name="ug_course" type="text" />
                </AvGroup>
              </Colxx>
              <Colxx xxs="12" sm="6">
                <AvGroup className="error-l-125 error-t-negative">
                  <Label>UG Collage</Label>
                  <AvField name="ug_collage" type="text" />
                </AvGroup>
              </Colxx>
              <Colxx xxs="12" sm="6">
                <AvGroup className="error-l-125 error-t-negative">
                  <Label>PG Course</Label>
                  <AvField name="pg_course" type="text" />
                </AvGroup>
              </Colxx>
              <Colxx xxs="12" sm="6">
                <AvGroup className="error-l-125 error-t-negative">
                  <Label>PG Collage</Label>
                  <AvField name="pg_collage" type="text" />
                </AvGroup>
              </Colxx>
              <Colxx xxs="12" sm="12">
                <AvGroup>
                  <Label >Note</Label>
                  <AvInput
                    type="textarea"
                    name="note"
                    id="add_enrol_textarea"
                  />
                </AvGroup>
              </Colxx>
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
    addMentor
  }
)(AddNewMentor);

