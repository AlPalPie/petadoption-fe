import { useGetAnimalsQuery } from "./animalsApiSlice"
import Animal from './Animal'
import useTitle from "../../hooks/useTitle"
import PulseLoader from 'react-spinners/PulseLoader'
import { getAppTitle } from "../../App"
import { Link } from 'react-router-dom'
import useAuth from "../../hooks/useAuth"

const AnimalsList = () => {
    useTitle(`${getAppTitle()}: Animal List`)
    const { id: userId } = useAuth()

    const {
        data: animals,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetAnimalsQuery('animalsList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <PulseLoader color={"#FFF"} />

    let homeContent
    if (userId === '') {
        homeContent = <p><Link to="/">Back to Home Page</Link></p>
    } else {
        homeContent = <p><Link to="/dash">Back to User Dashboard</Link></p>
    }

    let errorContent
    if (isError) {
        errorContent = <p className="errmsg">{error?.data?.message}</p>
    }

    let animalContent
    if (isSuccess) {

        const { ids } = animals

        animalContent = (
            <div>
                {ids?.length && ids.map(animalEntityId => <Animal key={animalEntityId} animalEntityId={animalEntityId} />)}
            </div>
        )
    }


    content = (
        <>
            <div className="welcome">
                <h4>Behold these fuzzy and cuddly friends!<br></br></h4>
                <p><Link to="/dash/animals/new">Add a new Animal</Link></p>
                {homeContent}
                <br></br>
            </div>
            <div>
                {errorContent}
            </div>
            <div>
                {animalContent}
            </div>
        </>
    )



    return content
}
export default AnimalsList