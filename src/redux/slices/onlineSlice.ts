import { createSlice} from '@reduxjs/toolkit';


interface OnlineState {
  members: number[];
}

const initialState: OnlineState = {
  members: [],
};


const onlineSlice = createSlice({
  name: 'online',
  initialState,
  reducers: {
    addOnline: (state, action) => {
      state.members = [...state.members, action.payload]
    },
    removeOnline: (state, action) => {
      state.members = state.members.filter((memberId) => memberId !== action.payload)
    },
  },
  extraReducers: () => {
    
  },
});

export const { removeOnline, addOnline } = onlineSlice.actions;

export default onlineSlice.reducer;
