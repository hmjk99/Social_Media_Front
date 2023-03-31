const Profile = (props) =>{
    return(
        <div className="users">
        {props.users.map((each)=>{
            return(
                <>
                    <img src={each.image}/>
                    <h2>Username: {each.user_name}</h2>
                    <h2>Bio: {each.bio}</h2>
                    {each.skills.map((skill)=>{
                        return(
                            <h2>Skills: {skill}</h2>
                        )
                    })}
                </>
            )
        })}
        </div>
        
    )
}

export default Profile