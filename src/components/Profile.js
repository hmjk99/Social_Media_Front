
import { useState, useLayoutEffect } from 'react'
import axios from 'axios'
import EditUser from './EditUser'

const Profile = (props) =>{
    const [username, setUsername] = useState(null)
    const [user, setUser] = useState(props.user)
    const [displayEdit, setEdit] = useState(false);

    const handleEdit = (data) =>{
        axios.put('http://localhost:3000/user/' + data._id, data).then(()=>{
          let newUser = user.map((each)=>{
            return each._id !== data._id ? each : data
          })
          setUser(newUser)
        })
      }

    const handleDelete = (data) =>{
        axios.delete('http://localhost:3000/user/' + data._id).then(()=>{
          let newUser = user.filter((each)=>{
            return each._id !== data._id
          })
          setUser(newUser)
        })
    }

    const showEdit = ()=>{
        setEdit(!displayEdit)
    }

    useLayoutEffect(()=>{
        fetch("http://localhost:3000/getUsername", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
        .then(res => res.json())
        .then(data => data.isLoggedIn ? setUsername(data.username): null)
    }, [])

    
    return(
        <div className="users">
        {user
            .filter(each => each.username === username)
            .map((filteredData)=>{
            return(
                <>
                {displayEdit === false ?
                <>
                    <img src={filteredData.image}/>
                    <h2>Username: {filteredData.username}</h2>
                    <h2>Name: {filteredData.name}</h2>
                    <h2>Bio: {filteredData.bio}</h2>
                </>
                : null
                }
                    <EditUser user={filteredData} handleEdit={handleEdit} showEdit={showEdit} displayEdit={displayEdit}/>
                    <button onClick={()=>{handleDelete(filteredData)}}>Delete Account</button>
                </>
            )
        })}
        </div>
        
    )
}

export default Profile