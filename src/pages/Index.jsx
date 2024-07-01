import React, { useRef, useState, useEffect } from 'react';

function Index() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 100; // Adjust for header and footer
    context.lineCap = 'round';
    context.strokeStyle = color;
    context.lineWidth = 5;
  }, [color]);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.beginPath();
    context.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-500 text-white text-center py-4">
        <h1 className="text-3xl">Canvas Drawing App</h1>
      </header>
      <main className="flex-1">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="w-full h-full"
        />
      </main>
      <footer className="bg-gray-200 text-center py-4 flex justify-center space-x-4">
        <button onClick={clearCanvas} className="bg-red-500 text-white px-4 py-2 rounded">
          Clear
        </button>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="border border-gray-400 rounded"
        />
      </footer>
    </div>
  );
}

export default Index;