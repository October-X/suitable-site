import { createSlice } from '@reduxjs/toolkit';

// 定义初始状态
const initialState = {
    count: 0
};

// 创建一个Redux slice
const counterSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        // 定义action和对应的reducer
        increment: (state) => {
            state.count += 1;
        },
        decrement: (state) => {
            state.count -= 1;
        },
        // 可以通过传入action的payload来修改state
        incrementByAmount: (state, action) => {
            state.count += action.payload;
        }
    }
});

// 导出action和reducer
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// 导出slice的reducer
export default counterSlice.reducer;
