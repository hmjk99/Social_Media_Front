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
    }

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
      fetch("https://frendli.herokuapp.com/getUsername", {
        headers: {
            "x-access-token": localStorage.getItem("token")
        }
      })
      .then(res => res.json())
      .then(data => data.isLoggedIn ? setUsername(data.username): null)
    }, [])

    return(
    <>
      {username ?
      <div className="Post">
        <div className='post-content'>
          <div className='post-top'>
              <p className='date'>{props.each.date}</p>
              <EditModal each={props.each} showEdit={showEdit} showDelete={props.showDelete}/>
            </div>
            <Carousel each={props.each} />
            {displayEdit ? 
                <Edit each={props.each} handleEdit={props.handleEdit} showEdit={showEdit}/>
                : 
                <>
                    <div className='likes-tags'>
                        <button id='like-button' name="likes" value={parseInt(posts.likes) + 1} onClick={handleLikes} >❤️</button>                      
                        <span id='likes'>{posts.likes} likes</span>
                        {props.each.tags.map((tag)=>{
                            return(
                                <div className='post-tags'><p>{tag}</p></div>
                            )
                        })}
                    </div>
                    <div className='divider'></div>
                    <div className="post-text">
                    <p>{props.each.text}</p> 
                    </div>
                </>
            }
        </div>
      </div>
      : null
      }
    </>
    )
}

export default Posts