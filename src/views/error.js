import React, { Component, Fragment } from "react";
import { Row, Card, CardTitle, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { Colxx } from "../components/common/CustomBootstrap";
import IntlMessages from "../helpers/IntlMessages";
import TopNav from './../nav/top-nav';

class Error extends Component {
  componentDidMount() {
    document.body.classList.add("background");
  }
  componentWillUnmount() {
    document.body.classList.remove("background");
  }
  render() {
    return (
      <Fragment>
      <div className="fixed-background" />
      < TopNav />
      <main style={{height:'auto'}}>
        {/* <div className="container">{this.props.children}</div> */}
        <div className="container">
            <Row className="h-100">
              <Colxx xxs="12" md="10" className="mx-auto my-auto">
                <Card className="auth-card" style={{marginTop:'6%'}}>
                  <div className="position-relative image-side ">
                    <img src={require('./../assets/img/error.png')} alt="Error occured" style={{width:'100%'}}></img>
                  </div>
                  <div className="form-side">
                    <CardTitle className="mb-4">
                      <IntlMessages id="pages.error-title" />
                    </CardTitle>
                    <p className="mb-0 text-muted text-small mb-0">
                      <IntlMessages id="pages.error-code" />
                    </p>
                    <p className="display-1 font-weight-bold mb-5">404</p>
                    <Button
                      href="/account/user"
                      color="primary"
                      className="btn-shadow"
                      size="lg"
                    >
                      <IntlMessages id="pages.go-back-home" />
                    </Button>
                  </div>
                </Card>
              </Colxx>
            </Row>
          </div>
      </main>
    </Fragment>
      );
  }
}
export default Error;


{/* <Fragment>
        <div className="fixed-background" />
        <main>
          <div className="container">
            <Row className="h-100">
              <Colxx xxs="12" md="10" className="mx-auto my-auto">
                <Card className="auth-card">
                  <div className="position-relative image-side ">
                    <p className="text-white h2">MAGIC IS IN THE DETAILS</p>
                    <p className="white mb-0">Yes, it is indeed!</p>
                  </div>
                  <div className="form-side">
                    <NavLink to={`/`} className="white">
                      <span className="logo-single" />
                    </NavLink>
                    <CardTitle className="mb-4">
                      <IntlMessages id="pages.error-title" />
                    </CardTitle>
                    <p className="mb-0 text-muted text-small mb-0">
                      <IntlMessages id="pages.error-code" />
                    </p>
                    <p className="display-1 font-weight-bold mb-5">404</p>
                    <Button
                      href="/account/user"
                      color="primary"
                      className="btn-shadow"
                      size="lg"
                    >
                      <IntlMessages id="pages.go-back-home" />
                    </Button>
                  </div>
                </Card>
              </Colxx>
            </Row>
          </div>
        </main>
      </Fragment> */}
    