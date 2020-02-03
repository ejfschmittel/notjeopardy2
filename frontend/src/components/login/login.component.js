import React, {useState} from 'react'
import {useSelector, useDispatch} from "react-redux"
import {loginUser} from "../../redux/auth/auth.actions"


const LoginPage = () => {
    const dispatch = useDispatch();

    const [loginData, setLoginData] = useState({
        username_or_email: "",
        password: "",
    })
    
    const onLoginDataChange = (e) => {
        const {name, value} = e.target
        setLoginData({...loginData, [name]: value})
    }

    const onLogin = (e) => {
        e.preventDefault();
        dispatch(loginUser(loginData))
    }

    return (
        <div>
            <h1>LoginPage</h1>
            <form style={{display: "flex", flexDirection: "column"}}>
                <input name="username_or_email" placeholder="Username or Email" onChange={onLoginDataChange} value={loginData.username_or_email}/>
                <input type="password" name="password" placeholder="Password" onChange={onLoginDataChange} value={loginData.password}/>   
                <button onClick={onLogin}>Login</button>
            </form>
        </div>
    )
}

export default LoginPage