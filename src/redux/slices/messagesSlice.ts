import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { all, send, seen, reaction } from '../../api/messages';
import { Emoji, SafeMessage } from '../../types';


interface MessagesState {
  messages: SafeMessage[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: MessagesState = {
  messages: [],
  status: 'idle',
};

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async ({ id }: { id: number | null }, { rejectWithValue }) => {
    try {
      const response = await all({
        id: id,
      });

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const sendMessages = createAsyncThunk(
  'messages/sendMessages',
  async ({ id, body }: { id: number | null, body: string }, { rejectWithValue }) => {
    try {
      const response = await send({
        id: id,
        body: body
      });

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const seenMessage = createAsyncThunk(
  'messages/seenMessages',
  async ({ id, conversationId }: { id: number | null, conversationId: number | null }, { rejectWithValue }) => {
    try {
      const response = await seen({
        id: id,
        conversationId: conversationId
      });

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const reactionMessage = createAsyncThunk(
  'messages/reactionMessages',
  async ({ id, conversationId, emoji }: { id: number | null, conversationId: number | null, emoji: Emoji}, { rejectWithValue }) => {
    try {
      const response = await reaction({
        id: id,
        conversationId: conversationId,
        emoji: emoji
      });

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    pushMessage: (state, action) => {
       state.messages.push(action.payload)
    },
    updateMessage: (state, action) => {
      state.messages = state.messages.map(message => 
          message.id === action.payload.id 
              ? action.payload
              : message 
      );
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.status = 'loading';
        state.messages = []
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state) => {
        state.status = 'failed';
        state.messages = []
      })
      .addCase(sendMessages.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      })
      .addCase(reactionMessage.fulfilled, (state, action) => {
        state.messages = state.messages.map(message => 
            message.id === action.payload.id 
                ? action.payload
                : message 
        );
      })
  },
});

export const { pushMessage, updateMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
