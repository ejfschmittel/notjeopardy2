import React from 'react'
import {Link} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
import {logoutUser} from "../../redux/auth/auth.actions"

import "./header.styles.scss"

const Header = () => {
    const isAuthenticated = useSelector(({authReducer}) => authReducer.isAuthenticated)
    const currentUser = useSelector(({authReducer}) => authReducer.user)
    const dispatch = useDispatch();
    
    const onLogout = (e) => {
        e.preventDefault();
        dispatch(logoutUser())
    }

    return (
        <header className="header">
            <Link to="/" className="header__title">Not Jeopardy</Link>
            <nav className="header__nav">
                <ul>
                    <li className="header__nav-item"><Link to="/">Explore</Link></li>
                    {isAuthenticated ? 
                        <React.Fragment>
                            
                            <li className="header__nav-item"><Link to="/quiz/create">Create Quiz</Link></li>
                            <li className="header__nav-item"><Link to={`/users/${currentUser.username}/`}>{currentUser.username}</Link></li>
                            <li className="header__nav-item"><Link to={`/users/${currentUser.username}/questions/`}>My Questions</Link></li>
                            <li className="header__nav-item"><Link to={`/users/${currentUser.username}/categories/`}>My Categories</Link></li>
                            <li className="header__nav-item"><button onClick={onLogout}>Logout</button></li>
                        </React.Fragment>
                    :
                        <React.Fragment>
                            <li className="header__nav-item"><Link to="/login">Login</Link></li>
                            <li className="header__nav-item"><Link to="/signup">Signup</Link></li>
                        </React.Fragment>
                    }
                </ul>
            </nav>
        </header>
    )
}

export default Header;