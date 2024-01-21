import NewAnimalForm from './NewAnimalForm'
import useTitle from '../../hooks/useTitle'
import { getAppTitle } from '../../App'

const NewAnimal = () => {
    useTitle(`${getAppTitle()}: New Animal`)

    const content = <NewAnimalForm />

    return content
}
export default NewAnimal
