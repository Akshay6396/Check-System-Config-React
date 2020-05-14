import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardTitle
  // UncontrolledDropdown,
  // DropdownItem,
  // DropdownToggle,
  // DropdownMenu
} from "reactstrap";
import { connect } from "react-redux";
import { ThemeColors } from "../../helpers/ThemeColors";
import IntlMessages from "../../helpers/IntlMessages";
import { LineChart } from "../../components/charts";
import moment from "moment";

// import { lineChartData } from "../../data/charts";
class SalesChartCard extends Component {
  render() {
    const colors = ThemeColors();

    const lineChartData = {
      labels: [],
      datasets: [
        {
          label: "",
          data: [],
          borderColor: colors.themeColor1,
          pointBackgroundColor: colors.foregroundColor,
          pointBorderColor: colors.themeColor1,
          pointHoverBackgroundColor: colors.themeColor1,
          pointHoverBorderColor: colors.foregroundColor,
          pointRadius: 6,
          pointBorderWidth: 2,
          pointHoverRadius: 8,
          fill: false
        }
      ]
    };
    if (this.props.dashboardApp.enrolmentsGraph.length > 0) {
      this.props.dashboardApp.enrolmentsGraph.forEach(element => {
        element.date = new Date(element.date);
        const date = moment(element.date);
        lineChartData.labels.push(date.format("dddd"));
        lineChartData.datasets[0].data.push(element.count);
      });
    }
    return (
      <Card>
        {/* <div className="position-absolute card-top-buttons">
          <UncontrolledDropdown>
            <DropdownToggle color="" className="btn btn-header-light icon-button">
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
            <IntlMessages id="dashboards.sales" />
          </CardTitle>
          <div className="dashboard-line-chart">
            <LineChart shadow data={lineChartData} />
          </div>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = ({ dashboardApp }) => {
  return {
    dashboardApp
  };
};
export default connect(mapStateToProps, {})(SalesChartCard);
