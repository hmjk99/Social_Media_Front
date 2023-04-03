import { useHistory, Link } from 'react-router-dom';
import { useState } from "react"

const Login = () =>{
    let history = useHistory()
    const [error, setError] = useState(null);
    const [invalidMessage, setInvalid] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
      
        const response = await fetch("https://frendli.herokuapp.com/login", {
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
        <div className='auth-whole'>
          <div className='auth-title'>
            <h2>Welcome back to</h2>
            <h1 className='logo'>stackbook</h1>
          </div>
          <div className='auth-content'>
            {invalidMessage ?
                <p className='error'>Invalid Username or Password</p>
            : null
            }   
            <form onSubmit={event => handleSubmit(event)}>
                <input className='auth-input' required type="text" name="username" placeholder='Username'/>
                <br/>
                <br/>
                <input className='auth-input' required type="password" name="password" placeholder='Password'/>
                <br/>
                <br/>
                <input className='auth-submit' type="submit" value="Login"/>
            </form>    
            <div className='auth-link'>
                <h4>Don't have an account?</h4>
                <Link to="/register">Register</Link>
            </div>
          </div>
        </div>

    )
}

export default Login