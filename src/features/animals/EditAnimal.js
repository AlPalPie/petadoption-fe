import { useParams } from 'react-router-dom'
import EditAnimalForm from './EditAnimalForm'
import { useGetAnimalsQuery } from './animalsApiSlice'
import { useGetUsersQuery } from '../users/usersApiSlice'
import useAuth from '../../hooks/useAuth'
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from '../../hooks/useTitle'
import { getAppTitle } from '../../App'

const EditAnimal = () => {
    useTitle(`${getAppTitle()}: Edit Animal`)

    const { id } = useParams()

    const { username, isManager, isAdmin } = useAuth()

    const { animal } = useGetAnimalsQuery("animalsList", {
        selectFromResult: ({ data }) => ({
            animal: data?.entities[id]
        }),
    })

    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        }),
    })

    if (!animal || !users?.length) return <PulseLoader color={"#FFF"} />


    if (!isManager && !isAdmin) {
        if (animal.username !== username) {
            return <p className="errmsg">No access</p>
        }
    }

    const content = <EditAnimalForm animal={animal} users={users} />

    return content
}
export default EditAnimal