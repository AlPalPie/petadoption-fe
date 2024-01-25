import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import useTitle from '../../hooks/useTitle'
import { getAppTitle } from '../../App'

const Welcome = () => {

    const { username, isEmployee, isAdmin } = useAuth()

    useTitle(`Welcome ${username} to the ${getAppTitle()}`)

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (
        <section className="welcome">

            <p>{today}</p>

            <h1>Welcome {username}!</h1>

            <p><Link to="/dash/notes">View techNotes</Link></p>

            <p><Link to="/dash/animals">View animals</Link></p>

            <p><Link to="/dash/notes/new">Add New techNote</Link></p>

            {(isAdmin) && <p><Link to="/dash/users">View User Settings</Link></p>}

            {(isEmployee || isAdmin) && <p><Link to="/newuser">Add New User</Link></p>}

        </section>
    )

    return content
}
export default Welcome