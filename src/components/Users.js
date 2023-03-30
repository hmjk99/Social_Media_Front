const Users = (props) =>{
    return(
        <div className="users">
            <img src={props.each.image}/>
            <h2>Username: {props.each.user_name}</h2>
            <h2>Bio: {props.each.bio}</h2>
            {props.each.skills.map((skill)=>{
                return(
                    <h2>Skills: {skill}</h2>
                )
            })}
        </div>
    )
}

export default Users