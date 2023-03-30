import Carousel from './Carousel'
const Posts = (props)=>{
    return(
        <div className="Post">
            <h3>{props.each.date}</h3>
            <Carousel each={props.each} />
            <div className='likes-tags'>
                <span>Likes: {props.each.likes}</span>
                {props.each.tags.map((tag)=>{
                    return(
                        <span>{tag}</span>
                    )
                })}
            </div>

            <p>{props.each.text}</p>
        </div>
    )
}

export default Posts