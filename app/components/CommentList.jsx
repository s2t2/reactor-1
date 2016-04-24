import React from 'react';
var Comment = require("./Comment.jsx");

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.comments.sort(function(a,b){
      return b.id - a.id; // sorts descending
    }).map(function(comment) {
      return (
        <Comment author={comment.author} key={comment.id}>
          {comment.text}
        </Comment>
      );
    });

    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

module.exports = CommentList;
