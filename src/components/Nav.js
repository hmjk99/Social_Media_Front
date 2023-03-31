import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Nav = (props)=>{

    const history = useHistory()
    const [username, setUsername] = useState(null)

    const logout = async ()=> {
        localStorage.removeItem("token")
        history.push("/user/login")
    }

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
        <div id="nav">
            {username ?
            <>
                <h3 id='home' onClick={props.showHome}>Home</h3>           
                <h3 id='profile' onClick={props.showProfile}>Profile</h3>
                <div onClick={logout}>Logout</div>            
            </>
            : <>         
                <h3 id='profile' onClick={props.showProfile}>Login</h3>
                <div onClick={logout}>Register</div>                 
            </>
            }

        </div>
    )
}

export default Nav