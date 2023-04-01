import { useHistory, Link } from 'react-router-dom';
import { useLayoutEffect, useState } from 'react'

const Register = () =>{
    const [errorMessage, setErrorMessage] = useState("")
    const history = useHistory()

    const handleRegister = async (event) =>{
        event.preventDefault()

        const form = event.target
        const user = {
            username: form[1].value,
            password: form[2].value,
            
        }

        fetch("http://localhost:3000/register", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.error(error))
    }

    useLayoutEffect(() => {
        fetch("http://localhost:3000/getUsername", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
        .then(res => res.json())
        .then(data => data.isLoggedIn ? history.push("/"): null)
        .catch(err => setErrorMessage(err)) 
    }, [history])

    return(
        <>
       <form onSubmit={event => handleRegister(event)}>
            <label htmlFor='name'>Name:</label>
            <input required type="text" name="name"/>
            <br/>
            <br/>
            <label htmlFor='username'>Username:</label>
            <input required type="text" name="username"/>
            <br/>
            <br/>
            <label htmlFor='password'>Password:</label>
            <input required type="password" name="password"/>
            <br/>
            <br/>
            <label htmlFor='bio'>Bio:</label>
            <input required type="text" name="bio"/>
            <br/>
            <br/>
            <label htmlFor='skills'>Skills:</label>
            <input required type="text" name="skills"/>
            <br/>
            <br/>
            <input type="submit" value="Register"/>
        </form>
        <div>
            <h1>Already have an account?</h1>
            <Link to="/user/login">Login</Link>
        </div>
        </>
 
    )
}

export default Register