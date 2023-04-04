import React, { useState } from 'react'

const Delete = (props) => {


  return (
    <>
      {props.displayDelete ?
      <div className="delete_modal">
        <h3 className='back' onClick={props.showDelete}><i class='bx bx-arrow-back' size="lg"></i></h3>
        <div id='delete-content'>
          <h1>Are you sure you want to delete this post?</h1>
          <p>This action cannot be undone!</p>
          <button className='add-submit' onClick={() => {props.handleDelete(props.each);}}>I'm sure!</button>
        </div>
      </div>
        : null}
    </>
  );
}

export default Delete