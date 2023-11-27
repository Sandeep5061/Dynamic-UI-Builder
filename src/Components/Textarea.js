import React from 'react';
import { useDrag } from 'react-dnd';

function Textarea({ id }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'textarea',
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        border: isDragging ? '2px dashed blue' : '2px solid black',
        padding: '8px',
        marginBottom: '8px',
      }}
    >
      <textarea
        id={id}
        rows="4"
        cols="50"
        style={{ resize: 'none', width: '100%', height: '100%', border: 'none' }}
      ></textarea>
    </div>
  );
}

export default Textarea;
