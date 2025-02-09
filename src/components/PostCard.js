import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addCommentAsync,
  deleteCommentAsync,
  deletePostAsync,
  editCommentAsync,
  editPostAsync,
  toggleCommentLikeAsync,
  toggleLikeAsync,
} from "../store/postSlice";
import { MessageCircle, Edit, Trash2, ThumbsUp, Reply } from "lucide-react";
import { addNotification } from "../store/notificationSlice";

const PostCard = ({ post, user }) => {
  const dispatch = useDispatch();
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);

  const toggleLike = () => {
    if (user) {
      const isLiking = !post.likedBy.includes(user.username);

      dispatch(toggleLikeAsync({ postId: post.id, username: user.username }));

      if (isLiking && user.username !== post.author) {
        dispatch(
          addNotification({
            username: post.author,
            message: `${
              user.username
            } liked your post: "${post.content.substring(0, 30)}${
              post.content.length > 30 ? "..." : ""
            }"`,
          })
        );
      }
    }
  };

  const handleReply = () => {
    if (replyText.trim()) {
      dispatch(
        addCommentAsync({
          postId: post.id,
          author: user.username,
          text: replyText,
        })
      );

      if (user.username !== post.author) {
        dispatch(
          addNotification({
            username: post.author,
            message: `${
              user.username
            } commented on your post: "${post.content.substring(0, 30)}${
              post.content.length > 30 ? "..." : ""
            }"`,
          })
        );
      }
      setReplyText("");
      setShowReply(false);
    }
  };

  const toggleReplyLike = (commentId) => {
    if (user) {
      const comment = post.comments.find((c) => c.id === commentId);
      const isLiking = !comment.likedBy.includes(user.username);

      dispatch(
        toggleCommentLikeAsync({
          postId: post.id,
          commentId,
          username: user.username,
        })
      );

      if (isLiking && user.username !== comment.author) {
        dispatch(
          addNotification({
            username: comment.author,
            message: `${
              user.username
            } liked your comment: "${comment.text.substring(0, 30)}${
              comment.text.length > 30 ? "..." : ""
            }"`,
          })
        );
      }
    }
  };

  const editPost = (postId) => {
    const updatedContent = prompt("Edit your post:", `${post.content}`);
    if (updatedContent) {
      dispatch(editPostAsync({ postId, content: updatedContent }));
    }
  };

  const deletePost = (postId) => {
    if (user?.username === post.author) {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this post?"
      );
      if (confirmDelete) {
        dispatch(deletePostAsync({ postId }));
      }
    } else {
      alert("You can only delete your own post.");
    }
  };

  const editComment = (postId, commentId) => {
    const comment = post.comments.find((c) => c.id === commentId);
    if (!comment) return;

    const updatedText = prompt("Edit your comment:", comment.text);
    if (updatedText) {
      dispatch(editCommentAsync({ postId, commentId, text: updatedText }));
    }
  };

  const deleteComment = (commentId) => {
    const comment = post.comments.find((c) => c.id === commentId);
    if (!comment) return;

    if (user?.username === post.author || user?.username === comment.author) {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this comment?"
      );
      if (confirmDelete) {
        dispatch(deleteCommentAsync({ postId: post.id, commentId }));
      }
    } else {
      alert("You can only delete your own comment.");
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const secondsAgo = Math.floor((now - postTime) / 1000);

    if (secondsAgo < 60) return `${secondsAgo}s`;
    const minutesAgo = Math.floor(secondsAgo / 60);
    if (minutesAgo < 60) return `${minutesAgo}m`;
    const hoursAgo = Math.floor(minutesAgo / 60);
    if (hoursAgo < 24) return `${hoursAgo}h`;
    const daysAgo = Math.floor(hoursAgo / 24);
    if (daysAgo < 7) return `${daysAgo}d`;
    const weeksAgo = Math.floor(daysAgo / 7);
    if (weeksAgo < 52) return `${weeksAgo}w`;
    const yearsAgo = Math.floor(weeksAgo / 52);
    return `${yearsAgo}y`;
  };

  const displayedComments = showAllComments
    ? post.comments
    : post.comments.slice(0, 2);

  return (
    <div className="post-card">
      <div className="post-title">
        <p>
          <strong>{post.author + " "}</strong>
          {formatTimeAgo(post.time)}
          {post.isEdited ? " (Edited)" : ""}
        </p>
      </div>
      <p>{post.content}</p>

      <div className="post-actions">
        <button
          onClick={toggleLike}
          title={
            post.likedBy.length > 0 ? post.likedBy.join(", ") : "No likes yet"
          }
        >
          <ThumbsUp
            size={18}
            color={post.likedBy.includes(user?.username) ? "#007bff" : "#333"}
            fill={post.likedBy.includes(user?.username) ? "#007bff" : "none"}
          />
          {post.likes > 0 && <span> {post.likes}</span>}
        </button>

        <button onClick={() => setShowReply(!showReply)}>
          <MessageCircle size={18} color="#333" /> {post.comments.length}
        </button>

        {user?.username === post.author && (
          <>
            <button onClick={() => editPost(post.id)}>
              <Edit size={18} color="#333" /> 
            </button>
            <button onClick={() => deletePost(post.id)}>
              <Trash2 size={18} color="#333" /> 
            </button>
          </>
        )}
      </div>

      {showReply && (
        <div className="reply-box">
          <input
            type="text"
            placeholder="Write a reply..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <button onClick={handleReply}>
            <Reply size={18} />
          </button>
        </div>
      )}

      <div className="comments">
        {displayedComments.map((comment) => (
          <div key={comment.id} className="comment">
            <div className="comment-title">
              <p>
                <strong>{comment.author + " "}</strong>
                {formatTimeAgo(comment.time)}
                {post.author === comment.author ? " • Author" : ""}
                {comment.isEdited ? " (Edited)" : ""}
              </p>
            </div>
            <p>{comment.text}</p>
            <div className="post-actions">
              <button
                className="like-btn"
                onClick={() => toggleReplyLike(comment.id)}
                title={
                  comment.likedBy.length > 0
                    ? comment.likedBy.join(", ")
                    : "No likes yet"
                }
              >
                <ThumbsUp
                  size={18}
                  color={
                    comment.likedBy.includes(user?.username)
                      ? "#007bff"
                      : "#333"
                  }
                  fill={
                    comment.likedBy.includes(user?.username)
                      ? "#007bff"
                      : "none"
                  }
                />
                {comment.likes > 0 && <span> {comment.likes}</span>}
              </button>
              {user?.username === comment.author && (
                <>
                  <button
                    className="delete-btn"
                    onClick={() => editComment(post.id, comment.id)}
                  >
                    <Edit size={18} /> 
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteComment(comment.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}

        {post.comments.length > 3 && (
          <button
            className="view-replies-btn"
            onClick={() => setShowAllComments(!showAllComments)}
          >
            {showAllComments
              ? "Hide Replies"
              : `View More Replies (${post.comments.length - 2})`}
          </button>
        )}
      </div>
    </div>
  );
};

export default PostCard;
