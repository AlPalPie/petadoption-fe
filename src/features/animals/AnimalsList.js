import { useGetAnimalsQuery } from "./animalsApiSlice"
import Animal from './Animal'
import useTitle from "../../hooks/useTitle"
import PulseLoader from 'react-spinners/PulseLoader'
import { getAppTitle } from "../../App"

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

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {

        const { ids } = animals

        content = (
            <div>
                {ids?.length && ids.map(animalEntityId => <Animal key={animalEntityId} animalEntityId={animalEntityId} />)}
            </div>
        )
    }

    return content
}
export default AnimalsList