import React, { useRef, useEffect } from 'react';

const Starfield = () => {
  const canvasRef = useRef(null);
  let stars = [];

  const createStars = (num, width, height) => {
    const starArray = [];
    for (let i = 0; i < num; i++) {
      starArray.push({
        x: (Math.random() - 0.5) * width,
        y: (Math.random() - 0.5) * height,
        z: Math.random() * width,
      });
    }
    return starArray;
  };

  const resizeCanvas = (canvas) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    resizeCanvas(canvas);

    const numStars = 8000;
    stars = createStars(numStars, canvas.width, canvas.height);

    const animate = () => {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let star of stars) {
        star.z -= 0.5;
        if (star.z <= 0) {
          star.x = (Math.random() - 0.5) * canvas.width;
          star.y = (Math.random() - 0.5) * canvas.height;
          star.z = (star.z - 0.5 + canvas.width) % canvas.width;

        }

        const scale = 200 / star.z;
        const x = star.x * scale + canvas.width / 2;
        const y = star.y * scale + canvas.height / 2;
        const radius = Math.max(0, 3 - star.z / 100);

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = 'blue';
        ctx.fill();
      }

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => resizeCanvas(canvas);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} style={{ display: 'block', position: 'fixed', top: 0, left: 0, zIndex: -1 }} />;
};

export default Starfield;

