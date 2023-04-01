import {useState, useEffect} from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from './components/register'
import Login from './components/login'
import Profile from './components/Profile'
import axios from 'axios'
import Posts from './components/Posts'
import Add from './components/Add'
import Nav from './components/Nav'
import './App.css';

const App=()=>{
  //============ states ==============//
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState([])
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
    axios.delete('http://localhost:3000/' + data._id).then(()=>{
      let newPost = posts.filter((each)=>{
        return each._id !== data._id
      })
      setPosts(newPost)
    })
  }

  // ================== requests for user ===============//
  const getUser = () =>{
    axios.get('http://localhost:3000/user').then((response)=>{
      setUser(response.data)
    })
  }

  // const handleEditUser = (data) =>{
  //   axios.put('http://localhost:3000/user/' + data._id, data).then(()=>{
  //     let newUser = user.map((each)=>{
  //       return each._id !== data._id ? each : data
  //     })
  //     setUser(newUser)
  //   })
  // }
  // const handleDeleteUser = (data) =>{
  //   axios.delete('http://localhost:3000/user/' + data._id).then(()=>{
  //     let newUser = user.filter((each)=>{
  //       return each._id !== data._id
  //     })
  //     setUser(newUser)
  //   })
  // }

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
    <BrowserRouter>
    <div id='whole'>
      <head>
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'/>
      </head>
      <Nav showHome={showHome} showProfile={showProfile}/>
      {displayHome ?
      <>
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
        <Profile user={user}/>
        : null
      }
      {/* // ============== user auth routes ==========// */}
        <Switch>
          <Route path="/register" component={Register} exact />
          <Route path="/login" component={Login} exact />
        </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
