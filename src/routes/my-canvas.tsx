// import React from 'react';
import { useLayoutEffect } from 'react';

function MyCanvas() {
  console.log('MyCanvas')

  useLayoutEffect(() => {
    // const canvas: any = document.getElementById('container')
    // const ctx: any = canvas.getContext('2d')
  }, [])
  return (
    <div>
      <canvas id="container"></canvas>
    </div>
  );
}

export default MyCanvas;
