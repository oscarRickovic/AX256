import { createSlice } from '@reduxjs/toolkit';

// Component names that we want to re render.
const initialName = {
    Conversations : false,
    TextingZone : 0 
}

export const RendersSlice = createSlice({
    name : "Renders",
    initialState : initialName,
    reducers : {
        renderConversations : (state) => {
            state.Conversations = !state.Conversations
        },
        renderTextingZone : (state) => {
            console.log('yes')
            state.TextingZone = state.TextingZone + 1
        }
    }
})

export const { renderConversations, renderTextingZone } = RendersSlice.actions

export default RendersSlice.reducer;