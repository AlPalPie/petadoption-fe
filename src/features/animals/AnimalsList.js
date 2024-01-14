import { useGetAnimalsQuery } from "./animalsApiSlice"
import Animal from './Animal'
import useTitle from "../../hooks/useTitle"
import PulseLoader from 'react-spinners/PulseLoader'

const AnimalsList = () => {
    useTitle('Animals List')

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
                {ids?.length && ids.map(animalId => <Animal key={animalId} animalId={animalId} />)}
            </div>
        )
    }

    return content
}
export default AnimalsList