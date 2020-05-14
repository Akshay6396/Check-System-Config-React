import React, { Component, Fragment } from "react";
import {
  CustomInput,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Label,
  Row
} from "reactstrap";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

import DropzoneComponent from "react-dropzone-component";
import "dropzone/dist/min/dropzone.min.css";
import "react-tagsinput/react-tagsinput.css";

import TagsInput from "react-tagsinput";
import { Colxx } from "../../../components/common/CustomBootstrap";
import * as loggedInUser from "../../../helpers/auth-service";

import { connect } from "react-redux";
import { addStudent } from "../../../redux/actions";

import Select from "react-select";
import DatePicker from "react-datepicker";

import CustomSelectInput from "../../../components/common/CustomSelectInput";
import { NotificationManager } from "../../../components/common/react-notifications";
import { Form } from "formik";
// import IntlMessages from "../../../helpers/IntlMessages";
// For drop image
var ReactDOMServer = require("react-dom/server");
// const EMAIL_REGEX = new RegExp(
//   /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
// );

var dropzoneComponentConfig = {
  postUrl: "https://httpbin.org/post"
};

var dropzoneConfig = {
  acceptedFiles: "image/jpeg,image/jpg",

  thumbnailHeight: 160,
  maxFilesize: 2,
  previewTemplate: ReactDOMServer.renderToStaticMarkup(
    <div className="dz-preview dz-file-preview mb-3">
      <div className="d-flex flex-row ">
        <div className="p-0 w-30 position-relative">
          <div className="dz-error-mark">
            <span>
              <i />{" "}
            </span>
          </div>
          <div className="dz-success-mark">
            <span>
              <i />
            </span>
          </div>
          <div className="preview-container">
            {/*  eslint-disable-next-line jsx-a11y/alt-text */}
            <img data-dz-thumbnail className="img-thumbnail border-0" />
            <i className="simple-icon-doc preview-icon" />
          </div>
        </div>
        <div className="pl-3 pt-2 pr-2 pb-1 w-70 dz-details position-relative">
          <div>
            {" "}
            <span data-dz-name />{" "}
          </div>
          <div className="text-primary text-extra-small" data-dz-size />
          <div className="dz-progress">
            <span className="dz-upload" data-dz-uploadprogress />
          </div>
          <div className="dz-error-message">
            <span data-dz-errormessage />
          </div>
        </div>
      </div>
      <a href="#/" className="remove" data-dz-remove>
        {" "}
        <i className="glyph-icon simple-icon-trash" />{" "}
      </a>
    </div>
  ),
  headers: { "My-Awesome-Header": "header value" }
};
// For drop image end
class AddNewModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id: "",
      email: "",
      scores: [],
      // score_array: [{ score_id: "", score_value: "" }],
      score_array: [],
      // password: "",
      first_name: "",
      last_name: "",
      gender: "Male",
      city: "",
      photo: "",
      phone_number: "",
      course_apply_for_array: [],
      linked_in_proile: "",
      additional_notes: "",
      preferred_careers_array: [],
      preferred_regions_array: [],
      logged_in_user: this.props.user,
      product_type: "",
      product: "",
      product_id: "",
      product_price: "",
      purchase_date: "",
      purchase_amount: "",
      paid_amount: "",
      transaction_id: "",
      invoice_number: "",
      mode_of_payment: "",
      sales_poc: "",
      service_poc: "",
      // selling_date: "",
      embeddedDate: moment(),
      touched: {
        email: false,
        first_name: false,
        last_name: false,
        city: false,
        linked_in_proile: false,
        additional_notes: false,
        product_price: false,
        phone_number: false,
        purchase_amount: false,
        paid_amount: false,
        transaction_id: false,
        invoice_number: false,
        mode_of_payment: false,
        sales_poc: false,
        service_poc: false
      },
      errors: {
        required: {
          email: false,
          first_name: false,
          last_name: false,
          city: false,
          linked_in_proile: false,
          additional_notes: false,
          product_price: false,
          phone_number: false,
          purchase_amount: false,
          paid_amount: false,
          transaction_id: false,
          invoice_number: false,
          mode_of_payment: false,
          sales_poc: false,
          service_poc: false
        },
        valid: {
          email: false,
          first_name: true,
          last_name: true,
          city: true,
          linked_in_proile: true,
          additional_notes: true,
          product_price: true,
          phone_number: true,
          purchase_amount: true,
          paid_amount: true,
          transaction_id: true,
          invoice_number: true,
          mode_of_payment: true,
          sales_poc: true,
          service_poc: true
          // email: false,
          // name: true
        }
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleBlur(event) {
    const field = event.target.name;
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    });
    this.validate(event);
  }

  componentDidMount() {}

  // End Validation
  componentDidUpdate() {
    if (this.props.studentApp.errorAdd) {
      NotificationManager.error(
        this.props.studentApp.errorAdd,
        "Error",
        3000,
        null,
        null,
        ""
      );
    }
    if (this.props.studentApp.studentSubmitSuccess) {
      NotificationManager.success(
        this.props.studentApp.studentSubmitSuccess,
        "Success",
        3000,
        null,
        null,
        ""
      );
      this.resetform();
    }
    this.props.studentApp.errorAdd = "";
    this.props.studentApp.error = "";
    this.props.studentApp.studentSubmitSuccess = "";
  }
  // Start Validation

  // validateEmail(value) {
  //   let error;
  //   if (!value) {
  //     error = "Please enter your email address";
  //   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
  //     error = "Invalid email address";
  //   }
  //   return error;
  // }

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

  validateEmail = email => {
    let emailIsValid;
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.email)) {
      emailIsValid = false;
    } else {
      emailIsValid = true;
    }
    const errors = {
      valid: { ...this.state.errors.valid, email: emailIsValid }
    };
    this.setState({
      errors: { ...this.state.errors, ...errors }
    });
  };
  // validateEmail(email) {
  //   const emailIsValid = EMAIL_REGEX.test(this.state.email);
  //
  //   const errors = {
  //     valid: { ...this.state.errors.valid, email: emailIsValid }
  //   };

  //   this.setState({
  //     errors: { ...this.state.errors, ...errors }
  //   });
  // }
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
      email: "",
      score_array: [{ score_id: "", score_value: "" }],
      first_name: "",
      last_name: "",
      gender: "Male",
      city: "",
      photo: "",
      phone_number: "",
      course_apply_for_array: [],
      scores: [],
      linked_in_proile: "",
      additional_notes: "",
      preferred_careers_array: [],
      preferred_regions_array: [],
      logged_in_user: "",
      product_type: "",
      product: "",
      product_id: "",
      product_price: "",
      purchase_date: "",
      purchase_amount: "",
      paid_amount: "",
      payment_sourse: "",
      transaction_id: "",
      invoice_number: "",
      mode_of_payment: "",
      sales_poc: "",
      service_poc: "",
      // selling_date: "",
      embeddedDate: moment()
    });
  }
  // getproducts() {

  //   axios.post(localPath + 'product/getProducts')
  //     .then(res => {
  //       return res.data;
  //     }).then(data => {
  //       this.setState({
  //         productsList: data.Data
  //       });
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }
  handleScoreArrayNameChange = idx => evt => {
    const newscore_array = this.state.score_array.map((ScoreArray, sidx) => {
      if (idx !== sidx) return ScoreArray;
      return { ...ScoreArray, score_id: evt };
    });

    this.setState({ score_array: newscore_array });
  };
  handleScoreArray = scores => {
    this.setState({ scores });
    var newArr = [];
    scores.forEach(element => {
      if (!element.score_childs || element.score_childs === null) {
        let payLoad = { score_id: element, score_value: "" };
        newArr.push(payLoad);
      } else {
        element.score_childs.forEach(elementChild => {
          let payLoad = { score_id: elementChild, score_value: "" };
          newArr.push(payLoad);
        });
      }
    });
    this.setState({
      score_array: newArr
    });
  };
  handleScoreArrayValueChange = idx => evt => {
    const newscore_array = this.state.score_array.map((ScoreArray, sidx) => {
      if (idx !== sidx) return ScoreArray;
      return { ...ScoreArray, [evt.target.name]: evt.target.value };
    });

    this.setState({ score_array: newscore_array });
  };
  handleRemoveScoreArray = idx => () => {
    this.setState({
      score_array: this.state.score_array.filter((s, sidx) => idx !== sidx)
    });
  };
  handleAddScoreArray = () => {
    this.setState({
      score_array: this.state.score_array.concat([
        { score_id: "", score_value: "" }
      ])
    });
  };
  handleChange(event) {
    const target = event.target;
    const { value, name } = target;
    const errors = {
      required: { ...this.state.errors.required, [name]: false }
    };
    this.setState({
      [name]: value,
      errors: { ...this.state.errors, ...errors }
    });
  }
  handleChangeMulticareer = preferred_careers_array => {
    this.setState({ preferred_careers_array });
  };
  handleChangeMultiregion = preferred_regions_array => {
    this.setState({ preferred_regions_array });
  };
  handleChangeMultiApplyFor = course_apply_for_array => {
    this.setState({ course_apply_for_array });
  };
  handleChangeProductType = product_type => {
    this.setState({ product_type });
  };
  handleChangeProduct = product => {
    this.setState({ product });
  };
  handleChangePaymentSource = mode_of_payment => {
    this.setState({ mode_of_payment });
  };
  handleChangePoc = sales_poc => {
    this.setState({ sales_poc });
  };
  handleChangeServicePoc = service_poc => {
    this.setState({ service_poc });
  };
  handleChangeDate = date => {
    this.setState({
      selling_date: date
    });
  };

  isFormInvalid() {
    const { errors } = this.state;
    const { required, valid } = errors;
    const isSomeFieldRequired = Object.keys(required).some(
      error => required[error]
    );
    const isSomeFieldInvalid = Object.keys(valid).some(error => !valid[error]);

    return isSomeFieldInvalid || isSomeFieldRequired;
  }
  onAddStudent = type => {
    var scoreFinalArr = [{ score_id: "", score_value: "" }];
    if (this.state.score_array.length > 0) {
      scoreFinalArr = [];
      this.state.score_array.forEach(element => {
        let payload = {
          score_id: element.score_id.ps_score_id,
          score_value: element.score_value
        };
        scoreFinalArr.push(payload);
      });
    }

    const newItem = {
      user_id: this.state.user_id,
      email: this.state.email,
      score_array: scoreFinalArr,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      gender: this.state.gender,
      city: this.state.city,
      photo: this.state.photo,
      phone_number: this.state.phone_number,
      course_apply_for_array: this.state.course_apply_for_array,
      preferred_careers_array: this.state.preferred_careers_array,
      preferred_regions_array: this.state.preferred_regions_array,
      linked_in_proile: this.state.linked_in_proile,
      additional_notes: this.state.additional_notes,
      logged_in_user: loggedInUser.getProfile().user.user_id,
      product_type: this.state.product.product_name,
      product_id: this.state.product.product_id,
      // product_price: this.state.product.product_price,
      selling_date: this.state.selling_date,
      paid_amount: this.state.paid_amount,
      purchase_amount: this.state.purchase_amount,
      // payment_source: this.state.payment_source,
      transaction_id: this.state.transaction_id,
      invoice_number: this.state.invoice_number,
      mode_of_payment: this.state.mode_of_payment.payment_source_id,
      sales_poc: this.state.sales_poc.user_id,
      service_poc: this.state.service_poc.user_id
      // preferred_careers: this.state.preferred_careers
    };

    this.props.addStudent(newItem, this.props.props.history, type, this.props);
  };
  render() {
    // const { messages } = this.props.intl;
    const eventHandlers = {
      drop: this.callbackArray,
      addedfile: this.callback,
      success: (file, response) => {
        this.setState({ photo: file.dataURL });
      }
    };
    const {
      // productsList,
      email,
      first_name,
      last_name,
      city,
      phone_number,
      linked_in_proile,
      additional_notes,
      purchase_amount,
      paid_amount,
      transaction_id,
      invoice_number,
      // product_type,
      product,
      mode_of_payment,
      sales_poc,
      service_poc,
      scores,
      score_array
    } = this.state;

    // const selectProductType = [
    //   { label: "UG Consultation", value: "UG Consultation" },
    //   { label: "PG Consultation", value: "PG Consultation" },
    //   { label: "PHD Consultation", value: "PHD Consultation" },
    //   { label: "Career Consultation", value: "Career Consultation" },
    //   { label: "Test Prep", value: "Test Prep" },
    //   { label: "Others", value: "Others" }
    // ];
    // const { labels, categories } = this.props.addStudent;
    const { modalOpen, toggleModal } = this.props;
    const {
      allProducts,
      paymentSources,
      scoresMaster,
      salesPOCList,
      KAMList
      // ,backendUsers
    } = this.props.studentApp;
    return (
      <Modal
        isOpen={modalOpen}
        toggle={toggleModal}
        wrapClassName="modal-right"
        backdrop="static"
      >
        <ModalHeader toggle={toggleModal}>Add New Student</ModalHeader>
        <ModalBody>
          <Form className="av-tooltip tooltip-label-right">
            <Fragment>
              <Row>
                {/* <Colxx xxs="12">
                  <div className="d-flex flex-row pb-1  "> */}
                <Colxx xxs="12" sm="6">
                  <FormGroup className="error-l-75">
                    <Label>First Name</Label>
                    <Input
                      value={first_name}
                      name="first_name"
                      onChange={this.handleChange}
                      onBlur={this.handleBlur}
                      type="text"
                    />
                    {this.hasError("first_name") && (
                      <div className="invalid-feedback d-block">
                        {" "}
                        {this.displayError("first_name", "First Name")}
                      </div>
                    )}
                  </FormGroup>
                </Colxx>
                <Colxx xxs="12" sm="6">
                  <FormGroup className="error-l-75">
                    <Label>Last Name</Label>
                    <Input
                      type="text"
                      // defaultValue={this.state.last_name}
                      value={last_name}
                      name="last_name"
                      onChange={this.handleChange}
                      onBlur={this.handleBlur}
                    />
                    {this.hasError("last_name") && (
                      <div className="invalid-feedback d-block">
                        {" "}
                        {this.displayError("last_name", "Last Name")}
                      </div>
                    )}
                  </FormGroup>
                </Colxx>
                {/* </div>
                </Colxx> */}
              </Row>
              <Row>
                <Colxx xxs="12" sm="6">
                  <FormGroup>
                    <Label>Email</Label>
                    <Input
                      type="text"
                      // defaultValue={this.state.email}
                      value={email}
                      name="email"
                      onChange={this.handleChange}
                      onBlur={this.handleBlur}
                    />
                    {this.hasError("email") && (
                      <div className="invalid-feedback d-block">
                        {" "}
                        {this.displayError("email", "Email")}
                      </div>
                    )}
                  </FormGroup>
                </Colxx>
                <Colxx xxs="12" sm="6">
                  <FormGroup className="error-l-100">
                    <Label>Phone Number</Label>
                    <Input
                      type="number"
                      pattern="[0-9]*"
                      inputMode="numeric"
                      className="number_type"
                      // type="text"
                      // defaultValue={this.state.phone_number}
                      value={phone_number}
                      name="phone_number"
                      onChange={this.handleChange}
                      onBlur={this.handleBlur}
                      // onChange={event => {
                      //   this.setState({ phone_number: event.target.value });
                      // }}
                    />
                    {this.hasError("phone_number") && (
                      <div className="invalid-feedback d-block">
                        {" "}
                        {this.displayError("phone_number", "Phone Number")}
                      </div>
                    )}
                  </FormGroup>
                </Colxx>
              </Row>
            </Fragment>
            <Fragment>
              <Row>
                <Colxx xxs="12" sm="6">
                  <FormGroup className="error-l-100">
                    <Label>Linked In Profile</Label>

                    <Input
                      type="text"
                      // defaultValue={this.state.linked_in_proile}
                      value={linked_in_proile}
                      name="linked_in_proile"
                      onChange={this.handleChange}
                      onBlur={this.handleBlur}
                    />
                    {this.hasError("linked_in_proile") && (
                      <div className="invalid-feedback d-block">
                        {" "}
                        {this.displayError(
                          "linked_in_proile",
                          "Linked in Profile "
                        )}
                      </div>
                    )}
                  </FormGroup>
                </Colxx>
                <Colxx xxs="12" sm="6">
                  <FormGroup>
                    <Label>City</Label>
                    <Input
                      type="text"
                      // defaultValue={this.state.city}
                      value={city}
                      name="city"
                      onChange={this.handleChange}
                      onBlur={this.handleBlur}
                    />
                    {this.hasError("city") && (
                      <div className="invalid-feedback d-block">
                        {" "}
                        {this.displayError("city", "City")}
                      </div>
                    )}
                  </FormGroup>
                </Colxx>
              </Row>
            </Fragment>
            <Fragment>
              <Row>
                {/* <Colxx xxs="12 ">
                  <div className="d-flex flex-row pb-1 select_div "> */}
                <Colxx xxs="12" sm="6">
                  <FormGroup>
                    <label>Product</label>
                    <Select
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      name="form-field-name"
                      value={product}
                      onChange={this.handleChangeProduct}
                      // onChange={this.handleChange}
                      getOptionLabel={option => `${option.product_name}`}
                      getOptionValue={option => `${option.product_id}`}
                      options={allProducts}
                    />
                  </FormGroup>
                </Colxx>

                <Colxx xxs="12" sm="6">
                  <div className="d-flex flex-row pb-1  labels_div">
                    <Label>Gender</Label>
                  </div>

                  <CustomInput
                    className="radio_div"
                    type="radio"
                    id="exCustomRadio"
                    name="gender"
                    label="Male"
                    defaultChecked={this.state.status === "Male"}
                    onChange={event => {
                      this.setState({
                        gender: event.target.value === "on" ? "Male" : "Female"
                      });
                    }}
                  />
                  <CustomInput
                    className="radio_div"
                    type="radio"
                    id="exCustomRadio2"
                    name="gender"
                    label="Female"
                    defaultChecked={this.state.status === "Female"}
                    onChange={event => {
                      this.setState({
                        gender: event.target.value !== "on" ? "Male" : "Female"
                      });
                    }}
                  />
                </Colxx>
                {/* </div>
                </Colxx> */}
              </Row>
            </Fragment>
            <Colxx xxs="12 ">
              <Label className="mt-4">
                Photo
                {/* <IntlMessages id="todo.title" /> */}
              </Label>
              <DropzoneComponent
                eventHandlers={eventHandlers}
                config={dropzoneComponentConfig}
                djsConfig={dropzoneConfig}
              />
            </Colxx>
            <br />
            <Fragment>
              <Row>
                <Colxx xxs="12" sm="6">
                  <FormGroup className="error-l-100">
                    <Label>
                      {/* Selling Purchase Date */}
                      Purchase Date
                    </Label>
                    {/* <div className="mb-5"> */}
                    <div>
                      <DatePicker
                        selected={this.state.selling_date}
                        onChange={this.handleChangeDate}
                        placeholderText={"MM/DD/YYYY"}
                      />
                    </div>
                  </FormGroup>
                </Colxx>
                <Colxx xxs="12" sm="6">
                  <FormGroup className="error-l-125">
                    <Label>Purchase Amount</Label>

                    <Input
                      type="number"
                      // defaultValue={this.state.linked_in_proile}
                      value={purchase_amount}
                      name="purchase_amount"
                      onChange={this.handleChange}
                      onBlur={this.handleBlur}
                    />
                    {this.hasError("purchase_amount") && (
                      <div className="invalid-feedback d-block">
                        {" "}
                        {this.displayError(
                          "purchase_amount",
                          "Purchase Amount "
                        )}
                      </div>
                    )}
                  </FormGroup>
                </Colxx>
              </Row>
            </Fragment>
            <Fragment>
              <Row>
                <Colxx xxs="12" sm="6">
                  <FormGroup className="error-l-100">
                    <Label>Paid Amount</Label>
                    <Input
                      type="number"
                      // defaultValue={this.state.city}
                      value={paid_amount}
                      name="paid_amount"
                      onChange={this.handleChange}
                      onBlur={this.handleBlur}
                    />
                    {this.hasError("paid_amount") && (
                      <div className="invalid-feedback d-block">
                        {" "}
                        {this.displayError("paid_amount", "Paid Amount")}
                      </div>
                    )}
                  </FormGroup>
                </Colxx>

                <Colxx xxs="12" sm="6">
                  <FormGroup className="error-l-100">
                    <Label>Transaction Id</Label>
                    <Input
                      type="text"
                      // defaultValue={this.state.city}
                      value={transaction_id}
                      name="transaction_id"
                      onChange={this.handleChange}
                      onBlur={this.handleBlur}
                    />
                    {this.hasError("transaction_id") && (
                      <div className="invalid-feedback d-block">
                        {" "}
                        {this.displayError("transaction_id", "Transaction Id")}
                      </div>
                    )}
                  </FormGroup>
                </Colxx>
              </Row>
            </Fragment>
            <Fragment>
              <Row>
                <Colxx xxs="12" sm="6">
                  <FormGroup className="error-l-100">
                    <Label>Invoice Number</Label>
                    <Input
                      type="text"
                      // defaultValue={this.state.city}
                      value={invoice_number}
                      name="invoice_number"
                      onChange={this.handleChange}
                      onBlur={this.handleBlur}
                    />
                    {this.hasError("invoice_number") && (
                      <div className="invalid-feedback d-block">
                        {" "}
                        {this.displayError("invoice_number", "Invoice Number")}
                      </div>
                    )}
                  </FormGroup>
                </Colxx>
                <Colxx xxs="12" sm="6">
                  <FormGroup>
                    <label>Payment Scource</label>
                    <Select
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      name="form-field-name"
                      value={mode_of_payment}
                      onChange={this.handleChangePaymentSource}
                      getOptionLabel={option => `${option.payment_source_type}`}
                      getOptionValue={option => `${option.payment_source_id}`}
                      options={paymentSources}
                    />
                  </FormGroup>
                </Colxx>
                <Colxx xxs="12" sm="6">
                  <FormGroup>
                    <label>Service Poc</label>
                    <Select
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      name="form-field-name"
                      value={service_poc}
                      onChange={this.handleChangeServicePoc}
                      getOptionLabel={option =>
                        option.user_lname
                          ? `${option.user_fname + " " + option.user_lname}`
                          : `${option.user_fname}`
                      }
                      getOptionValue={option => `${option.user_id}`}
                      options={KAMList}
                    />
                  </FormGroup>
                </Colxx>
                <Colxx xxs="12" sm="6">
                  <FormGroup>
                    <label>Sales Poc</label>
                    <Select
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      name="form-field-name"
                      value={sales_poc}
                      onChange={this.handleChangePoc}
                      getOptionLabel={option =>
                        option.user_lname
                          ? `${option.user_fname + " " + option.user_lname}`
                          : `${option.user_fname}`
                      }
                      getOptionValue={option => `${option.user_id}`}
                      options={salesPOCList}
                    />
                  </FormGroup>
                </Colxx>
              </Row>
            </Fragment>
            <Colxx xxs="12 ">
              <label className="mt-4">Preferred Careers</label>
              <TagsInput
                value={this.state.preferred_careers_array}
                onChange={this.handleChangeMulticareer}
                inputProps={{ placeholder: "Careers" }}
              />
            </Colxx>
            <Colxx xxs="12 ">
              <label className="mt-4">Preferred Regions</label>
              <TagsInput
                value={this.state.preferred_regions_array}
                onChange={this.handleChangeMultiregion}
                inputProps={{ placeholder: "Regions" }}
              />
            </Colxx>
            <Colxx xxs="12 ">
              <label className="mt-4">Course Apply For</label>
              <TagsInput
                value={this.state.course_apply_for_array}
                onChange={this.handleChangeMultiApplyFor}
                inputProps={{ placeholder: "Courses" }}
              />
            </Colxx>
            {/* <br /> */}
            <Colxx xxs="12 ">
              <label className="mt-4">Scores</label>

              <Select
                // components={{ Input: CustomSelectInput }}
                className="react-select"
                classNamePrefix="react-select"
                name="scores"
                isMulti="true"
                value={scores}
                onChange={this.handleScoreArray}
                getOptionLabel={option => `${option.score_name}`}
                getOptionValue={option => `${option.ps_score_id}`}
                options={scoresMaster}
              />
            </Colxx>
            {/* <div className="d-flex flex-row pb-1">

              <Label>
                Score
          </Label>
              < div className="position-absolute table-right-buttons">
                <Button outline color={"primary"} className="close" onClick={this.handleAddScoreArray}>
                  <i className="simple-icon-plus" />
                </Button>
              </div>
            </div>
              */}
            {score_array.length > 0 && <br />}
            {/* <Row> */}
            {/* <Colxx xxs="12 "> */}
            <Fragment>
              <div className="d-flex flex-row flex-wrap">
                {score_array.map((ScoreArray, idx) => {
                  if ((idx + 1) % 2 === 0) {
                    return (
                      <div key={idx} className="mb-3 w-50">
                        <Colxx key={idx}>
                          <Input
                            type="number"
                            pattern="[0-9]*"
                            inputMode="numeric"
                            className="number_type"
                            placeholder={ScoreArray.score_id.score_name}
                            name="score_value"
                            value={ScoreArray.score_value}
                            onChange={this.handleScoreArrayValueChange(idx)}
                          />
                        </Colxx>
                      </div>
                    );
                  } else {
                    return (
                      <div key={idx} className="mb-3 w-50">
                        <Colxx key={idx}>
                          <Input
                            type="number"
                            pattern="[0-9]*"
                            inputMode="numeric"
                            className="number_type"
                            placeholder={ScoreArray.score_id.score_name}
                            name="score_value"
                            value={ScoreArray.score_value}
                            onChange={this.handleScoreArrayValueChange(idx)}
                          />
                        </Colxx>
                      </div>
                    );
                  }
                })}
              </div>
            </Fragment>
            {/* </Colxx> */}
            {/* </Row> */}

            {/* </Fragment> */}
            <FormGroup className="error-l-125 mt-4">
              <Colxx xxs="12 ">
                <Label>Additional Notes</Label>
                <Input
                  type="textarea"
                  // defaultValue={this.state.additional_notes}
                  value={additional_notes}
                  name="additional_notes"
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  // onChange={event => {
                  //   this.setState({ additional_notes: event.target.value });
                  // }}
                />
                {this.hasError("additional_notes") && (
                  <div className="invalid-feedback d-block">
                    {" "}
                    {this.displayError("additional_notes", "Additional Notes")}
                  </div>
                )}
              </Colxx>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          {/* <Button color="secondary" outline onClick={toggleModal}>
            <IntlMessages id="todo.cancel" />
          </Button>
          <Button color="primary" onClick={() => this.onAddStudent()}>
            <IntlMessages id="todo.submit" />
          </Button>{" "} */}
          <Button
            color="primary"
            disabled={this.isFormInvalid()}
            onClick={() => this.onAddStudent("Next")}
          >
            Save and Next
          </Button>{" "}
          <Button
            color="primary"
            disabled={this.isFormInvalid()}
            onClick={() => this.onAddStudent("New")}
          >
            Save and New
          </Button>{" "}
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
  addStudent
})(AddNewModal);
