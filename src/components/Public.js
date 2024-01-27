import { Link } from 'react-router-dom'
import ImagesList from '../features/images/ImagesList'
import { getAppTitle } from '../App'

const Public = () => {

    const content = (
        <section className="public">
            <header>
                <h3>
                    <span className="nowrap floatleft">Welcome to the {getAppTitle()}!</span>
                    <span className="public__auth floatright">
                        <span><Link to="/login" className="public__auth">User Login</Link></span>
                        <span><Link to="/newuser">Create Account</Link></span>
                    </span>
                </h3>
            </header>
            <main className="public__main">
                <div className="welcome">
                    <p><Link to="/dash/animals">View Animals</Link></p>
                    <p><Link to="/login">Login to add your own Animals or Images</Link></p>
                </div>
                <h4><br></br>These furry friends are all available for adoption!<br></br><br></br></h4>
                <ImagesList />
            </main>
            <footer>
                <span className="attribution">
                    <a href="http://www.freepik.com">*Background Image Designed by Elsystudio / Freepik</a>
                </span>
            </footer>
        </section>

    )
    return content
}
export default Public