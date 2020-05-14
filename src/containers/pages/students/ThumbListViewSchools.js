import React, { Component, Fragment } from "react";
import {
  Card,
  CardText,
  CardBody,
  Badge,
  Button,
  Collapse,
  Table,
  Row
} from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import { ContextMenuTrigger } from "react-contextmenu";
import { Colxx } from "../../../components/common/CustomBootstrap";
import StudentSchoolsTooltip from "./StudentSchoolsTooltip.js";
import moment from "moment";
import { connect } from "react-redux";
import DeleteSchoolModal from "./DeleteSchoolModal.js"


class ThumbListViewSchools extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteSchoolModalOPen: false
    };
  }

  toggleDeleteSchoolModal = () => {
    // if (experience) {
    //   this.setState({
    //     experience: experience
    //   })
    // }
    this.setState(prevState => ({
      deleteSchoolModalOPen: !prevState.deleteSchoolModalOPen
    }));
  };

  render() {
    const { deleteSchoolModalOPen } = this.state;
    const {
      schoolIndexId,
      product,
      isSelect,
      collect,
      onCheckItem,
      onSubmitMentorAlign,
      onViewMentor,
      onSubmitApplication,
      currentStudent,
      toggleEssay,
      toggleEssayVersion,
      essayReviewStatus
    } = this.props;
    return (
      <Colxx xxs="12" key={schoolIndexId} className="mb-3">
        <ContextMenuTrigger
          id="menu_id"
          data={product.user_id}
          collect={collect}
        >
          <Card
            className={classnames("d-flex flex-row", {
              active: isSelect
            })}
          >
            <CardBody>
              <div className="row schools-in-student-profile">
                <NavLink
                  onClick={event =>
                    onCheckItem(event, product.student_case_school_id)
                  }
                  to={`/app/students/details/?p=${currentStudent}`}
                  className="d-flex"
                >
                  <img
                    alt={product.school_name}
                    src={
                      product.school_logo
                        ? "https://s3.ap-south-1.amazonaws.com/akshay/school-logo/" +
                        product.school_logo // Use object with 'uri'
                        : "https://postsales.s3.ap-south-1.amazonaws.com/default_image.png"
                    }
                    // className="list-thumbnail responsive border-0 card-img-left student_thum_list"
                    className="list-thumbnail responsive border-0 card-img-left student_thum_list"
                  />
                </NavLink>
                <NavLink
                  to={`/app/students/details/?p=${currentStudent}`}
                  className="pl-2 d-flex flex-grow-1 min-width-zero"
                >
                  <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                    <div className="min-width-zero w-25 w-sm-100">
                      <div
                        onClick={event =>
                          onCheckItem(event, product.student_case_school_id)
                        }

                      >
                        <p className="list-item-heading mb-1 truncate">
                          {product.school_name}
                        </p>
                      </div>
                      {/* <a
                        rel="noopener noreferrer"
                        target="_blank">
                        <CardSubtitle className="truncate mb-1">asdfasdfasf</CardSubtitle>
                      </a> */}
                      <CardText className="text-muted text-small mb-2">
                        {product.program}
                      </CardText>
                    </div>

                    <p
                      onClick={event =>
                        onCheckItem(event, product.student_case_school_id)
                      }
                      className="mb-1 text-muted text-small w-15 w-sm-100"
                    >
                      {product.round}
                    </p>
                    <p
                      onClick={event =>
                        onCheckItem(event, product.student_case_school_id)
                      }
                      className="mb-1 text-muted text-small w-15 w-sm-100"
                    >
                      {product.intake}
                    </p>
                    {/* <p onClick={event => onCheckItem(event, product.student_case_school_id)}  className="mb-1 text-muted text-small w-15 w-sm-100">
                      {product.email}
                    </p> */}
                    <div
                      onClick={event =>
                        onCheckItem(event, product.student_case_school_id)
                      }
                      className="w-15 w-sm-100 mb-2"
                    >
                      {product.status === "Completed" ?
                        (<Badge color="outline-success" pill>
                          {product.status}
                        </Badge>)
                        :
                        (<Badge color="outline-primary" pill>
                          {product.status}
                        </Badge>)

                      }

                    </div>
                    <p
                      onClick={event =>
                        onCheckItem(event, product.student_case_school_id)
                      }
                      className="mb-1 text-muted text-small w-15 w-sm-100 "
                    >
                      {product.deadline
                        ? "Deadline : " +
                        moment(product.deadline).format("DD MMM YYYY")
                        : ""}
                    </p>
                    {product.status !== "Completed" ?
                      <div className="school-icons-in-student-profile">
                        <Row>
                          <div>
                            <StudentSchoolsTooltip
                              // sizeofButton={'xs'}
                              id={schoolIndexId + "view-notes"}
                              item={{
                                placement: "top", text: "view-notes",
                                icon: "simple-icon-book-open",
                                body: product.additional_notes
                              }}
                            />
                          </div>
                          <div className="">
                            {product.mentor_id ? (
                              <StudentSchoolsTooltip
                                // sizeofButton={'xs'}
                                id={schoolIndexId + "update-mentor"}
                                item={{
                                  placement: "top", text: "update-mentor",
                                  icon: "simple-icon-pencil",
                                  body: product.user_fname + " " + product.user_lname + " "
                                }}
                                onClick={event =>
                                  onViewMentor(
                                    event,
                                    product.student_case_school_id,
                                    true
                                    , product.mentor_id
                                  )
                                }
                              />
                              // <StudentSchoolsTooltip
                              //   // sizeofButton={'xs'}
                              //   id={schoolIndexId + "update-mentor"}
                              //   item={{
                              //     placement: "top", text: "update-mentor",
                              //     icon: "simple-icon-pencil",
                              //     body: product.user_fname + " " + product.user_lname + " "
                              //   }}
                              //   onClick={event =>
                              //     onSubmitMentorAlign(
                              //       event,
                              //       product.student_case_school_id,
                              //       true
                              //     )
                              //   }
                              // />
                            ) : (
                                <StudentSchoolsTooltip
                                  id={schoolIndexId + "align-a-mentor"}
                                  item={{
                                    placement: "top", text: "align-a-mentor",
                                    icon: "simple-icon-user-follow",
                                    body: "Align a Mentor"
                                  }}
                                  onClick={event =>
                                    onSubmitMentorAlign(
                                      event,
                                      product.student_case_school_id,
                                      false
                                    )
                                  }
                                />
                              )}
                          </div>
                          {/* )} */}
                          <div>
                            <StudentSchoolsTooltip
                              // sizeofButton={'xs'}
                              id={schoolIndexId + "delete-school"}
                              item={{
                                placement: "top", text: "delete-school",
                                icon: "simple-icon-trash",
                                body: "Delete School"
                              }}
                              onClick={this.toggleDeleteSchoolModal}
                            />
                            <DeleteSchoolModal
                              schools={product}
                              modalOpen={deleteSchoolModalOPen}
                              toggleModal={this.toggleDeleteSchoolModal}
                            />
                          </div>
                          <div className="">
                            {product.status === "Completed" ? (
                              <div>
                                <StudentSchoolsTooltip
                                  // sizeofButton={'xs'}
                                  id={schoolIndexId + "application-submitted"}
                                  item={{
                                    placement: "top", text: "application-submitted",
                                    icon: "simple-icon-check",
                                    body: "Application Submitted"
                                  }}
                                />
                              </div>
                            ) : (
                                <StudentSchoolsTooltip
                                  // sizeofButton={'xs'}
                                  id={schoolIndexId + "submit-application"}
                                  item={{
                                    placement: "top", text: "submit-application",
                                    icon: "simple-icon-login",
                                    body: "Submit Application"
                                  }}
                                  onClick={event =>
                                    onSubmitApplication(
                                      event,
                                      product.student_case_school_id
                                    )
                                  }
                                />
                              )}
                          </div>
                        </Row>
                      </div>
                      :
                      <div className="school-icons-in-student-profile">
                        <div>
                          <StudentSchoolsTooltip
                            id={schoolIndexId + "view-notes"}
                            item={{
                              placement: "top", text: "view-notes",
                              icon: "simple-icon-book-open",
                              body: product.additional_notes
                            }}
                          />
                        </div>
                      </div>
                    }
                  </div>
                </NavLink>
              </div>
              <Collapse isOpen={isSelect}>
                {product.school_essay && product.school_essay.length > 0 && (
                  <Fragment>
                    {product.status !== "Completed" &&
                      essayReviewStatus !== "New" &&
                      essayReviewStatus !== "Complete" && (
                        <div className=" table-top-buttons">
                          <Button
                            size="xs"
                            color="primary"
                            className="mb-2"
                            onClick={event =>
                              toggleEssay(event, product.student_case_school_id)
                            }
                          >
                            <i className="simple-icon-plus" /> {" Add Essay"}
                          </Button>
                        </div>
                      )}
                    <Table striped>

                      <thead>
                        <tr>
                          {/* <th>#</th> */}
                          <th>Title</th>
                          <th>Word Limit</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {product.school_essay.map((essay, indx) => {
                          return (
                            <tr key={indx}>
                              {/* <th scope="row"> {indx + 1}</th> */}
                              <th scope="row"> {essay.essay_title}</th>
                              <td> {essay.word_limit}</td>

                              <td>
                                {" "}
                                <Button
                                  size="xs"
                                  color="primary"
                                  className="mb-2"
                                  onClick={event =>
                                    toggleEssayVersion(
                                      event,
                                      essay.student_case_school_essay_id,
                                      product.status
                                    )
                                  }
                                >
                                  <i className="iconsminds-upload-1" />
                                  {product.status !== "Completed"
                                    ? "Upload"
                                    : "View"}
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </Fragment>

                )}
                {!product.school_essay && (
                  <div className="align-center">
                    {product.status !== "Completed" ? (
                      <div>
                        {essayReviewStatus === "Complete" ? (
                          <p className="mb-1 text-muted ">
                            Process Already Completed
                          </p>
                        ) : (
                            <p className="mb-1 text-muted ">
                              No Essay Found Please Add one
                          </p>
                          )}
                        {essayReviewStatus !== "New" &&
                          essayReviewStatus !== "Complete" && (
                            <Button
                              onClick={event =>
                                toggleEssay(
                                  event,
                                  product.student_case_school_id
                                )
                              }
                              color="primary"
                              size="xs"
                              className="mb-2 "
                            >
                              <i className="simple-icon-plus" /> Add New Essay
                            </Button>
                          )}
                      </div>
                    ) : (
                        <p className="mb-1 text-muted ">No Essay Found</p>
                      )}
                  </div>
                )}
              </Collapse>
            </CardBody>
          </Card>
        </ContextMenuTrigger>
      </Colxx>
    );
  }
}
/* React.memo detail : https://reactjs.org/docs/react-api.html#reactpurecomponent  */
// export default React.memo();
const mapStateToProps = ({ studentApp }) => {
  return {
    studentApp
  };
};

export default connect(
  mapStateToProps,
  {}
)(ThumbListViewSchools);
