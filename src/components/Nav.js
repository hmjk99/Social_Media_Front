import { useHistory, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Nav = (props)=>{

    const history = useHistory()
    const [username, setUsername] = useState(null)

    const logout = async ()=> {
        localStorage.removeItem("token")
        history.push("/login")
        window.location.reload();
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
    <div className="header">
    <img src="https://i.imgur.com/Nvxelxh.png" alt="" />
        <div id="nav">
            {username ?
            <>
                <h3 id='home' onClick={props.showHome}>Home</h3>           
                <h3 id='profile' onClick={props.showProfile}>Profile</h3>
                <div onClick={logout}>Logout</div>            
            </>
            : <>         
                <div><Link to="/login">Login</Link></div>
                <div><Link to="/register">Register</Link></div>               
            </>
            }
        </div>
    </div>
    </>
)}

export default Nav