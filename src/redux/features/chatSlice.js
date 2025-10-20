import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentConversationId: null,
  isTyping: false,
  isOpen: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setCurrentConversation: (state, action) => {
      state.currentConversationId = action.payload;
    },
    setIsTyping: (state, action) => {
      state.isTyping = action.payload;
    },
    setIsOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    clearChat: (state) => {
      state.currentConversationId = null;
      state.isTyping = false;
    },
  },
});

export const { setCurrentConversation, setIsTyping, setIsOpen, clearChat } = chatSlice.actions;

export default chatSlice.reducer;
