import { useParams } from 'react-router-dom'
import EditAnimalForm from './EditAnimalForm'
import { useGetAnimalsQuery } from './animalsApiSlice'
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from '../../hooks/useTitle'
import { getAppTitle } from '../../App'

const EditAnimal = () => {
    useTitle(`${getAppTitle()}: Edit Animal`)

    const { id } = useParams()

    const { animal } = useGetAnimalsQuery("animalsList", {
        selectFromResult: ({ data }) => ({
            animal: data?.entities[id]
        }),
    })

    if (!animal) return <PulseLoader color={"#FFF"} />

    const content = <EditAnimalForm animal={animal} />

    return content
}
export default EditAnimal