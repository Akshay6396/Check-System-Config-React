import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Row,
} from "reactstrap";
import Select from "react-select";
import CustomSelectInput from "../../../components/common/CustomSelectInput";
import { Colxx } from "../../../components/common/CustomBootstrap";
import { connect } from "react-redux";
import { addSchool, getCountryName } from "../../../redux/actions";
import { NotificationManager } from "../../../components/common/react-notifications";

class AddSchool extends Component {
  state = {
    school_name: '',
    school_country: '',
    country_id: ""

  };
  componentDidMount() {

  }

  componentDidUpdate = prevProps => {
    if (
      this.props.modalOpen === true &&
      this.props.modalOpen !== prevProps.modalOpen
    ) {
      this.props.getCountryName();
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
        school_name: '',
        country_id: ''
      });
      this.props.studentApp.schoolAddSuccess = "";
    }
  }


  onSubmit = () => {
    if (this.state.school_name !== "" && this.state.country_id !== "") {
      
      let payload = {
        school_name: this.state.school_name,
        country_id: this.state.country_id.country_id,
      };
      // console.log(payload)
      this.props.addSchool(payload, this.props);
    }
  };

  CountryNameChange = country_id => {
    this.setState({ country_id: country_id });
  }
  render() {
    const { modalOpen, toggleModal } = this.props;
    const { countryMaster } = this.props.studentApp;
    const { country_id } = this.state;
    // console.log('state', this.state, 'and props are', this.props);
    return (
      <Modal
        size="l"
        isOpen={modalOpen}
        toggle={toggleModal}
      // backdrop={this.state.backdrop}
      >
        <ModalHeader toggle={toggleModal}>Add New School</ModalHeader>
        <ModalBody>
          <Row>
            <Colxx>
              <Label>School Name</Label>
              <Input placeholder='Enter School Name' onChange={e => { this.setState({ school_name: e.target.value }) }}></Input>
            </Colxx>
            <Colxx>
              <Label>Country Name </Label>
              <Select
                components={{
                  Input: CustomSelectInput
                }}
                className="react-select"
                classNamePrefix="react-select"
                placeholder="Country Name"
                name="country_id"
                // isMulti="true"
                value={country_id}
                // onChange={e=>console.log(e.target.value)}
                onChange={this.CountryNameChange}

                getOptionLabel={option => `${option.country_name}`}
                getOptionValue={option => `${option.country_id}`}
                options={countryMaster}
              />
              {/* <Input placeholder='Enter School Country' onChange={e => { this.setState({ country_id: e.target.value }) }}></Input> */}
            </Colxx>
          </Row>

        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className={`btn-shadow btn-multiple-state ${
              this.props.studentApp.loading ? "show-spinner" : ""
              }`}
            disabled={this.state.country_id === "" || this.state.school_name === ""}

            onClick={this.onSubmit}
          >
            <span className="spinner d-inline-block">
              <span className="bounce1" />
              <span className="bounce2" />
              <span className="bounce3" />
            </span>
            <span className="label">Add School</span>
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
export default connect(mapStateToProps,
  {
    addSchool,
    getCountryName
  }
)(AddSchool);

