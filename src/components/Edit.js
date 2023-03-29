import { useState } from "react";

const Edit = (props) => {
  const [posts, setPosts] = useState({ ...props.each });
  const [showEdit, setShowEdit] = useState("");

  const handleChange = (event) => {
    setPosts({ ...posts, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleEdit(posts);
    props.toggleEdit("")
  };

  const toggleEdit = (id) => {
    showEdit === id ? setShowEdit("") : setShowEdit(id);
  };

  return (
  
    
    <div id="edit">
      <button onClick={() => toggleEdit(props.each._id)}>edit</button>
        {showEdit === props.each._id ?
      <div className="edit_modal">
        <form onSubmit={handleSubmit}>
          <label htmlFor="date">Date:</label>
          <input type="text" name="date" onChange={handleChange} value={posts.date} />
          <br />
          <br />
          <label htmlFor="image">Image URL:</label>
          {posts.image.map((img) => {
            return (
              <>
                <input type="text" name="image" onChange={handleChange} value={img} />
              </>
            );
          })}
          <br />
          <br />
          <label htmlFor="tags">Tags:</label>
          {posts.tags.map((tag) => {
            return (
              <>
                <input type="text" name="tags" onChange={handleChange} value={tag}/>
              </>
            );
          })}
          <br />
          <br />
          <label htmlFor="text">Write a caption:</label>
          <input type="text" name="text" onChange={handleChange} value={posts.date}/>
          <br />
          <br />
          <input type="submit" />
        </form>
      </div> : null}
    </div>
  );
};

export default Edit;
