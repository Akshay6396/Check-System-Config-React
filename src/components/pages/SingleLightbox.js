import React, { Component, Fragment } from "react";
import Lightbox from "react-image-lightbox";

class SingleLightbox extends Component {
  constructor(props) {
    super(props);
    this.onThumbClick = this.onThumbClick.bind(this);
    this.state = {
      photoIndex: 0,
      isOpen: false
    };
  }

  onThumbClick(e) {
    e.preventDefault();
    this.setState({ isOpen: true });
  }

  render() {
    const { isOpen } = this.state;
    return (
      <Fragment>
        <a href="null" onClick={e => this.onThumbClick(e)}>
          <img
            src={this.props.thumb}
            alt="thumbnail"
            className={this.props.className}
          />
        </a>

        {isOpen && (
          <Lightbox
            mainSrc={this.props.large}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </Fragment>
    );
  }
}

export default SingleLightbox;
