import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  FormGroup,
  Button,
  Input
} from "reactstrap";
import Select from "react-select";
import { connect } from "react-redux";

import { Colxx } from "../../../components/common/CustomBootstrap";
import IntlMessages from "../../../helpers/IntlMessages";
import CustomSelectInput from "../../../components/common/CustomSelectInput";

const selectData = [
  { label: "Cake", value: "cake", key: 0 },
  { label: "Cupcake", value: "cupcake", key: 1 },
  { label: "Dessert", value: "dessert", key: 2 }
];
class NotesAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOptions: []
    };
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };

  render() {
    return (
      <Card>
        {/* <div className="position-absolute card-top-buttons">
          <UncontrolledDropdown>
            <DropdownToggle
              color=""
              className="btn btn-header-light icon-button"
            >
              <i className="simple-icon-refresh" />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <IntlMessages id="dashboards.sales" />
              </DropdownItem>
              <DropdownItem>
                <IntlMessages id="dashboards.orders" />
              </DropdownItem>
              <DropdownItem>
                <IntlMessages id="dashboards.refunds" />
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div> */}
        <CardBody>
          <CardTitle>
            <IntlMessages id="dashboards.quick-post" />
          </CardTitle>

          <FormGroup >
            <Colxx sm="6">
              <Input type="textarea" rows="3" />
            </Colxx>
            {/* <Colxx sm="6">
              <Select
                components={{ Input: CustomSelectInput }}
                className="react-select"
                classNamePrefix="react-select"
                name="form-field-name"
                value={this.state.selectedOption}
                onChange={this.handleChange}
                options={selectData}
              />
            </Colxx> */}
          </FormGroup>

          <Button className="float-right" color="primary">
            <IntlMessages id="dashboards.save-and-publish" />
          </Button>
          {/* </Form> */}
        </CardBody>
      </Card>
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
  {}
)(NotesAdd);
