import { createSlice } from '@reduxjs/toolkit';

const initialName = {
    value : null
}

export const SocketSlice = createSlice({
    name : "socket_slice",
    initialState : initialName,
    reducers : {
        setSocket : (state, value)=>{
            state.value = value.payload;
        }
    }
})

export const {setSocket} = SocketSlice.actions

export default SocketSlice.reducer;