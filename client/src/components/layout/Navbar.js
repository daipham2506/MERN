import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../appRedux/actions/auth'

const Navbar = () => {

    const authState = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const authLinks = (
        <ul>
            <Link onClick = { () => dispatch(logout())} to="/"><i className="fas fa-power-off"></i> Logout</Link>
        </ul>
    )

    const guestLinks = (
        <ul>
            <Link to="/">Developers</Link>
            <Link to="/register">Register</Link>
            <Link to='/login'>Login</Link>
        </ul>
    )
    return (
        <div>
            <nav class="navbar bg-dark">
                <h1>
                    <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
                </h1>
                { !authState.loading && authState.isAuthenticated ? authLinks : guestLinks}
            </nav>
        </div>
    );
}



export default Navbar;