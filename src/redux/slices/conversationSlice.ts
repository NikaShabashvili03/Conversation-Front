import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get } from '../../api/conversation';
import { SafeConversation } from '../../types';


interface ConversationState {
  conversation: SafeConversation | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: ConversationState = {
  conversation: null,
  status: 'idle',
};

export const fetchConversation = createAsyncThunk(
  'conversation/fetchConversation',
  async ({ id }: { id: number | null }, { rejectWithValue }) => {
    try {
      const response = await get({
        id: id,
      });

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchConversation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.conversation = action.payload;
      })
      .addCase(fetchConversation.rejected, (state) => {
        state.status = 'failed';
      })
  },
});

// export const { } = conversationSlice.actions;

export default conversationSlice.reducer;
