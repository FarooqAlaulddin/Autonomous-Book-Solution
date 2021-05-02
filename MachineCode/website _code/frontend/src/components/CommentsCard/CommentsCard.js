import React, { Component } from "react";
import {CommentCard} from "components";

export default class CommentsCard extends Component {

  render() {

    if(typeof this.props.comments !== 'undefined' && this.props.comments.length > 0){
      return <CommentCard comments={this.props.comments} />;
    }else{
      return <div>Do you want to be the first to comment?</div>
    }
  }
}
