import { useGetAnimalsQuery } from './animalsApiSlice'
import { memo } from 'react'

const Animal = ({ animalId }) => {

    const { animal } = useGetAnimalsQuery("animalsList", {
        selectFromResult: ({ data }) => ({
            animal: data?.entities[animalId]
        }),
    })

    if (animal) {

        return (

            <div className="card" style={ {width: '18rem'} }>
                <img src={"https://via.placeholder.com/400"} className="card-img-top" alt={animal.name}></img>
                <div className="card-body">
                    <p className="card-text">{animal.description}</p>
                    <p className="card-text">{animal.pics}</p>
                </div>
            </div>

        )

    } else return null
}

const memoizedAnimal = memo(Animal)

// when you import Animal from './Animal' in another module, you're actually importing the memoized version of the Animal component, thanks to the memo function
// This can be useful for optimizing performance in situations where the Animal component's re-rendering can be avoided by memoization.
export default memoizedAnimal