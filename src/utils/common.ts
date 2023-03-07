// @ts-ignore
export const debounce = function (fn, duration: number) {
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
export function curry(fn, ...args) {
  if (args.length >= fn.length) {
    // @ts-ignore
    return fn.apply(this, args);
  }
  // @ts-ignore
  return function (...vals) {
    let totalArgs = args.concat(vals);
    // @ts-ignore
    return curry.call(this, fn, ...totalArgs);
  };
}

export function imageLoaded(imageUrl: string, callback: () => void) {
  let img = new Image();
  function imageLoaded() {
    callback();
  }
  img.onload = imageLoaded;
  img.onerror = imageLoaded;
  img.src = imageUrl;
}

type imagesItem = {
  src: string;
};
export function allImagesLoaded(images: imagesItem[], callback: () => void) {
  let loaded = 0;
  let imgCount = images.length;

  function imageLoaded() {
    loaded++;
    if (loaded === imgCount) {
      callback();
    }
  }

  for (let i = 0; i < imgCount; i++) {
    let img = new Image();
    img.onload = imageLoaded;
    img.onerror = imageLoaded;
    img.src = images[i].src;
  }
}
