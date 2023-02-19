// @ts-ignore
export const debounce = function (fn, duration:number) {
  let timerId: any = null;
  // @ts-ignore
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      //@ts-ignore
      fn.apply(this, args);
    }, duration);
  };
};


// @ts-ignore
export function curry(fn,...args){
  if(args.length >= fn.length){
    // @ts-ignore
      return fn.apply(this,args);
  }
  // @ts-ignore
  return function(...vals){
      let totalArgs = args.concat(vals)
      // @ts-ignore
      return curry.call(this,fn,...totalArgs)
  }
}