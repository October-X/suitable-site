import global from '@/global'

export const updateUserInfo = (val:any)=>{
    const [userInfo,setUserInfo] = global.useGlobal("userInfo")
    setUserInfo(val)
}
