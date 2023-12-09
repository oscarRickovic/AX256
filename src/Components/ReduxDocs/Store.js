import { configureStore } from '@reduxjs/toolkit'
import LightState from './LightState';
import ColorState from './ColorState';
import FindNewFriendState from './FindNewFriendState';

export const store = configureStore({
  reducer: {
    LightState : LightState,
    ColorState : ColorState,
    FindNewFriendState : FindNewFriendState
  }
})

