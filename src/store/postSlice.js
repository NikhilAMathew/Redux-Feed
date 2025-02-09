import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const POSTS_API_URL = process.env.REACT_APP_POSTS_API_URL;

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(POSTS_API_URL);
  return response.data;
});

export const addPostAsync = createAsyncThunk(
  "posts/addPost",
  async (postData) => {
    const newPost = {
      id: nanoid(),
      content: postData.content,
      time: new Date().toISOString(),
      author: postData.author,
      likes: 0,
      likedBy: [],
      comments: [],
    };
    const response = await axios.post(POSTS_API_URL, newPost);
    return response.data;
  }
);

export const toggleLikeAsync = createAsyncThunk(
  "posts/toggleLike",
  async ({ postId, username }) => {
    const response = await axios.get(`${POSTS_API_URL}/${postId}`);
    const post = response.data;

    if (post.likedBy.includes(username)) {
      post.likes -= 1;
      post.likedBy = post.likedBy.filter((user) => user !== username);
    } else {
      post.likes += 1;
      post.likedBy.push(username);
    }

    const updateResponse = await axios.put(`${POSTS_API_URL}/${postId}`, post);
    return updateResponse.data;
  }
);

export const editPostAsync = createAsyncThunk(
  "posts/editPost",
  async ({ postId, content }) => {
    const response = await axios.get(`${POSTS_API_URL}/${postId}`);
    const post = response.data;
    post.content = content;
    post.isEdited = true;

    const updateResponse = await axios.put(`${POSTS_API_URL}/${postId}`, post);
    return updateResponse.data;
  }
);

export const deletePostAsync = createAsyncThunk(
  "posts/deletePost",
  async ({ postId }) => {
    await axios.delete(`${POSTS_API_URL}/${postId}`);
    return postId;
  }
);

export const addCommentAsync = createAsyncThunk(
  "posts/addComment",
  async ({ postId, author, text }) => {
    const response = await axios.get(`${POSTS_API_URL}/${postId}`);
    const post = response.data;

    const newComment = {
      id: nanoid(),
      author,
      time: new Date().toISOString(),
      text,
      likes: 0,
      likedBy: [],
    };

    post.comments.push(newComment);
    const updateResponse = await axios.put(`${POSTS_API_URL}/${postId}`, post);
    return updateResponse.data;
  }
);

export const toggleCommentLikeAsync = createAsyncThunk(
  "posts/toggleCommentLike",
  async ({ postId, commentId, username }) => {
    const response = await axios.get(`${POSTS_API_URL}/${postId}`);
    const post = response.data;

    const comment = post.comments.find((c) => c.id === commentId);
    if (comment) {
      if (comment.likedBy.includes(username)) {
        comment.likes -= 1;
        comment.likedBy = comment.likedBy.filter((user) => user !== username);
      } else {
        comment.likes += 1;
        comment.likedBy.push(username);
      }
    }

    const updateResponse = await axios.put(`${POSTS_API_URL}/${postId}`, post);
    return updateResponse.data;
  }
);

export const editCommentAsync = createAsyncThunk(
  "posts/editComment",
  async ({ postId, commentId, text }) => {
    const response = await axios.get(`${POSTS_API_URL}/${postId}`);
    const post = response.data;

    const comment = post.comments.find((c) => c.id === commentId);
    if (comment) {
      comment.text = text;
      comment.isEdited = true;
    }

    const updateResponse = await axios.put(`${POSTS_API_URL}/${postId}`, post);
    return updateResponse.data;
  }
);

export const deleteCommentAsync = createAsyncThunk(
  "posts/deleteComment",
  async ({ postId, commentId }) => {
    const response = await axios.get(`${POSTS_API_URL}/${postId}`);
    const post = response.data;

    post.comments = post.comments.filter((comment) => comment.id !== commentId);

    const updateResponse = await axios.put(`${POSTS_API_URL}/${postId}`, post);
    return updateResponse.data;
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addPostAsync.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(toggleLikeAsync.fulfilled, (state, action) => {
        const index = state.findIndex((post) => post.id === action.payload.id);
        if (index !== -1) {
          state[index] = action.payload;
        }
      })
      .addCase(editPostAsync.fulfilled, (state, action) => {
        const index = state.findIndex((post) => post.id === action.payload.id);
        if (index !== -1) {
          state[index] = action.payload;
        }
      })
      .addCase(deletePostAsync.fulfilled, (state, action) => {
        return state.filter((post) => post.id !== action.payload);
      })
      .addCase(addCommentAsync.fulfilled, (state, action) => {
        const index = state.findIndex((post) => post.id === action.payload.id);
        if (index !== -1) {
          state[index] = action.payload;
        }
      })
      .addCase(toggleCommentLikeAsync.fulfilled, (state, action) => {
        const index = state.findIndex((post) => post.id === action.payload.id);
        if (index !== -1) {
          state[index] = action.payload;
        }
      })
      .addCase(editCommentAsync.fulfilled, (state, action) => {
        const index = state.findIndex((post) => post.id === action.payload.id);
        if (index !== -1) {
          state[index] = action.payload;
        }
      })
      .addCase(deleteCommentAsync.fulfilled, (state, action) => {
        const index = state.findIndex((post) => post.id === action.payload.id);
        if (index !== -1) {
          state[index] = action.payload;
        }
      });
  },
});

export default postSlice;
