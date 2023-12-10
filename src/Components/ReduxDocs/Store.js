import { configureStore } from '@reduxjs/toolkit'
import LightState from './LightState';
import ColorState from './ColorState';
import PassNewFriendState from './PassNewFriendState';

export const store = configureStore({
  reducer: {
    LightState : LightState,
    ColorState : ColorState,
    PassNewFriendState : PassNewFriendState
  }
})

