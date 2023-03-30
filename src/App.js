import {useState, useEffect} from 'react'
import axios from 'axios'
import Posts from './components/Posts'
import Add from './components/Add'
import Users from './components/Users'
import Nav from './components/Nav'
import './App.css';

const App=()=>{
  //============ states ==============//
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])
  const [displayHome, setHome] = useState(true)
  const [displayProfile, setProfile] = useState(false)
  const [displayAdd, setAdd] = useState(false)
  //============ requests ==============//
  const getPost = () =>{
    axios.get('http://localhost:3000/').then((response)=>{
      setPosts(response.data)
    })
  }
  const handleCreate = (data) =>{
    axios.post('http://localhost:3000/', data).then((response)=>{
      let newPost = [...posts, response.data]
      setPosts(newPost)
    })
  }
  const handleEdit = (data) =>{
    axios.put('http://localhost:3000/' + data._id, data).then(()=>{
      let newPost = posts.map((each)=>{
        return each._id !== data._id ? each : data
      })
      setPosts(newPost)
    })
  }
  const handleDelete = (data) =>{
    console.log(data)
    axios.delete('http://localhost:3000/' + data._id).then(()=>{
      let newPost = posts.filter((each)=>{
        return each._id !== data._id
      })
      setPosts(newPost)
    })
  }

  const getUser = () =>{
    axios.get('http://localhost:3000/user').then((response)=>{
      setUsers(response.data)
    })
  }

  // =========== display functions ===========//

  const showHome = () =>{
    setHome(true)
    setProfile(false)
  }

  const showProfile = () =>{
    setHome(false)
    setProfile(true)
  }

  const showAdd = () =>{
    setAdd(!displayAdd)
  }

  useEffect(()=>{
    getPost()
    getUser()
  }, [])

  return (
    <div id='whole'>
      <head>
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'/>
      </head>
      <Nav showHome={showHome} showProfile={showProfile}/>
      {displayHome ?
      <>
        <button onClick={showAdd}>Add Post</button>
        {displayAdd ? <Add handleCreate={handleCreate} showAdd={showAdd}/> : null}
        {posts.map((each)=>{
          return(
            <div className='posts-content'>
              <Posts each={each} handleEdit={handleEdit} handleDelete={handleDelete}/>
            </div>
          )
        })}
      </> 
      : null
      }
      {displayProfile ? 
        <Users users={users}/>
        : null
      }
    </div>
  );
}

export default App;
