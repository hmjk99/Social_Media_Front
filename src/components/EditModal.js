import React, {useState} from 'react'

import Delete from './Delete.js';
const EditModal = (props) => {
  const [displayModal, setModal] = useState(false)
  const showModal = () =>{
    setModal(!displayModal)
  }
  return (
    <>
    <div>
      <i onClick={showModal} className='bx bx-dots-horizontal-rounded elipse'></i>
      {displayModal ?
        <>
          <div className="modal">
            <button className='modal-button' onClick={props.showEdit}>Edit</button>
            <Delete each={props.each} handleDelete={props.handleDelete} />
          </div>
        </> 
      : null}
      </div>
    </>
  );
}

export default EditModal