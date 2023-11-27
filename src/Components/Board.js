// Board.js
import React from 'react';
import Picture from "./Picture";
import Textarea from './Textarea';
import Textfield from './Textfield';
import Button from './Button';
import Dropdown from './Dropdown';

function Board({ board, onAddItem }) {
  return (
    <div className="Board">
      {board.map((item, index) => (
        <div key={index}>
          {item.type === 'image' ? (
            <Picture url={item.url} id={item.id} />
          ) : item.type === 'textarea' ? (
            <Textarea id={item.id} label={item.label} placeholder={item.placeholder} />
          ) : item.type === 'textfield' ? (
            <Textfield id={item.id} label={item.label} placeholder="Enter text here" />
          ) : item.type === 'button' ? (
            <Button id={item.id} label={item.label} text="Click Me" />
          ) : item.type === 'dropdown' ? (
            <Dropdown id={item.id} label={item.label} options={['Option 1', 'Option 2', 'Option 3']} />
          ) : null}
        </div>
      ))}
      <button className="SaveButton">Save</button>
      <button className="button" onClick={onAddItem}>Add Item</button>
    </div>
  );
}

export default Board;
