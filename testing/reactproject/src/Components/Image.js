import React from 'react';

function ImageComponent(props) {
  const { src, alt, width, height } = props;

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
    />
  );
}

export default ImageComponent;
