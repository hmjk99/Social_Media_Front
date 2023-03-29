import React, {useState} from 'react'
import Edit from "./Edit.js";
const EditModal = (props) => {
  const [showEdit, setShowEdit] = useState("");
const toggleEdit = (id) => {
  showEdit === id ?
  setShowEdit("")
  : setShowEdit(id)
};

  return (
    <div>
      <p onClick={() => toggleEdit(props.each._id)} className="edit-button">
        ...
      </p>
      {showEdit === props.each._id ? (
        <>
          <div className="modal">
            <Edit each={props.each} handleEdit={props.handleEdit} />
            <button
              onClick={() => {
                props.handleDelete(props.each);
              }}
            >
              Delete
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default EditModal