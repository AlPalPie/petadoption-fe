import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import useTitle from '../../hooks/useTitle'
import { getAppTitle } from '../../App'
import { useGetUsersQuery } from '../users/usersApiSlice'
import { useGetAnimalsQuery } from '../animals/animalsApiSlice'
import PulseLoader from 'react-spinners/PulseLoader'

const Welcome = () => {

    const { id, username, isAdmin } = useAuth()

    useTitle(`Welcome ${username} to the ${getAppTitle()}`)

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const {
        data: usersData,
        isLoading: usersLoading,
        isSuccess: usersSuccess,
        isError: usersIsError,
        error: usersError
    } = useGetUsersQuery("usersList");
    const usersEntities = usersData?.entities

    const {
        data: animalsData,
        isLoading: animalsLoading,
        isSuccess: animalsSuccess,
        isError: animalsIsError,
        error: animalsError
    } = useGetAnimalsQuery("animalsList");
    const animalsEntities = animalsData?.entities



    let favoritesSection

    if (usersIsError) favoritesSection = <p className="errmsg">{usersError?.data?.message}</p>
    if (usersLoading) favoritesSection = <PulseLoader color={"#FFF"} />

    if (usersSuccess) {
        const user = usersEntities[id]

        const favorites = user.favorites
    
        if (favorites?.length === 0) {
            favoritesSection = <p>No animals favorited yet.</p>
        } else {
            if (animalsLoading) favoritesSection = <PulseLoader color={"#FFF"} />

            if (animalsIsError) {
                favoritesSection = <p className="errmsg">{animalsError?.data?.message}</p>
            }

            if (animalsSuccess) {
                const tableContent = favorites?.length && favorites.map(animalId => {
                    const animal = animalsEntities[animalId]
                    if (!animal) return null
                    return (
                    <tr key={animalId} className="table__row user">
                        <td className={`table__cell`}>{animal.name}</td>
                        <td className={`table__cell`}>{animal.description}</td>
                    </tr>
                    )
                })

                favoritesSection = (
                    <>
                        <h3>Here are your favorite animals!</h3>

                        <table className="table__favorites">
                            <thead className="table__thead">
                                <tr>
                                    <th scope="col" className="table__th">Animal Name</th>
                                    <th scope="col" className="table__th">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableContent}
                            </tbody>
                        </table>
                    </>
                )
            }
        }
    }


    const content = (
        <section className="welcome">

            <p>{today}</p>

            <h1>Welcome {username}!</h1>

            {/* FIXME: <p><Link to="/dash/notes">View techNotes</Link></p> */}

            <p><Link to="/dash/animals">View Animals</Link></p>

            {/* FIXME: <p><Link to="/dash/notes/new">Add New techNote</Link></p> */}

            {(isAdmin) && <p><Link to="/dash/users">View User Settings</Link></p>}

            {(isAdmin) && <p><Link to="/newuser">Add New User</Link></p>}

            {favoritesSection}

        </section>
    )

    return content
}
export default Welcome