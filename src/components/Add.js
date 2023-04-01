import {useState, useEffect} from 'react'

const Add = (props) =>{
    const [posts, setPosts] = useState(
        {
            date:'',
            likes: 0,
            image:[''],
            tags:[''],
            text:''
        }
    )
    const [username, setUsername] = useState(null)

    const handleChange = (event) =>{
        setPosts({...posts, [event.target.name]: event.target.value})
    }

    const handleSubmit = (event) =>{
        event.preventDefault()
        props.handleCreate(posts)
        props.showAdd()
    }

    useEffect(()=>{
        fetch("http://localhost:3000/getUsername", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
        .then(res => res.json())
        .then(data => data.isLoggedIn ? setUsername(data.username): null)
    }, [])

    return(
        <div id='add'>
            {username ?
            <>
            <button onClick={props.showAdd}>Add Post</button>
            <form onSubmit={handleSubmit}>
                <label htmlFor='date'>Date:</label>
                <input type='text' name='date' onChange={handleChange} placeholder='mm/dd/yyyy'/>
                <br/>
                <br/>
                <label htmlFor='image'>Image URL:</label>
                <input type='text' name='image' onChange={handleChange}/>
                <br/>
                <br/>
                <label htmlFor='tags'>Tag:</label>
                <input type='text' name='tags' onChange={handleChange}/>
                <br/>
                <br/>
                <label htmlFor='text'>Write a caption:</label>
                <input type='text' name='text' onChange={handleChange}/>
                <br/>
                <br/>
                <input type="submit"/>
            </form>           
            </>
            : null
            }

        </div>
    )
}

export default Add