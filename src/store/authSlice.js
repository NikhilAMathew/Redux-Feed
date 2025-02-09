import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";

const USERS_API_URL = process.env.REACT_APP_USERS_API_URL;

export const fetchUsers = createAsyncThunk("auth/fetchUsers", async () => {
  const response = await fetch(USERS_API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return await response.json();
});

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const usernamePattern = /^[a-zA-Z0-9_]+$/;
      const passwordPattern = /^.{3,}$/;

      if (!usernamePattern.test(username) || !passwordPattern.test(password)) {
        return rejectWithValue("Invalid username or password format.");
      }

      const usersResponse = await fetch(USERS_API_URL);
      if (!usersResponse.ok) {
        throw new Error("Failed to fetch users");
      }
      const users = await usersResponse.json();

      const userExists = users.some((user) => user.username === username);
      if (userExists) {
        return rejectWithValue(
          "Username already exists. Please choose another."
        );
      }

      const newUser = {
        id: nanoid(),
        username,
        password,
      };

      const response = await fetch(USERS_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    user: null,
    users: [],
    error: null,
    loading: false,
  },
  reducers: {
    login(state, action) {
      const { username, password } = action.payload;

      const user = state.users.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        state.isLoggedIn = true;
        state.user = { username: user.username };
        state.error = null;
      } else {
        state.error = "Invalid username or password!";
      }
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
        state.error = null;
        state.successMessage = "Signup successful! Please login...";
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const authActions = authSlice.actions;
export default authSlice;
