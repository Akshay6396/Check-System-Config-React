import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import TopNav from "../containers/navs/Topnav";
import Sidebar from "../containers/navs/Sidebar";
import Can from "../helpers/Can";

class AppLayout extends Component {
  render() {
    const { containerClassnames } = this.props;
    return (
      <div id="app-container" className={containerClassnames}>
        <TopNav history={this.props.history} />
        <Can
          perform="NavBar:View"
          yes={() => (
            <Sidebar />

          )}
        />
        <main>
          <div className="container-fluid">
            {this.props.children}
          </div>
        </main>
      </div>
    );
  }
}
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};
const mapActionToProps = {}

export default withRouter(connect(
  mapStateToProps,
  mapActionToProps
)(AppLayout));
