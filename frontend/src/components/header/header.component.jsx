import React from 'react'
import {Link} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
import {logoutUser} from "../../redux/auth/auth.actions"

const Header = () => {
    const isAuthenticated = useSelector(({authReducer}) => authReducer.isAuthenticated)
    const currentUser = useSelector(({authReducer}) => authReducer.user)
    const dispatch = useDispatch();
    
    const onLogout = (e) => {
        e.preventDefault();
        dispatch(logoutUser())
    }

    return (
        <header>
            <h1>Header</h1>
            Logged In as: {currentUser && currentUser.username}


            {isAuthenticated ?
                <React.Fragment>
                    <button onClick={onLogout}>Logout</button>
                </React.Fragment>
                :
                <React.Fragment>
                     <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                </React.Fragment>
            }


           
            
        </header>
    )
}

export default Header;