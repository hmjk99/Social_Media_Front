
import { useState, useEffect } from 'react'

const Profile = (props) =>{
    const [username, setUsername] = useState(null)

    useEffect(()=>{
        fetch("/getUsername", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
        .then(res => res.json())
        .then(data => data.isLoggedIn ? setUsername(data.username): null)
    }, [])
    return(
        <div className="users">
        {props.users.map((each)=>{
            return(
                <>
                {username ?
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
                    : null             
                }

                </>
            )
        })}
        </div>
        
    )
}

export default Profile