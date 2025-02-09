import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/authSlice";
import Post from "./Post";
import PostCard from "./PostCard";
import { Bell, LogOut, MessageCircleCode, PlusSquare, User2 } from "lucide-react";
import NotificationDropdown from "./NotificationDropdown";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const posts = useSelector((state) => state.posts);
  const notifications = useSelector(
    (state) => state.notifications[user?.username] || []
  );
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCreatePostForm, setShowCreatePostForm] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleGreetings = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const handleLogout = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("user");
  };

  return (
    <div className="home-container">
      <header className="header">
        <h2>
          {handleGreetings()}, {user?.username}!
        </h2>
        <div className="header-actions">
          <div className="notification-wrapper">
            <button
              className="header-btn"
              onClick={() => setShowNotifications(!showNotifications)}
              title="Notifications"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="notification-badge">{unreadCount}</span>
              )}
            </button>
            {showNotifications && (
              <NotificationDropdown
                onClose={() => setShowNotifications(false)}
              />
            )}
          </div>

          <div className="create-post-wrapper">
            <button
              className="header-btn"
              title="New Post"
              onClick={() => setShowCreatePostForm(!showCreatePostForm)}
            >
              <PlusSquare size={18} />
            </button>
          </div>

          <button className="header-btn" title="Messages">
            <MessageCircleCode size={18} />
          </button>

          <button className="header-btn" title="Profile">
            <User2 size={18} />
          </button>

          <button className="header-btn" onClick={handleLogout} title="Logout">
            <LogOut size={18} />
          </button>
        </div>
      </header>

      {showCreatePostForm && (
        <Post onClose={() => setShowCreatePostForm(false)} />
      )}

      <div className="posts">
        {posts.length !== 0 ? (
          posts
            .map((post) => <PostCard key={post.id} post={post} user={user} />)
            .reverse()
        ) : (
          <p>No posts found</p>
        )}
      </div>
    </div>
  );
};

export default Home;
