import Carousel from './Carousel'
import EditModal from './EditModal'
import Edit from "./Edit.js";
import { useState } from "react";

const Posts = (props)=>{
    const [displayEdit, setEdit] = useState(false)
    const showEdit = () => {
      setEdit(!displayEdit)
    };

    return(
        <div className="Post">
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
                        <span>Likes: {props.each.likes}</span>
                        {props.each.tags.map((tag)=>{
                            return(
                                <span>{tag}</span>
                            )
                        })}
                    </div>
                    <p>{props.each.text}</p>                
                </>
            }

        </div>
    )
}

export default Posts