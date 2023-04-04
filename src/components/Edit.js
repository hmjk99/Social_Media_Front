import { useState } from "react";

const Edit = (props) => {
  const [posts, setPosts] = useState({ ...props.each });

  const handleChange = (event) => {
    setPosts({ ...posts, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleEdit(posts);
    props.showEdit()
  };


  return (
    
    <div id="edit">
        <form onSubmit={handleSubmit}>
          <label htmlFor="date">Date:</label>
          <input className='add-input' type="text" name="date" onChange={handleChange} value={posts.date} />
          <br />
          <label htmlFor="image">Image URL:</label>
          {posts.image.map((img) => {
            return (
              <>
                <input className='add-input' type="text" name="image" onChange={handleChange} value={img} />
              </>
            );
          })}
          <br />
          <label htmlFor="tags">Tags:</label>
          {posts.tags.map((tag) => {
            return (
              <>
                <input className='add-input' type="text" name="tags" onChange={handleChange} value={tag}/>
              </>
            );
          })}
          <br />
          <label htmlFor="text">Write a caption:</label>
          <textarea name="text" onChange={handleChange} value={posts.text}/>
          <br />
          <br />
          <input className='add-submit' type="submit" />
        </form>
    </div>
  );
};

export default Edit;
