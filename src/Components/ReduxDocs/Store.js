import { configureStore } from '@reduxjs/toolkit'
import LightState from './LightState';

export const store = configureStore({
  reducer: {
    LightState : LightState
  }
})

