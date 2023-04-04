import {useState, useEffect} from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from './components/register'
import Login from './components/login'
import Profile from './components/Profile'
import axios from 'axios'
import Posts from './components/Posts'
import Add from './components/Add'
import Nav from './components/Nav'
import Delete from './components/Delete';
import './App.css';

const App=()=>{
  //============ states ==============//
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState([])
  const [displayHome, setHome] = useState(true)
  const [displayProfile, setProfile] = useState(false)
  const [displayDelete, setDelete] = useState(false)


  //============ requests ==============//
  const getPost = () =>{
    axios.get('https://frendli.herokuapp.com/').then((response)=>{
      setPosts(response.data)
    })
  }
  const handleCreate = (data) =>{
    axios.post('https://frendli.herokuapp.com/', data).then((response)=>{
      let newPost = [...posts, response.data]
      setPosts(newPost)
    })
  }
  const handleEdit = (data) =>{
    axios.put('https://frendli.herokuapp.com/' + data._id, data).then(()=>{
      let newPost = posts.map((each)=>{
        return each._id !== data._id ? each : data
      })
      setPosts(newPost)
    })
  }
  const handleDelete = (data) =>{
    console.log(data)
    axios.delete('https://frendli.herokuapp.com/' + data._id).then(()=>{
      let newPost = posts.filter((each)=>{
        return each._id !== data._id
      })
      setPosts(newPost)
    })
    setDelete(false)
  }

  // ================== requests for user ===============//
  const getUser = () =>{
    axios.get('https://frendli.herokuapp.com/user').then((response)=>{
      setUser(response.data)
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

  const showDelete = (id) => {
    setDelete(!displayDelete)
  };

  useEffect(()=>{
    getPost()
    getUser()
  }, [])

  return (
    <BrowserRouter>
    <div id='whole'>
      <head>
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'/>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Arimo&family=Russo+One&display=swap');
        </style>
      </head>
      <Nav showHome={showHome} showProfile={showProfile} user={user}/>
      <div id='body'>
        {displayHome ?
        <>
          <Add handleCreate={handleCreate}/>
          {posts.map((each)=>{
            return(
              <>
                <Posts each={each} handleEdit={handleEdit} showDelete={showDelete}/>
                <Delete each={each} handleDelete={handleDelete} displayDelete={displayDelete} showDelete={showDelete}/>
              </>
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
    </div>
    </BrowserRouter>
  );
}

export default App;
