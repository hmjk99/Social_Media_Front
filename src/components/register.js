import { useHistory } from 'react-router-dom';
import { useEffect } from "react"

const Register = () =>{
    let history = useHistory()

    const handleRegister = async (event) =>{
        event.preventDefault()

        const form = event.target
        const user = {
            username: form[0].value,
            password: form[1].value
        }

        fetch("/user/register", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(user)
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
        <form onSubmit={event => handleRegister(event)}>
            <input required type="text" name="username"/>
            <input required type="password"/>
            <input type="submit" value="Register"/>
        </form>
    )
}

export default Register