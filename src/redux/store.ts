import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import conversationFeedReducer from './slices/conversationFeedSlice'
import conversationReducer from './slices/conversationSlice'
import messagesReducer from './slices/messagesSlice'
import onlineReducer from './slices/onlineSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    conversationFeed: conversationFeedReducer,
    conversation: conversationReducer,
    messages: messagesReducer,
    online: onlineReducer
 },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;