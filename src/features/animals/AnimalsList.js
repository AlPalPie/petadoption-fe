import { useGetAnimalsQuery } from "./animalsApiSlice"
import Animal from './Animal'
import useTitle from "../../hooks/useTitle"
import PulseLoader from 'react-spinners/PulseLoader'
import { getAppTitle } from "../../App"
import { Link } from 'react-router-dom'

const AnimalsList = () => {
    useTitle(`${getAppTitle()}: Animal List`)

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
                <p><Link to="/dash">Back to Home Page</Link></p>
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