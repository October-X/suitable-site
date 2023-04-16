import { createSlice } from '@reduxjs/toolkit';

// 定义初始状态
const initialState = {
    currentClass:{}
};

// 创建一个Redux slice
const counterSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        // 定义action和对应的reducer
        updateClassInfo: (state, {payload}) => {
            state.currentClass=payload;
        },
    }
});

// 导出action和reducer
export const { updateClassInfo} = counterSlice.actions;

// 导出slice的reducer
export default counterSlice.reducer;
