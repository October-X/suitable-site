import { configureStore } from '@reduxjs/toolkit';
import userInfo from './features/userSlice';
import currentClass from './features/classSlice'

const store = configureStore({
    reducer: {
        userInfo, // 将counterSlice的reducer添加到store中
        currentClass
    }
});

export default store;
