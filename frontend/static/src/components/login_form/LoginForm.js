import { useState } from "react"
import Cookies from 'js-cookie'

function LoginForm({setState, setUserLogin, setUserInfo}) {

    const [formState, setFormState] = useState(1);
    const [usernameState, setUsernameState] = useState('');
    const [emailState, setEmailState] = useState('');
    const [passwordState, setPasswordState] = useState('');
    const [passwordState2, setPasswordState2] = useState('');

    const handleErrors = (err) => {
        console.warn(err);
    }

    const handleLoginSubmit = (e) => {
        e.preventDefault()
        const loginInfo = {
            email: emailState,
            username: usernameState,
            password: passwordState,
        }
        const login = async () => {
            const options = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'X-CSRFToken': Cookies.get('csrftoken'),
                },
                body: JSON.stringify(loginInfo),
            }
            const response = await fetch('rest-auth/login/', options).catch(handleErrors);

            if(!response.ok) {
                alert('Username, email, or password was incorrect!')
                setUsernameState('');
                setEmailState('');
                setPasswordState('');
                throw new Error('Response was not ok!')
            }
        }
        login();
        setUserInfo(loginInfo)
        setUserLogin(true);
        setState(1);
        setUsernameState('');
        setEmailState('');
        setPasswordState('');
    }

    const handleRegisterSubmit = (e) => {
        e.preventDefault();

        if (passwordState !== passwordState2) {
            alert('Passwords do not match!');
            setPasswordState('');
            setPasswordState2('');
            return
        }

        const loginInfo = {
            username: usernameState,
            email: emailState,
            password: passwordState,
            password2: passwordState2,
        }
        const login = async () => {
            const options = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'X-CSRFToken': Cookies.get('csrftoken'),
                },
                body: JSON.stringify(loginInfo),
            }
            const response = await fetch('rest-auth/registraion/', options).catch(handleErrors);

            if(!response.ok) {
                throw new Error('Response was not ok!')
            }
        }
        login();
        setFormState(1)
        setUsernameState('');
        setEmailState('');
        setPasswordState('');
        setPasswordState2('')
    }


    const loginHTML = (
        <form onSubmit={handleLoginSubmit}>
            <label>Username</label>
            <input type='text' value={usernameState} onChange={(e) => setUsernameState(e.target.value)}/>
            <label>Email</label>
            <input type='email' value={emailState} onChange={(e) => setEmailState(e.target.value)}/>
            <label>Password</label>
            <input type='password' value={passwordState} onChange={(e) => setPasswordState(e.target.value)}/>
            <button type="submit">Login</button>
        </form>
    )

    const registerHTML = (
        <form onSubmit={handleRegisterSubmit}>
            <label>Username</label>
            <input type='text' value={usernameState} onChange={(e) => setUsernameState(e.target.value)}/>
            <label>Email</label>
            <input type='email' value={emailState} onChange={(e) => setEmailState(e.target.value)}/>
            <label>Password</label>
            <input type='password' value={passwordState} onChange={(e) => setPasswordState(e.target.value)}/>
            <label>Re-enter Password</label>
            <input type='password' value={passwordState2} onChange={(e) => setPasswordState2(e.target.value)}/>
            <button type="submit">Submit</button>
        </form>
    )

    return(
        <div>
            {formState == 1 && loginHTML}
            {formState == 2 && registerHTML}
        </div>
    )
}

export default LoginForm