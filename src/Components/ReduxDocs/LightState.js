import { createSlice } from '@reduxjs/toolkit';

const initialName = {
    value : false
}

export const LightSlice = createSlice({
    name : "name",
    initialState : initialName,
    reducers : {
        changeLight : (state) => {
            state.value = !state.value
        }
    }
})

export const { changeLight } = LightSlice.actions

export default LightSlice.reducer;