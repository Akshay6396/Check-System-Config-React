import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { injectIntl } from "react-intl";
import {
    Card,
    CardBody,
    // InputGroup,
    // InputGroupAddon,
    // Input,
    // Button
} from "reactstrap";
import SingleLightbox from "../../components/pages/SingleLightbox";
import VideoPlayer from "../../components/common/VideoPlayer";
import CommentWithLikes from "../../components/pages/CommentWithLikes";
import moment from "moment";

class Post extends Component {

    constructor(props) {

        super(props);
        this.renderContent = this.renderContent.bind(this);
        this.renderLikeAndCommentCount = this.renderLikeAndCommentCount.bind(this);
    }

    renderContent() {
        if (this.props.data.type === "image") {
            return <SingleLightbox thumb={this.props.data.image} large={this.props.data.image} className="img-fluid border-0 border-radius mb-3" />
        } else if (this.props.data.type === "video") {
            return (
                <VideoPlayer autoplay={false} controls={true} className="video-js card-img video-content mb-3" poster={this.props.data.image}
                    sources={[{
                        src: this.props.data.video,
                        type: 'video/mp4'
                    }]} />)
        }
    }

    renderLikeAndCommentCount() {

        const { messages } = this.props.intl;
        return (
            <div className="mb-3">
                <div className="post-icon mr-3 d-inline-block">
                    <NavLink to="#">
                        <i className="simple-icon-heart mr-1"></i>
                    </NavLink>
                    <span>12 {messages["pages.likes"]}</span>
                </div>

                <div className="post-icon mr-3 d-inline-block">
                    <NavLink to="#">
                        <i className="simple-icon-bubble mr-1"></i>
                    </NavLink>
                    <span>6 {messages["pages.comments-title"]}</span>
                </div>
            </div>
        );
    }

    renderComments() {
        return (
            this.props.data.comments.map((item, index) => {
                return (<CommentWithLikes data={item} key={index}></CommentWithLikes>);
            })
        )
    }

    render() {
        const Today = moment(new Date())
        const UpdateDate = moment(new Date(this.props.data.created_time))
        let updateText;

        // const { messages } = this.props.intl;
        if (Today.diff(UpdateDate, 'hours') < 1) {
            if (Today.diff(UpdateDate, 'minutes') < 1) {
                updateText = "Just Now"
            } else {
                updateText = <p className="text-muted mb-0 text-small">{Today.diff(UpdateDate, 'minutes') + " minutes ago"}</p>;
            }

        }
        else if (Today.diff(UpdateDate, 'hours') < 24 && Today.diff(UpdateDate, 'hours') >= 1) {
            updateText = <p className="text-muted mb-0 text-small">{Today.diff(UpdateDate, 'hours') + " hours ago"}</p>;
        } else if (Today.diff(UpdateDate, 'hours') > 24 && Today.diff(UpdateDate, 'days') <= 30) {
            updateText = <p className="text-muted mb-0 text-small">{Today.diff(UpdateDate, 'days') + " days ago"}</p>;
        } else {
            updateText = <p className="text-muted mb-0 text-small">{Today.diff(UpdateDate, 'month') + " month ago"}</p>;
        }
        return (
            <Card className={this.props.className}>
                <CardBody>
                    <div className="d-flex flex-row mb-3">
                        <img src={(this.props.data.photo) ? this.props.data.photo : "https://postsales.s3.ap-south-1.amazonaws.com/default_image.png"} alt="thumbnail" className="img-thumbnail border-0 rounded-circle list-thumbnail align-self-center xsmall" />
                        <div className="pl-3">
                            <p className="font-weight-medium mb-0 ">{(this.props.data.updated_by_lname) ? this.props.data.updated_by_fname + ' ' + this.props.data.updated_by_lname : this.props.data.updated_by_fname}</p>
                            {updateText}
                        </div>
                    </div>
                    <span>
                        {/* <td dangerouslySetInnerHTML={{ __html: this.props.data.case_note }} /> */}
                        <p dangerouslySetInnerHTML={{ __html: this.props.data.case_note }} />
                    </span>
                    {this.renderContent()}
                </CardBody>
            </Card>
        );
    }
}

export default injectIntl(Post);