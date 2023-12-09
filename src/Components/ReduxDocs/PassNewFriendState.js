import { createSlice } from '@reduxjs/toolkit';

const initialName = {
    value : null
}

export const PassNewFriendSlice = createSlice({
    name : "PassNewFriend",
    initialState : initialName,
    reducers : {
        changeFriend : (state, val) => {
            state.value = val
        }
    }
})

export const { changeFriend } = PassNewFriendSlice.actions

export default PassNewFriendSlice.reducer;