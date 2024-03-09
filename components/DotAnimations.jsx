// DotAnimation.js

import { useEffect, useRef } from "react";

function DotAnimation() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let maxx, maxy, halfx, halfy, dotCount, dots;

    function init() {
      maxx = window.innerWidth;
      maxy = window.innerHeight;
      halfx = maxx / 2;
      halfy = maxy / 2;
      canvas.width = maxx;
      canvas.height = maxy;
      dotCount = 200;
      dots = [];
      for (let i = 0; i < dotCount; i++) {
        dots.push(new Dot());
      }
      render();
    }

    function render() {
      context.fillStyle = "#000000";
      context.fillRect(0, 0, maxx, maxy);
      for (let i = 0; i < dotCount; i++) {
        dots[i].draw();
        dots[i].move();
      }
      requestAnimationFrame(render);
    }

    function Dot() {
      this.rad_x = 2 * Math.random() * halfx + 1;
      this.rad_y = 1.2 * Math.random() * halfy + 1;
      this.alpha = Math.random() * 360 + 1;
      this.speed = Math.random() * 100 < 50 ? 1 : -1;
      this.speed *= 0.1;
      this.size = Math.random() * 5 + 1;
      this.color = Math.floor(Math.random() * 256);
    }

    Dot.prototype.draw = function () {
      const dx = halfx + this.rad_x * Math.cos((this.alpha / 180) * Math.PI);
      const dy = halfy + this.rad_y * Math.sin((this.alpha / 180) * Math.PI);
      context.fillStyle = `rgb(${this.color},${this.color},${this.color})`;
      context.fillRect(dx, dy, this.size, this.size);
    };

    Dot.prototype.move = function () {
      this.alpha += this.speed;
      if (Math.random() * 100 < 50) {
        this.color += 1;
      } else {
        this.color -= 1;
      }
    };

    init();

    // Cleanup function
    return () => cancelAnimationFrame(render);
  }, []); // Empty dependency array to run effect only once

  return <canvas ref={canvasRef} className="c
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
    }}
"></canvas>;
}

export default DotAnimation;
