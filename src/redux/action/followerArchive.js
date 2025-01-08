import { createSlice } from "@reduxjs/toolkit";
import { followerArchiveAPI } from "../../services/followerArchiveStatus";

const data = {
  isLoading: false,
  error: "",
  message: "",
  data: null,
};

const followerArchiveSlice = createSlice({
  name: "followerArchive",
  initialState: data,
  reducers: {
    followerArchiveInfo(state) {
      state.isLoading = true;
    },
    followerArchiveSuccess(state, action) {
      state.isLoading = false;
      state.data = action.payload;
      state.message = "";
    },
    followerArchiveFailure(state, action) {
      state.isLoading = false;
      state.message = action.payload;
      state.data = null;
    },
    followerArchiveReset(state) {
      state.isLoading = false;
      state.message = "";
      state.data = null;
      state.error = "";
    },
  },
});

export const followerArchiveHandler = (data) => async (dispatch) => {
  try {
    dispatch(followerArchiveAction.followerArchiveInfo());
    const response = await followerArchiveAPI(data);
    dispatch(followerArchiveAction.followerArchiveSuccess(response));
  } catch (e) {
    dispatch(followerArchiveAction.followerArchiveFailure(e));
  }
};
export default followerArchiveSlice.reducer;
export const followerArchiveAction = followerArchiveSlice.actions;
