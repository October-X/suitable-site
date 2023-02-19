type dataType = Exclude<any, null | undefined>

export const copyData = (data:dataType) => {
  return JSON.parse(JSON.stringify(data));
};

export const shallowCompare = (val1: dataType, val2: dataType) => {
  return JSON.stringify(val1) === JSON.stringify(val2);
};

export const shallowExist = (obj:[]|object, data:dataType) => {
  for (const key in obj) {
    if(shallowCompare(obj[key],data)){
        return true
    }
  }
  return false;
};

export const emptyExist = (obj:any)=>{
    console.log(obj)
    for (const key in obj) {
        if(obj[key]===null||obj[key]===''||obj[key]===undefined){
            return true
        }
    }
    return false
}
