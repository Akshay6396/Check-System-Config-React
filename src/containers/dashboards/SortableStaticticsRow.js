import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, CardBody, CardTitle, Progress, Button } from "reactstrap";
import UpdateScoreModal from "./UpdateScoreModal.js"
import DeleteScoreModal from "./DeleteScoreModal.js"

class SortableStaticticsRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updateScoreModalOpen: false,
      deleteScoreModalOpen: false
    };
  }

  toggleUpdateScoreModal = (score) => {
    if (score) {
      this.setState({
        score: score
      })
    }
    this.setState(prevState => ({
      updateScoreModalOpen: !prevState.updateScoreModalOpen
    }));
  };

  toggleDeleteScoreModal = (score) => {
    if (score) {
      this.setState({
        score: score
      })
    }
    this.setState(prevState => ({
      deleteScoreModalOpen: !prevState.deleteScoreModalOpen
    }));
  };

  render() {
    const { updateScoreModalOpen, deleteScoreModalOpen } = this.state
    const { studentDetails } = this.props.studentApp;
    return (
      <Card >
        <CardBody>
          <CardTitle>Scores</CardTitle>
          {studentDetails.student_cases &&
            studentDetails.student_cases[0].case_scores ?
            studentDetails.student_cases[0].case_scores.map((career, index) => {
              return (
                <div key={index} className="mb-4 position-relative">
                  <div className="mb-2">
                    {career.score_name + " Score"}
                    <span className="position-absolute text-muted score-in-student-profile">
                      {career.score_value}/{(career.max_score_value) ? career.max_score_value : 100}
                    </span>
                    <div className="position-absolute update-score-button">
                      <Button
                        outline
                        color={"black"}
                        onClick={()=>this.toggleUpdateScoreModal(career)}
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
                        onClick={() => this.toggleDeleteScoreModal(career)}
                      >
                        <i className="simple-icon-trash delete-button" />
                      </Button>
                    </div>
                    <UpdateScoreModal
                      score={this.state.score}
                      modalOpen={updateScoreModalOpen}
                      toggleModal={()=>this.toggleUpdateScoreModal()}
                    />
                    <DeleteScoreModal
                      score={this.state.score}
                      modalOpen={deleteScoreModalOpen}
                      toggleModal={this.toggleDeleteScoreModal}
                    />
                  </div>
                  <Progress
                    value={(career.score_value / ((career.max_score_value) ? career.max_score_value : 100)) * 100}
                  />
                </div>
              );
            }
            ) :
            "No Score Found"
          }
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
)(SortableStaticticsRow);