import {configureStore} from '@reduxjs/toolkit'

import AuthenticationSliceReducer from './authentication/AuthenticationSlice';
const Store =  configureStore(
    {
        reducer:{
            authentication:AuthenticationSliceReducer
        }
    }
);

export default Store;