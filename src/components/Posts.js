const Posts = (props)=>{
    return(
        <div className="Post">
            <h3>{props.each.date}</h3>
            {props.each.image.map((img)=>{
                return(
                    <img src={img}/>
                )
            })}
            <span>Likes: {props.each.likes}</span>
            {props.each.tags.map((tag)=>{
                return(
                    <span>{tag}</span>
                )
            })}
            <p>{props.each.text}</p>
        </div>
    )
}

export default Posts