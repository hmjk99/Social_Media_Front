import {useState, useEffect} from 'react'

const Add = (props) =>{
    const [displayAdd, setAdd] = useState(false)
    const [imagesArray, setImagesArray] = useState([])
    const [imagesNum, setImagesNum] = useState(1)
    const [tagsArray, setTagsArray] = useState([])
    const [tagsNum, setTagsNum] = useState(1)
    const [posts, setPosts] = useState(
        {
            date:'',
            likes: 0,
            image:[""],
            tags:[""],
            text:''
        }
    )
    const [username, setUsername] = useState(null)

    const showAdd = () =>{
        setAdd(!displayAdd)
    }

    const handleTagCount = (event) => {
        event.preventDefault()
        setTagsNum(tagsNum + 1)
    }
    
    const handleImageCount = (event) => {
        event.preventDefault()
        setImagesNum(imagesNum + 1)
    }
    
    const handleChange = (event) =>{
        setPosts({...posts, [event.target.name]: event.target.value})
    }
    
    const handleSubmit = (event) =>{
    console.log(posts)
        event.preventDefault()
        props.handleCreate(posts)
        showAdd()
    }
    
    const handleTags = (event) =>{
      let newTags = tagsArray
        newTags.push(event.target.value)
        setPosts({...posts, [event.target.name]:newTags})
        setTagsArray(newTags)
    }
    
    const handleImages = (event) => {
      let newImages = imagesArray
      newImages.push(event.target.value)
      setImagesArray(newImages)
      setPosts({...posts, [event.target.name]:newImages})
    }
    
    const addTag = () =>{
        let tagCount = []
        for (let i=0; i < tagsNum; i++){
        tagCount.push(
        <>
            <input className='add-input' key={i} type='text' name='tags' onBlur={handleTags}/>
        </>
        )
        }
        return tagCount
    }
    
    const addImage = () =>{
        let imageCount = []
        for (let i=0; i < imagesNum; i++){
            imageCount.push(
            <>
                <input className='add-input' key={i} type='text' name='image' onBlur={handleImages}/>
            </>
                )}
                return imageCount
        
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
        <div id='add'>
            {username ?
            <>
            <h1 id='home-title'>Welcome, {username}!</h1>
            <button id='add-button' onClick={showAdd}>Create Post</button>
            {displayAdd ? 
                <form onSubmit={handleSubmit}>
                    <label htmlFor='date'>Date:</label>
                    <input className='add-input' type='text' name='date' onChange={handleChange} placeholder='mm/dd/yyyy'/>
                    <br/>
                    <br/>
                    <label htmlFor='image'>Image URL:</label>
                        {addImage()} <button className='more' onClick={handleImageCount}>Add more</button>
                    <br/>
                    <br/>
                    <label htmlFor='tags'>Tag:</label>
                        {addTag()} <button className='more' onClick={handleTagCount}>Add more</button>
                    <br/>
                    <br/>
                    <label htmlFor='text'>Write a caption:</label>
                    <textarea className='add-input' name='text' onChange={handleChange}/>
                    <br/>
                    <br/>
                    <input className='add-submit' type="submit"/>
                </form>    
            : null        
            }           
            </>
            : null
            }

        </div>
    )
}

export default Add