import { configureStore } from '@reduxjs/toolkit'
import LightState from './LightState';
import ColorState from './ColorState';
import FindNewFriendState from './FindNewFriendState';
import PassNewFriendState from './PassNewFriendState';

export const store = configureStore({
  reducer: {
    LightState : LightState,
    ColorState : ColorState,
    FindNewFriendState : FindNewFriendState,
    PassNewFriendState : PassNewFriendState
  }
})

