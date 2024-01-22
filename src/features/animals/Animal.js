import { useGetAnimalsQuery } from './animalsApiSlice'
import { memo } from 'react'
import { useGetImagesQuery } from '../images/imagesApiSlice'
import Image from '../images/Image'
import PulseLoader from 'react-spinners/PulseLoader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPencil
} from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

const Animal = ({ animalEntityId }) => {

    const navigate = useNavigate()

    const { animal } = useGetAnimalsQuery("animalsList", {
        selectFromResult: ({ data }) => ({
            animal: data?.entities[animalEntityId]
        }),
    })
    const animalId = animal.id

    const {
        data: images,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetImagesQuery('imagesList', {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <PulseLoader color={"#FFF"} />

    if (isError) content = <p className="errmsg">{error?.data?.message}</p>

    let imageContent = <p>No images</p>
    if (isSuccess) {
        const { ids: imageEntityIds, entities: imageEntities } = images
        const filteredImageEntityIds = imageEntityIds.filter(imageEntityId => imageEntities[imageEntityId].animal === animalId)
        imageContent = filteredImageEntityIds?.length && filteredImageEntityIds.map(imageEntityId => <Image key={imageEntityId} imageEntityId={imageEntityId} />)
    }

    const onEditAnimalClicked = () => navigate(`/dash/animals/${animalEntityId}`)


    if (animal) {
        content = (
            <>
                <div className="inline">
                    <h3>{animal.name}</h3>
                    <button
                        className="icon-button"
                        title="Edit Animal"
                        onClick={onEditAnimalClicked}
                    >
                        <div className="icon-row">
                            <FontAwesomeIcon icon={faPencil} />
                        </div>
                    </button>
                </div>
                <p>{animal.description}</p>
                <div>
                    <div className="images_list">
                        {imageContent}
                    </div>
                </div>
            </>
        )
        return content

    } else return null
}

const memoizedAnimal = memo(Animal)

// when you import Animal from './Animal' in another module, you're actually importing the memoized version of the Animal component, thanks to the memo function
// This can be useful for optimizing performance in situations where the Animal component's re-rendering can be avoided by memoization.
export default memoizedAnimal