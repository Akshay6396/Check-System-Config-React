import React, { Component } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";

// import IntlMessages from "../../../helpers/IntlMessages";

// import { comments } from "../../../data/comments";
// import Rating from "../../../components/common/Rating";
import { connect } from "react-redux";
import moment from "moment";

class FitmentComments extends Component {

  render() {
    const className = "mb-4";
    const { stageHistory } = this.props.studentApp;
    // const displayRate = false
    return (
      <Card className={className}>
        <CardBody>
          <CardTitle>History</CardTitle>
          <div className="dashboard-list-with-user">
            <PerfectScrollbar
              options={{ suppressScrollX: true, wheelPropagation: false }}
            >
              {stageHistory.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="d-flex flex-row mb-3 pb-3 border-bottom"
                  >
                    <div>
                      <img
                        src={item.photo}
                        alt={item.title}
                        className="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall"
                      />
                    </div>

                    <div className="pl-3 pr-2">
                      <div>
                        <p className="font-weight-medium mb-0">
                          {item.user_fname + " " + item.user_lname}
                        </p>
                        <p className="text-muted mb-0 text-small">
                          {"Comment : " + item.comments}
                        </p>
                        <div className=" row anchor_history text-muted mb-0 text-small">
                          <a
                            rel="noopener noreferrer"
                            className="anchor_history_color"
                            target="_blank"
                            href={item.document_url}
                          >
                            <p>
                              {item.document_type +
                                " v" +
                                (stageHistory.length - index)}
                            </p>
                          </a>
                          <p>
                            {" | " +
                              moment(item.updated_at).format(
                                "DD MMM YYYY hh:mm:ss A"
                              )}
                          </p>
                        </div>
                        {/* <Button color="primary" size="xs" className="mb-2">
                          {'Download'}
                        </Button>{" "} */}
                      </div>
                    </div>
                  </div>
                );
              })}
            </PerfectScrollbar>
          </div>
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
  {
    // addStudent
  }
)(FitmentComments);
// export default ;
