import { Link } from 'react-router-dom'
import ImagesList from '../features/images/ImagesList'
import { getAppTitle } from '../App'

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to the <span className="nowrap">{getAppTitle()}</span></h1>
            </header>
            <main className="public__main">
                <h3>These furry friends are all available for adoption!</h3>
                <ImagesList />
            </main>
            <footer>
                <Link to="/login">User Login</Link>
                <Link to="/newuser">Create Account</Link>
                <span className="attribution">
                    <a href="http://www.freepik.com">*Background Image Designed by Elsystudio / Freepik</a>
                </span>
            </footer>
        </section>

    )
    return content
}
export default Public