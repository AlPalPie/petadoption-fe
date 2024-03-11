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
                <div className="intro">
                    <p>This is a personal project whose purpose is to sharpen my skills in full-stack development.</p>
                    <p>My wife and I live in a community where several stray cats have made a home amid the landscaping, 
                        mooching off many of the residents for sustenance and all-around being semi-affectionate bundles of joy.
                        We love to take daily walks to visit these cats and take care of them. One of them even brought us a tiny bird to our doorstep! (the bird managed to escape safely)
                    </p>
                    <p>I built this app to showcase these cats and to mimic a pet adoption website demonstrating the following features:</p>
                    <ul>
                        <li>Full Stack app using the MERN stack</li>
                        <li>Complete RESTful backend web API and database using ExpressJS, Mongoose, and MongoDB. and AWS EC2 as webhost</li>
                        <li>Frontend API requests and data caching with RTK Query</li>
                        <li>User authentication and authorization using JSON Web Tokens (JWT)</li>
                        <li>Frontend global state management using Redux and React</li>
                        <li>Support for uploading image files (JPEG/PNG) through multipart form data using the multer middleware package</li>
                        <li>Cloud object storage using Amazon AWS S3</li>
                    </ul>
                    <p>Users can perform the following actions:</p>
                    <ul>
                        <li>Users can view animal profiles and animal pictures.</li>
                        <li>Users must create an account and login in order to be able to add, update, or delete animals or images.</li>
                        <ul>
                            <li>Users can create an account with one of 3 roles, in order of increasing privileges - Customer, Employee, Admin.</li>
                            <li>For demonstration purposes, all 3 roles are available to anyone.</li>
                        </ul>
                        <li>Users can favorite animals and view a list of their favorite animals on their account dashboard</li>
                    </ul>
                </div>
                <div className="welcome">
                    <p><Link to="/dash/animals">View Animals</Link></p>
                    <p><Link to="/login">Login to add your own Animals or Images</Link></p>
                </div>
                <h4><br></br>These furry friends are all available for adoption!<br></br><br></br></h4>
                <ImagesList />
            </main>
            <footer>
                <span className="attribution">
                    <a href="https://www.freepik.com">*Background Image Designed by Elsystudio / Freepik</a>
                    {' : '}
                    <a href="https://icons8.com/icon/1OTMIGesNl9k/kissing-cat">Kissing Cat</a> favicon by <a href="https://icons8.com">Icons8</a>
                </span>
            </footer>
        </section>

    )
    return content
}
export default Public