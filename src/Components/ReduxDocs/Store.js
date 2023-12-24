import { configureStore } from '@reduxjs/toolkit'
import LightState from './LightState';
import ColorState from './ColorState';
import PassNewFriendState from './PassNewFriendState';
import SocketState from './SocketState';

export const store = configureStore({
  reducer: {
    LightState : LightState,
    ColorState : ColorState,
    PassNewFriendState : PassNewFriendState,
    SocketState : SocketState
  }
})

