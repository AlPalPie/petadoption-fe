import NewAnimalForm from './NewAnimalForm'
import useTitle from '../../hooks/useTitle'

const NewAnimal = () => {
    useTitle('Amazing Animal Adoption Agency: New Animal')

    const content = <NewAnimalForm />

    return content
}
export default NewAnimal
