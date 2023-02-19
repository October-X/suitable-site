import React from 'react';
import './style.less'

export default function index(props: any) {
  const { content } = props;
  return (
    <div className="item">
      <div className="item__content">{content}</div>
    </div>
  );
}
