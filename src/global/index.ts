import {useMemo, useState} from "react";

let store = { // 存放所有变量
    count:0,
    userInfo: {},
    currentClass:{},
    changeCamera:null,
    pileBlocksChangeCamera:null,
}

function setStore(key: string, value: any) {
    // @ts-ignore
    store[key] = value
}

function getStore(key: string) {
    // @ts-ignore
    return store[key]
}

export const useGlobal = (key: string) => {
    // @ts-ignore
    const [value, setValue] = useState(store[key]);

    function handleChange(newValue:any) {
        setValue(newValue);
        setStore(key,newValue)
    }

    return [value, handleChange];
}

export const useWatch = (key:string)=>{
    return useMemo(() => {
        return store[key]
    }, [store[key]])
}

export default {store, getStore, setStore, useGlobal,useWatch}
