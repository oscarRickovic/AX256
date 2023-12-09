import { createSlice } from '@reduxjs/toolkit';

const initialName = {
    value : false
}

export const FindNewFriendSlice = createSlice({
    name : "FindNewFriends",
    initialState : initialName,
    reducers : {
        changeFindNewFriendState : (state) => {
            state.value = !state.value
        }
    }
})

export const { changeFindNewFriendState } = FindNewFriendSlice.actions

export default FindNewFriendSlice.reducer;