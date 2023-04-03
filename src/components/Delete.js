import React, { useState } from 'react'

const Delete = (props) => {
const [showDelete, setShowDelete] = useState("")
const toggleDelete = (id) => {
  showDelete === id ? setShowDelete("") : setShowDelete(id);
};
  return (
    <div>
      <button className='modal-button' onClick={() => toggleDelete(props.each._id)}>delete</button>
        {showDelete === props.each._id ?
      <div className="delete_modal">
        <h3 className='back' onClick={toggleDelete}><i class='bx bx-arrow-back' size="lg"></i></h3>
        <h1>Are you sure you want to delete this post?</h1>
        <p>This action cannot be undone!</p>
        <button onClick={() => {props.handleDelete(props.each);}}>I'm sure!</button>
      </div>
        : null}
    </div>
  );
}

export default Delete