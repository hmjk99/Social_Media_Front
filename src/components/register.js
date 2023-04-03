import { useHistory, Link } from 'react-router-dom';
import { useState } from 'react'

const Register = () =>{
    const [errorMessage, setErrorMessage] = useState("")
    const [invalidMessage, setInvalid] = useState(false)
    const history = useHistory()

    const handleRegister = async (event) =>{
        event.preventDefault()

        const form = event.target
        const user = {
            name: form[0].value,
            username: form[1].value,
            password: form[2].value,
            image: form[3].value,
            bio: form[4].value,

        }

        fetch('https://frendli.herokuapp.com/register', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'Username has been already taken') {
          setInvalid(true);
        } else {
          history.push('/login');
        }
      })
      .catch((error) => console.error(error));
  };


    return(
        <>
        {invalidMessage ?
        <p className='error'>Username already exists</p>
        : null
        }
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
            <label htmlFor='image'>Image:</label>
            <input required type="text" name="image"/>
            <br/>
            <br/>
            <label htmlFor='bio'>Bio:</label>
            <input required type="text" name="bio"/>
            <br/>
            <br/>
            <input type="submit" value="Register"/>
        </form>
        <div>
            <h1>Already have an account?</h1>
            <Link to="/login">Login</Link>
        </div>
        </>
 
    )
}

export default Register