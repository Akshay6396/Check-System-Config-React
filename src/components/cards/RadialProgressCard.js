import React from "react";
import { Card, CardBody, CardTitle, CardHeader } from "reactstrap";
import { CircularProgressbar } from "react-circular-progressbar";
import {
  Button
} from "reactstrap";

const RadialProgressCard = ({
  title = "title",
  percent = 50,
  score_id = 0,
  isSortable = false,
  text = ""
}) => {
  return (
    <Card>
      <div className="position-absolute update-score-button">
          <Button
            outline
            color={"black"}
            // onClick={() => this.toggleUpdateScoreModal(score_id)}
            className="icon-button"
          >
            <i className="simple-icon-pencil" />
          </Button>
        </div>
        <div className="position-absolute delete-score-button">
          <Button
            outline
            color={"danger"}
            className="close"
            // onClick={() => this.toggleDeleteScoreModal(score_id)}
          >
            <i className="simple-icon-trash delete-button" />
          </Button>
        </div>
      {isSortable && (
        <CardHeader className="p-0 position-relative">
          <div className="position-absolute handle card-icon">
            <i className="simple-icon-shuffle" />
          </div>
        </CardHeader>
      )}
      <CardBody className="d-flex justify-content-between align-items-center">
        <CardTitle className="mb-0">{title}</CardTitle>
        <div className="progress-bar-circle">
          <CircularProgressbar
            strokeWidth={4}
            value={percent}
            text={`${text}`}
          />
        </div>
      </CardBody>
    </Card>
  );
};
export default RadialProgressCard;
