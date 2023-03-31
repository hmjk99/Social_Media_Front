import { useHistory } from 'react-router-dom';
import { useEffect } from "react"

const Login = () =>{
    let history = useHistory()

    const handleLogin = (event) =>{
        event.preventDefault()

        const form = event.target
        const user = {
            username: form[0].value,
            password: form[1].value
        }

        fetch("/user/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            localStorage.setItem("token", data.token)
        })
    }

    useEffect(()=>{
        fetch("/user/getUsername", {
            headers: {
                "x-access-token" : localStorage.getItem("token")
            }
        })
        .then(res => res.json())
        .then(data => data.isLoggedIn ? history.push("/"):null)
    })

    return(
        <form onSubmit={event => handleLogin(event)}>
            <input required type="text" name="username"/>
            <input required type="password"/>
            <input type="submit" value="Submit"/>
        </form>
    )
}

export default Login