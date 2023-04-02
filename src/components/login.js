import { useHistory, Link } from 'react-router-dom';
import { useState } from "react"

const Login = () =>{
    let history = useHistory()
    const [error, setError] = useState(null);
    const [invalidMessage, setInvalid] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
      
        const response = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: e.target[0].value,
            password: e.target[1].value,
          })
        })
      
        const data = await response.json()
      
        if (data.token) {
          localStorage.setItem("token", data.token)
          history.push("/")
          window.location.reload();
        } else {
          setError(data.message)
          setInvalid(true)
        }
      }


    return(
        <>
            {invalidMessage ?
                <p className='error'>Invalid Username or Password</p>
            : null
            }   
            <form onSubmit={event => handleSubmit(event)}>
                <label htmlFor='username'>Username:</label>
                <input required type="text" name="username"/>
                <br/>
                <br/>
                <label htmlFor='password'>Password:</label>
                <input required type="password" name="password"/>
                <br/>
                <br/>
                <input type="submit" value="Login"/>
            </form>    
            <div>
                <h1>Don't have an account?</h1>
                <Link to="/register">Register</Link>
            </div>
        </>

    )
}

export default Login