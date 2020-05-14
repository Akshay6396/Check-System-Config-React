import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Row
} from "reactstrap";
import Select from "react-select";
import { Colxx } from "../../../components/common/CustomBootstrap";
import CustomSelectInput from "../../../components/common/CustomSelectInput";
import { connect } from "react-redux";
import { addCase } from "../../../redux/actions";
import "react-tagsinput/react-tagsinput.css";
import TagsInput from "react-tagsinput";
import * as  loggedInUser from "../../../helpers/auth-service";
import { NotificationManager } from "../../../components/common/react-notifications";

class AddCaseModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: this.props.studentApp.studentDetails.user_id,
      product: "",
      preferred_regions_array: [],
      preferred_careers_array: [],
      course_apply_for_array: []
    };
  }


  componentDidUpdate = prevProps => {

    if (this.props.studentApp.caseAddSuccess) {
      NotificationManager.success(
        this.props.studentApp.caseAddSuccess,
        "Success",
        3000,
        null,
        null,
        ""
      );
      this.setState({
        product: "",
        preferred_regions_array: [],
        preferred_careers_array: [],
        course_apply_for_array: []
      });
      this.props.studentApp.caseAddSuccess = "";
    }
  };

  handleChangeProduct = product => {
    this.setState({ product });
  };
  handleChangeMultiregion = preferred_regions_array => {
    this.setState({ preferred_regions_array });
  };
  handleChangeMulticareer = preferred_careers_array => {
    this.setState({ preferred_careers_array });
  };
  handleChangeMultiApplyFor = course_apply_for_array => {
    this.setState({ course_apply_for_array });
  };
  onSubmit = () => {
    let payload = {
      user_id: this.state.user_id,
      logged_in_user: loggedInUser.getProfile().user.user_id,
      product: this.state.product,
      preferred_regions_array: this.state.preferred_regions_array,
      preferred_careers_array: this.state.preferred_careers_array,
      course_apply_for_array: this.state.course_apply_for_array
    };

    this.props.addCase(payload, this.props);
  };
  render() {
    const { product } = this.state;
    const { modalOpen, toggleModal } = this.props;
    const { allProducts } = this.props.studentApp;
    return (
      <Modal size="lg" isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Add Case</ModalHeader>
        <ModalBody>
          <Row>
            <Colxx xxs="12" xs="12" lg="6">
              <Label className="mt-2">Product</Label>
              <Select
                components={{ Input: CustomSelectInput }}
                className="react-select"
                classNamePrefix="react-select"
                name="form-field-name"
                value={product}
                onChange={this.handleChangeProduct}
                getOptionLabel={option => `${option.product_name}`}
                getOptionValue={option => `${option.product_id}`}
                options={allProducts}
              />
            </Colxx>
            <Colxx xxs="12" xs="12" lg="6">
              <Label className="mt-2" >Preferred Regions</Label>
              <TagsInput
                value={this.state.preferred_regions_array}
                onChange={this.handleChangeMultiregion}
                inputProps={{ placeholder: "Regions" }}
              />
            </Colxx>
            <Colxx xxs="12" xs="12" lg="6">
              <label className="mt-2">Preferred Careers</label>
              <TagsInput
                value={this.state.preferred_careers_array}
                onChange={this.handleChangeMulticareer}
                inputProps={{ placeholder: "Careers" }}
              />
            </Colxx>
            <Colxx xxs="12 " xs="12" lg="6">
              <label className="mt-2">Course Apply For</label>
              <TagsInput
                value={this.state.course_apply_for_array}
                onChange={this.handleChangeMultiApplyFor}
                inputProps={{ placeholder: "Courses" }}
              />
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
              this.state.product === "" ||
              this.state.preferred_regions_array === []
            }
            onClick={() => this.onSubmit()}
          >
            <span className="spinner d-inline-block">
              <span className="bounce1" />
              <span className="bounce2" />
              <span className="bounce3" />
            </span>
            <span className="label">Add Case</span>
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

export default connect(
  mapStateToProps, {
  addCase
})
  (AddCaseModal);
