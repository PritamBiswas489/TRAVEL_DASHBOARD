'use client';

import { useEffect } from 'react';
const BaseVectorMap = ({
  width,
  height,
  options,
  type
}) => {
  const selectorId = type;
  useEffect(() => {
    console.log('Map initialized:', selectorId);
    const map = new window['jsVectorMap']({
      selector: '#' + selectorId,
      map: type,
      ...options
    });
    return () => {
      console.log('Map destroyed:', selectorId);
      map.destroy();
    };
  }, [type, options]);
  return <>
      <div id={selectorId} style={{
      width: width,
      height: height
    }}></div>
    </>;
};
export default BaseVectorMap;