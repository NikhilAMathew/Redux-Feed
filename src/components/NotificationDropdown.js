import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  markAllAsRead,
  clearNotification,
  clearAllNotifications,
} from "../store/notificationSlice";
import { Check, Trash2, X } from "lucide-react";

const NotificationDropdown = ({ onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // Get the logged-in user
  const notifications = useSelector(
    (state) => state.notifications[user?.username] || []
  );
  const unreadCount = notifications.filter((n) => !n.read).length;

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const notifTime = new Date(timestamp);
    const secondsAgo = Math.floor((now - notifTime) / 1000);

    if (secondsAgo < 60) return `${secondsAgo}s ago`;
    const minutesAgo = Math.floor(secondsAgo / 60);
    if (minutesAgo < 60) return `${minutesAgo}m ago`;
    const hoursAgo = Math.floor(minutesAgo / 60);
    if (hoursAgo < 24) return `${hoursAgo}h ago`;
    const daysAgo = Math.floor(hoursAgo / 24);
    return `${daysAgo}d ago`;
  };

  return (
    <div className="notification-dropdown">
      <div className="notification-header">
        <h3>Notifications {unreadCount > 0 && `(${unreadCount})`}</h3>
        <div className="notification-actions">
          {notifications.length > 0 && (
            <>
              <button
                className="action-btn"
                onClick={() =>
                  dispatch(markAllAsRead({ username: user?.username }))
                }
                title="Mark all as read"
              >
                <Check size={16} />
              </button>
              <button
                className="action-btn"
                onClick={() =>
                  dispatch(clearAllNotifications({ username: user?.username }))
                }
                title="Clear all notifications"
              >
                <Trash2 size={16} />
              </button>
            </>
          )}
          <button className="action-btn" onClick={onClose} title="Close">
            <X size={16} />
          </button>
        </div>
      </div>
      <div className="notification-list">
        {notifications.length === 0 ? (
          <p className="no-notifications">No notifications</p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-item ${
                !notification.read ? "unread" : ""
              }`}
            >
              <p>{notification.message}</p>
              <span className="notification-time">
                {formatTimeAgo(notification.time)}
              </span>
              <button
                className="delete-notification"
                onClick={() =>
                  dispatch(
                    clearNotification({
                      username: user?.username,
                      notificationId: notification.id,
                    })
                  )
                }
              >
                <X size={14} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;
