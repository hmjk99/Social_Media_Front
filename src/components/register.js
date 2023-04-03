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
        <div className='auth-whole'>
          <div className='auth-title'>
            <h2>Register Now!</h2>
            <h2>Welcome to</h2>
            <h1 className='logo'>stackbook</h1>
          </div>
          <div className='auth-content'>
            {invalidMessage ?
                <p className='error'>Username already exists</p>
                : null
            }
            <form onSubmit={event => handleRegister(event)}>
                <input className='auth-input' required type="text" name="name" placeholder='First Last Name'/>
                <br/>
                <br/>
                <input className='auth-input' required type="text" name="username" placeholder='Username'/>
                <br/>
                <br/>
                <input className='auth-input' required type="password" name="password" placeholder='Password'/>
                <br/>
                <br/>
                <input className='auth-input' required type="text" name="image" placeholder='Image URL'/>
                <br/>
                <br/>
                <input className='auth-input' required type="text" name="bio"
                placeholder='Bio'/>
                <br/>
                <br/>
                <input className='auth-submit' type="submit" value="Register"/>
            </form>
            <div className='auth-link'>
                <h4>Already have an account?</h4>
                <Link to="/login">Login</Link>
            </div>
          </div>
        </div>
 
    )
}

export default Register