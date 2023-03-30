import {useState} from 'react'

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
    const handleChange = (event) =>{
        setPosts({...posts, [event.target.name]: event.target.value})
    }
    const handleSubmit = (event) =>{
        event.preventDefault()
        props.handleCreate(posts)
        props.showAdd()
    }
    const handleTagCount = (event) => {
        event.preventDefault()
        setTagsNum(tagsNum + 1)
    }
    const handleImageCount = (event) => {
        event.preventDefault()
        setImagesNum(imagesNum + 1)
    }
    const handleTags = (event) =>{
      let newTags = tagsArray
        newTags.push(event.target.value)
        setPosts({...posts, [event.target.name]:tagsArray})
        setTagsArray(newTags)
    }
    const handleImages = (event) => {
      let newImages = imagesArray
      newImages.push(event.target.value)
      setImagesArray(newImages)
      setPosts({...posts, [event.target.name]:imagesArray})
    }
    const addTag = () =>{
        let tagCount = []
        for (let i=0; i < tagsNum; i++){
        tagCount.push(
        <>
            <input key={i} type='text' name='tags' onChange={handleTags}/>
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
                <input key={i} type='text' name='image' onChange={handleImages}/>
            </>
                )}
                return imageCount
        
    }
    return(
        <div id='add'>
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
        </div>
    )
}

export default Add