import { createSlice, nanoid } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {}, // Store notifications per user
  reducers: {
    addNotification: (state, action) => {
      const { username, message } = action.payload;
      if (!state[username]) {
        state[username] = [];
      }
      state[username].unshift({
        id: nanoid(),
        message,
        time: new Date().toISOString(),
        read: false,
      });
    },
    markAsRead: (state, action) => {
      const { username, notificationId } = action.payload;
      const userNotifications = state[username] || [];
      const notification = userNotifications.find(
        (n) => n.id === notificationId
      );
      if (notification) {
        notification.read = true;
      }
    },
    markAllAsRead: (state, action) => {
      const { username } = action.payload;
      if (state[username]) {
        state[username].forEach((notification) => {
          notification.read = true;
        });
      }
    },
    clearNotification: (state, action) => {
      const { username, notificationId } = action.payload;
      if (state[username]) {
        state[username] = state[username].filter(
          (n) => n.id !== notificationId
        );
      }
    },
    clearAllNotifications: (state, action) => {
      const { username } = action.payload;
      state[username] = [];
    },
  },
});

export const {
  addNotification,
  markAsRead,
  markAllAsRead,
  clearNotification,
  clearAllNotifications,
} = notificationSlice.actions;
export default notificationSlice;
