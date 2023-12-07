import { createSlice } from '@reduxjs/toolkit';

const initialName = {
    primar : {
        dark : '#gray',
        light : "#f1f1f1"
    },
    second : {
        dark : 'gray',
        light : '#ffffff'
    },
    third : {
        dark : 'gray',
        light : 'rgb(234, 234, 234)'
    },
    fourth : {
        dark : "#d4d4dc",
        light : "#f1f1f1"
    }
}

export const ColorSlice = createSlice({
    name : "name",
    initialState : initialName,
    reducers : {
    }
})

export const {} = ColorSlice.actions

export default ColorSlice.reducer;