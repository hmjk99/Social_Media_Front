import {useState, useEffect} from 'react'

const Add = (props) =>{
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
        props.showAdd()
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
        <br />
            <input key={i} type='text' name='tags' onBlur={handleTags}/>
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
            <br />
                <input key={i} type='text' name='image' onBlur={handleImages}/>
            </>
                )}
                return imageCount
        
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
                    {addImage()} <button onClick={handleImageCount}>add more</button>
                <br/>
                <br/>
                <label htmlFor='tags'>Tag:</label>
                    {addTag()} <button onClick={handleTagCount}>add more</button>
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