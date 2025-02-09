import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPostAsync } from "../store/postSlice";
import { Image, Paperclip } from "lucide-react";

const Post = () => {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handlePost = () => {
    if (content.trim()) {
      dispatch(addPostAsync({ content, author: user.username }));
      setContent("");
    }
  };

  return (
    <div className="post-box">
      <h3>New Post</h3>
      <textarea
        placeholder="Post your 3AM thoughts here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
        <div className="upload">
          <div className="post-actions">
          <button>
            <Image size={18} />
          </button>
          <button>
            <Paperclip size={18} />
          </button>
        </div>
        <button className="post-btn" onClick={handlePost}>Post</button>
      </div>
    </div>
  );
};

export default Post;
