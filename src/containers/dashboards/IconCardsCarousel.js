import React, { Component } from "react";
import IconCard from "../../components/cards/IconCard";
// import data from "../../data/iconCards";
import GlideComponent from "../../components/carousel/GlideComponent";
import { connect } from "react-redux";

// const IconCardsCarousel = ({className="icon-cards-row"}) => {
class IconCardsCarousel extends Component {
  render() {
    const data = [
      { title: 'dashboards.case-stage-new', icon: "iconsminds-clock", value: this.props.dashboardApp.new_case_stages },
      { title: 'dashboards.case-stage-pending', icon: "iconsminds-sand-watch-2", value: this.props.dashboardApp.pending_case_stages },
      { title: 'dashboards.case-stage-complete', icon: "simple-icon-check", value: this.props.dashboardApp.complete_case_stages },
      // { title: 'dashboards.refund-requests', icon: "iconsminds-arrow-refresh", value: 2 },
      { title: 'dashboards.newStudentToday', icon: "iconsminds-student-male", value: this.props.dashboardApp.new_student_today },
      { title: 'dashboards.newStudentWeek', icon: "iconsminds-students", value: this.props.dashboardApp.new_student_week },
    ]
    const className = "icon-cards-row"
    return (
      <div className={className} >
        <GlideComponent settings={
          {
            gap: 5,
            perView: 4,
            type: "carousel",
            breakpoints: {
              320: { perView: 1 },
              576: { perView: 2 },
              1600: { perView: 3 },
              1800: { perView: 4 },
              // 2400: { perView: 5 },
              // 2800: { perView: 6 }
            },
            hideNav: true
          }
        }>
          {data.map((item, index) => {
            return (
              <div key={`icon_card_${index}`}>
                <IconCard {...item} className="mb-4" />
              </div>
            );
          })}
        </GlideComponent>


      </div>
    );
  };
}
// export default ;
const mapStateToProps = ({ dashboardApp }) => {
  return {
    dashboardApp
  };
};
export default connect(
  mapStateToProps,
  {

  }
)(IconCardsCarousel);
