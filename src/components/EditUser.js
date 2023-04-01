import { useState } from "react";

const EditUser = (props) => {
  const [user, setUser] = useState({ ...props.user });

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleEdit(user);
    props.showEdit()
  };




  return (
    
    <div id="edit">
      <div>
        <button id="edit" onClick={props.showEdit}>Edit Profile</button>
        {props.displayEdit ? 
        <form onSubmit={handleSubmit}>
            <label htmlFor='name'>Name:</label>
            <input required type="text" name="name" onChange={handleChange} value={user.name}/>
            <br/>
            <br/>
            <label htmlFor='username'>Username:</label>
            <input required type="text" name="username" onChange={handleChange} value={user.username}/>
            <br/>
            <br/>
            <label htmlFor='image'>Image:</label>
            <input required type="text" name="image" onChange={handleChange} value={user.image}/>
            <br/>
            <br/>
            <label htmlFor='bio'>Bio:</label>
            <input required type="text" name="bio" onChange={handleChange} value={user.bio}/>
            <br/>
            <br/>
            <input type="submit" value="Edit"/>
        </form>
        : null
        }
      </div>
    </div>
  );
};

export default EditUser;