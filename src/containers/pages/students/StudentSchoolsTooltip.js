import React from "react";
import { Button, Tooltip } from "reactstrap";

class StudentSchoolsTooltip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tooltipOpen: false
    };
  }
  toggle = () => {
    this.setState(prevState => ({
      tooltipOpen: !prevState.tooltipOpen
    }));
  };

  render() {
    return (
      <span>
        <Button
            outline
            color = {this.props.item.text==="delete-school" ? "danger" : "primary"}
            id={"Tooltip-" + this.props.id}
            size={ this.props.sizeofButton }
            onClick={this.props.onClick}
            // size={(this.props.sizeofButton) ? this.props.sizeofButton : ''}
        >   
                <i className={this.props.item.icon} />
        </Button>
        <Tooltip
          placement={this.props.item.placement}
          isOpen={this.state.tooltipOpen}
          target={"Tooltip-" + this.props.id}
          toggle={this.toggle}
        >
          {this.props.item.body}
        </Tooltip>
      </span>
    );
  }
}
export default StudentSchoolsTooltip;
