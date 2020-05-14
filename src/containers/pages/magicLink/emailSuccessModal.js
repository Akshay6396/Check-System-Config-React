import React, { Component, Fragment } from "react";
import { Row, Card, CardBody } from "reactstrap";
import { ContextMenuTrigger } from "react-contextmenu";
  import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    // FormGroup,
    Input,
    Label
  } from "reactstrap";
  import Datepicker from 'react-datepicker';
  import "react-datepicker/dist/react-datepicker.css";
  import Select from "react-select";
  import CustomSelectInput from "../../../components/common/CustomSelectInput";
  import { addInteraction } from "../../../redux/actions";
  import { Colxx } from "../../../components/common/CustomBootstrap";
  import * as  loggedInUser  from "../../../helpers/auth-service";
  import { connect } from "react-redux";
  import { NotificationManager } from "../../../components/common/react-notifications";
  class EmailSuccessModal extends Component {
    constructor(props) {
      super(props);
      this.state = {
        modalNew:true
      };
    }
  
    componentDidMount(){
        
        console.log(this.props);
    }

    componentDidUpdate(){
        
        console.log(this.props);
    }

    
    render() {
      const { modalOpen, toggleModal } = this.props;
     
      return (
        <Modal
          size="lg"
          isOpen={modalOpen}
          toggle={toggleModal}
          backdrop="static"
        >
          <ModalHeader toggle={toggleModal}>
            Magic Link Sent!
          </ModalHeader>
          <ModalBody className="row" style={{display:'initial'}}>
            We have sent you an email with the Magic login. Please click the Login button in the email to explore 35+ participating universities at UniConnect
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggleModal}>
              Okay
            </Button>
          </ModalFooter>
      </Modal>
    );
  }
}

export default EmailSuccessModal;
  
