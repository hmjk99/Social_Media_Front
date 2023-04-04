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
        {username ?
        <div id='nav'>
            <h3 className='logo' id='home-logo'>stackbook</h3>
            <i class='bx bxs-home-smile' id='home' onClick={props.showHome}></i>
            {props.user.filter(each => each.username === username).map((filteredData)=>{
            return(
                    <img id='profile' onClick={props.showProfile} src={filteredData.image}/>
                )
            })}
            <h3 id='logout' onClick={logout}>Logout</h3>   
        </div>         
        :null
        }
    </>
)}

export default Nav