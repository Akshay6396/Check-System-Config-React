import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { IntlProvider } from "react-intl";
// import './helpers/Firebase';
import AppLocale from "./lang";
import ColorSwitcher from "./components/common/ColorSwitcher";
import NotificationContainer from "./components/common/react-notifications/NotificationContainer";
import { isMultiColorActive } from "./constants/defaultValues";
import { getDirection } from "./helpers/Utils";
import * as loggedInUser from "./helpers/auth-service";


const ViewMain = React.lazy(() =>
  import(/* webpackChunkName: "views" */ "./views")
);

const RedirectRoute = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ "./views/redirect")
);
const SystemCheck = React.lazy(() =>
  import(/* webpackChunkName: "views-user" */ "./views/system-check")
);
const ViewError = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ "./views/error")
);

const AuthRoute = ({ component: Component, authUser, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        authUser ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: "/user/login",
                // state: { from: props.location }
              }}
            />
          )
      }
    />
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    const direction = getDirection();
    if (direction.isRtl) {
      document.body.classList.add("rtl");
      document.body.classList.remove("ltr");
    } else {
      document.body.classList.add("ltr");
      document.body.classList.remove("rtl");
    }
    this.state = {
      prevPath: ""
    }
  }

  componentWillMount() {
  }

  /**************************** Get Privious location data *********************************/
  // getInitialState() {
  //   return { prevPath: '' }
  // }

  // componentWillReceiveProps(nextProps) {
  //   
  //   if (nextProps.location !== this.props.location) {
  //     this.setState({ prevPath: this.props.location })
  //   }
  // }
  /**************************** Get Privious location data End *********************************/

  render() {
    const { locale } = this.props;
    const currentAppLocale = AppLocale[locale];
    return (
      <div className="h-100">
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}
        >
          <React.Fragment>
            <NotificationContainer />
            {isMultiColorActive && <ColorSwitcher />}
            <Suspense fallback={<div className="loading" />}>
              <Router basename={process.env.PUBLIC_URL}>
                <Switch>
                  {/* <AuthRoute
                    path="/redirect"
                    authUser={loggedInUser.loggedIn()}
                    component={RedirectRoute}
                    loc=""

                  /> */}
                
                  <Route
                    path="/troubleshoot"
                    render={props => <SystemCheck {...props} />}
                  />
                  
                  <Route
                    path="/error"
                    exact
                    render={props => <ViewError {...props} />}
                  />
                  <Route
                    path="/"
                    exact
                    render={props => <ViewMain {...props} />}
                  />
                  
                  <Redirect to="/error" />
                </Switch>
              </Router>
            </Suspense>
          </React.Fragment>
        </IntlProvider>
      </div>
    );
  }
}

const mapStateToProps = ({ authUser, settings }) => {
  const { user: loginUser } = authUser;
  const { locale } = settings;
  return { loginUser, locale };
};
const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(App);
