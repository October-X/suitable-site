import { useState, useRef } from 'react';
import './style.less';
import Item from './components/Item';

export default function index() {
  const total = new Array(2000).fill(123123);
  const itemHeight = 30;
  const visibleHeight = 600;
  const totalHeight = 30 * total.length;
  const count = 50
  const [scrollTop, setScrollTop] = useState(0);
  const virtualScrollerRef = useRef();
  const [top, setTop] = useState(0);
  const [items, setItems] = useState(
    total.slice(0, visibleHeight / itemHeight + 1),
  );

  const setDom = () => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.ceil(startIndex + visibleHeight / itemHeight);
    let currentStart = startIndex - count < 0 ? 0 : startIndex - count;
    setTop(currentStart * itemHeight);
    //@ts-ignore
    setItems(total.slice(currentStart, endIndex + count+1));
  };

  const handleScroll = () => {
    // 设置当前滚动条滚动的高度
    setScrollTop(virtualScrollerRef?.current?.scrollTop);
    setDom();
  };

  return (
    <div
      className="virtual-scroller"
      onScroll={handleScroll}
      ref={virtualScrollerRef}
    >
      <div className="virtual-scroller__wapper" style={{ height: totalHeight }}>
        <div
          className="container"
          style={{ transform: `translateY(${top}px)` }}
        >
          {items?.map((item, index) => (
            <div className="wapper_item" key={index}>
              <Item content={item}></Item>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
