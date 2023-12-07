import { configureStore } from '@reduxjs/toolkit'
import LightState from './LightState';
import ColorState from './ColorState';

export const store = configureStore({
  reducer: {
    LightState : LightState,
    ColorState : ColorState
  }
})

