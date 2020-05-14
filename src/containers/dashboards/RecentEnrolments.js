import React from "react";
import { NavLink } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Card, CardBody, CardTitle, Badge } from "reactstrap";

import IntlMessages from "../../helpers/IntlMessages";
// import data from "../../data/products";
import moment from "moment";

export default function RecentEnrolments({ recentEnrolments }) {
  return (
    <Card>
      <div className="position-absolute card-top-buttons">
        <button className="btn btn-header-light icon-button">
          <i className="simple-icon-refresh" />
        </button>
      </div>
      <CardBody>
        <CardTitle>
          <IntlMessages id="dashboards.recent-enrolments" />
        </CardTitle>
        <div className="scroll dashboard-list-with-thumbs">
          <PerfectScrollbar
            options={{ suppressScrollX: true, wheelPropagation: false }}
          >
            {recentEnrolments.map((student, index) => {
              return (
                <div key={index} className="d-flex flex-row mb-3">
                  <NavLink
                    to={`/app/students/details/?p=${student.user_id}`} 
                    className="d-block position-relative"
                  >
                    <img

                      alt={student.user_fname}
                      src={student.photo
                        ? student.photo                      // Use object with 'uri'
                        : "https://postsales.s3.ap-south-1.amazonaws.com/default_image.png"}
                      className="list-thumbnail responsive border-0 student_thum_list "

                    />
                    <Badge
                      key={index}
                      className="position-absolute badge-top-right"
                      color={student.statusColor}
                      pill
                    >
                      {student.status}
                    </Badge>
                  </NavLink>

                  <div className="pl-3 pt-2 pr-2 pb-2">
                    <NavLink  to={`/app/students/details/?p=${student.user_id}`} >
                      <p className="list-item-heading">{student.user_fname + ' ' + student.user_lname}</p>
                      <div className="pr-4">
                        <p className="text-muted mb-1 text-small">
                          {student.mobile}
                        </p>
                        <p className="text-muted mb-1 text-small">
                          {student.email}
                        </p>
                      </div>
                      <div className="text-primary text-small font-weight-medium d-none d-sm-block">
                        {/* {moment(student.created_at).format('DD MMM YYYY')} */}
                        {moment(student.created_at).utc().format('DD MMM YYYY hh:mm:ss A')}

                      </div>
                    </NavLink>
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
