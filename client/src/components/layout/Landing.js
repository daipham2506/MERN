import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => (
    <div>
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1 className="x-large">Developer Connector</h1>
                    <p className="lead">
                        Create a developer profile/portfolio, share posts and get help from
                        other developers
                    </p>
                    <div className="buttons">
                        <Link to='/login' className="btn btn-primary">Login</Link>
                        <Link to='/register' className="btn btn-default">Register</Link>
                    </div>
                </div>
            </div>
        </section>
    </div>
)

export default Landing;