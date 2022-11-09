import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ChatbotSwitchState {
  value: boolean;
}

const initialState: ChatbotSwitchState = {
  value: false,
};

export const chatbotSwitch = createSlice({
  name: "chatbotSwitch",
  initialState,
  reducers: {
    onChatbot: (state) => {
      state.value = true;
    },
    offChatbot: (state) => {
      state.value = false;
    },
    switchChatbot: (state) => {
      state.value = !state.value;
    },
  },
});

export const { onChatbot, offChatbot, switchChatbot } = chatbotSwitch.actions;
// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.chatbotSwitch.value;

export default chatbotSwitch.reducer;
