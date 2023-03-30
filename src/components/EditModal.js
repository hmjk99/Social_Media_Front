import React, {useState} from 'react'

import Delete from './Delete.js';
const EditModal = (props) => {
  const [displayModal, setModal] = useState(false)
  const showModal = () =>{
    setModal(!displayModal)
  }
  return (
    <>
      <i onClick={showModal} className='bx bx-dots-horizontal-rounded'></i>
      {displayModal ?
        <>
          <div className="modal">
            <button onClick={props.showEdit}>Edit</button>
            <Delete each={props.each} handleDelete={props.handleDelete} />
          </div>
        </> 
      : null}
    </>
  );
}

export default EditModal