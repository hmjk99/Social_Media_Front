import {useState, useEffect} from 'react'
import axios from 'axios'
import Posts from './components/Posts'
import Add from './components/Add'
import Edit from './components/Edit'
import './App.css';

const App=()=>{
  //============ states ==============//
  const [posts, setPosts] = useState([])

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

  useEffect(()=>{
    getPost()
  }, [])

  return (
    <div>
      <h1>React App</h1>
      <Add handleCreate={handleCreate}/>
      {posts.map((each)=>{
        return(
          <div>
            <Posts each={each}/>
            <Edit each={each} handleEdit={handleEdit}/>
            <button onClick={()=>{handleDelete(each)}}>Delete</button>
          </div>
        )
      })}
    </div>
  );
}

export default App;
