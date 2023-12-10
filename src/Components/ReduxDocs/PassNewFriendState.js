import { createSlice } from '@reduxjs/toolkit';

const initialName = {
    value : null
}

export const PassNewFriendSlice = createSlice({
    name : "PassNewFriend",
    initialState : initialName,
    reducers : {
        changeFriend : (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { changeFriend } = PassNewFriendSlice.actions

export default PassNewFriendSlice.reducer;