import React, { Component } from "react";
import { connect } from "react-redux";
import { Progress } from "reactstrap";

class StudentCaseScores extends Component {
  render() {
    const { Score } = this.props;

    return (

      <div >
        <p className="mb-2">
          {Score.score_name + " Score"}
          <span className="float-right text-muted">
            {Score.score_value}/{(Score.max_score_value) ? Score.max_score_value : 100}
          </span>
        </p>
        <Progress
          value={(Score.score_value / ((Score.max_score_value) ? Score.max_score_value : 100)) * 100}
        />
      </div>
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
)(StudentCaseScores);