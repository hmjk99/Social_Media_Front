import Carousel from './Carousel'
import EditModal from './EditModal'
import Edit from "./Edit.js";
import { useState, useEffect } from "react";

const Posts = (props)=>{
    const [displayEdit, setEdit] = useState(false)
    const [posts, setPosts] = useState({...props.each})
    const [username, setUsername] = useState(null)

    const showEdit = () => {
      setEdit(!displayEdit)
    };
    const handleLikes = (event) =>{
      const updatedPost = { ...posts, [event.target.name]: event.target.value}
      setPosts(updatedPost);
      setLikes(updatedPost)
      console.log('clicked!',posts)
    }   
    
    const setLikes = (posts) => {
      props.handleEdit(posts);
    }
    
    useEffect(()=>{
      fetch("http://localhost:3000/getUsername", {
        headers: {
            "x-access-token": localStorage.getItem("token")
        }
      })
      .then(res => res.json())
      .then(data => data.isLoggedIn ? setUsername(data.username): null)
    }, [])

    return(
    <>
        <div className="Post">
            {username ?
            <>
                <div className='post-top'>
                  <h3 className='date'>{props.each.date}</h3>
                  <EditModal each={props.each} handleDelete={props.handleDelete} showEdit={showEdit}/>
                </div>
                <Carousel each={props.each} />
                {displayEdit ? 
                    <Edit each={props.each} handleEdit={props.handleEdit} showEdit={showEdit}/>
                    : 
                    <>
                        <div className='likes-tags'>
                            <button className='like-button' name="likes" 
                            value={parseInt(posts.likes) + 1} 
                            onClick={handleLikes} > 
                            <i className='bx bx-like'></i>
                            like</button>
                            <span>Likes: {posts.likes}</span>
                            {props.each.tags.map((tag)=>{
                                return(
                                    <span className='post-tags'>{tag}</span>
                                )
                            })}
                        </div>
                        <div className="post-text">
                        <p>{props.each.text}</p> 
                        </div>
                    </>
                }
              </>
              : null
              }
        </div>
    </>
    )
}

export default Posts