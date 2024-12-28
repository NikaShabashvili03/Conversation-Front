import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { all } from '../../api/conversationFeed';
import { SafeConversation } from '../../types';


interface ConversationFeedState {
  groups: SafeConversation[];
  conversations: SafeConversation[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: ConversationFeedState = {
  groups: [],
  conversations: [],
  status: 'idle',
};


export const fetchGroupConversationFeed = createAsyncThunk(
  'conversationFeed/fetchGroupConversationFeed',
  async (_, { rejectWithValue }) => {
    try {
      const response = await all({
        isGroup: true,
      });

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchConversationFeed = createAsyncThunk(
    'conversationFeed/fetchConversationFeed',
    async (_, { rejectWithValue }) => {
      try {
        const response = await all({
          isGroup: false,
        });
  
        return response;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
);

const conversationFeedSlice = createSlice({
  name: 'conversationFeed',
  initialState,
  reducers: {
    updateGroup: (state, action) => {
      const updatedGroup = action.payload; 
      const index = state.groups.findIndex(group => group.id === updatedGroup.id);

      if (index !== -1) {
        state.groups[index] = { ...state.groups[index], ...updatedGroup };
      }
    },
    updateConversation: (state, action) => {
      const updatedConversation = action.payload;
      const index = state.conversations.findIndex(convo => convo.id === updatedConversation.id);

      if (index !== -1) {
        state.conversations[index] = { ...state.conversations[index], ...updatedConversation };
      }
    },
    addGroup: (state, action) => {
      state.groups.push(action.payload);
    },
    addConversation: (state, action) => {
      state.conversations.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroupConversationFeed.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGroupConversationFeed.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.groups = action.payload;
      })
      .addCase(fetchGroupConversationFeed.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(fetchConversationFeed.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchConversationFeed.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.conversations = action.payload;
      })
      .addCase(fetchConversationFeed.rejected, (state) => {
        state.status = 'failed';
      })
  },
});

export const { updateGroup, updateConversation, addGroup, addConversation } = conversationFeedSlice.actions;

export default conversationFeedSlice.reducer;
