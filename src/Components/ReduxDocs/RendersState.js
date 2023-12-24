import { createSlice } from '@reduxjs/toolkit';

// Component names that we want to re render.
const initialName = {
    Conversations : false 
}

export const RendersSlice = createSlice({
    name : "Renders",
    initialState : initialName,
    reducers : {
        renderConversations : (state) => {
            state.Conversations = !state.Conversations
        }
    }
})

export const { renderConversations } = RendersSlice.actions

export default RendersSlice.reducer;