import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from "react-redux"
import {signUpUser} from "../../redux/auth/auth.actions"





const useSignupError = () => {
    const [errorText, setErrorText] = useState(null);
    const signUpErrors = useSelector((state) => state.authReducer.signupError);

    useEffect(() => {
        console.log("effect trigger")
        console.log(signUpErrors)
        if(signUpErrors){
            const firstObjectKey = Object.keys(signUpErrors)[0]
            const text = signUpErrors[firstObjectKey][0]
            setErrorText(text);
        }else if(signUpErrors === null && errorText !== null){
            setErrorText(null)
        }       
    }, [signUpErrors, errorText])

    return errorText;
}


const SignupPage = () => {
    const [signupData, setSignupData] = useState({
        username: "",
        email: "",
        password: "",
        confirm_password: ""
    })
    const isSigningUp = useSelector(({authReducer}) => authReducer.isSigningUp);
    const dispatch = useDispatch()

    
   const signUpError = useSignupError();
    
    const onSignupDataChange = (e) => {
        const {name, value} = e.target
        setSignupData({...signupData, [name]: value})
    }

    const onSignup = (e) => {
        e.preventDefault();
        const {confirm_password, ...sendSignupData} = signupData

        if(confirm_password !== signupData.password){
            // error
        }else{
            dispatch(signUpUser(sendSignupData))
        }     
    }

    return (
        <div>
            <h1>Signup Page</h1>
            <p>SignupError: {signUpError}</p>
            <form style={{display: "flex", flexDirection: "column"}}>
                <input name="username" placeholder="Username" onChange={onSignupDataChange} value={signupData.username}/>
                <input name="email" placeholder="Email" onChange={onSignupDataChange} value={signupData.email}/>
                <input type="password" name="password" placeholder="Password" onChange={onSignupDataChange} value={signupData.password}/>
                <input type="password" name="confirm_password" placeholder="Confirm Password" onChange={onSignupDataChange} value={signupData.password_again}/>
                <button onClick={onSignup} disabled={isSigningUp}>Singup</button>
            </form>
        </div>
    )
}

export default SignupPage