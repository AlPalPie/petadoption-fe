import { useGetAnimalsQuery } from './animalsApiSlice'
import { memo } from 'react'
import { useGetImagesQuery } from '../images/imagesApiSlice'
import Image from '../images/Image'
import PulseLoader from 'react-spinners/PulseLoader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPencil,
    faStar as faStarSolid
} from "@fortawesome/free-solid-svg-icons"
import {
    faStar as faStarRegular
} from "@fortawesome/free-regular-svg-icons"
import { useNavigate } from 'react-router-dom'
import useAuth from "../../hooks/useAuth"
import { useUpdateUserFavoritesMutation } from "../users/usersApiSlice"
import { useGetUsersQuery } from '../users/usersApiSlice'

const Animal = ({ animalEntityId }) => {

    const navigate = useNavigate()

    const { id: userId } = useAuth()

    const { user } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            user: data?.entities[userId]
        }),
    })

    const [updateUserFavorites, {
        // eslint-disable-next-line
        isLoading: isUpdateUserLoading,
        // eslint-disable-next-line
        isSuccess: isUpdateUserSuccess,
        // eslint-disable-next-line
        isError: isUpdateUserError,
        // eslint-disable-next-line
        error: updateUserError
    }] = useUpdateUserFavoritesMutation()


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
    const onFavoriteAnimalClickedNotLoggedIn = () => navigate('/login')
    const onFavoriteAnimalClicked = async (e) => {
        await updateUserFavorites({ userId, animalId })
    }


    let favoriteButton
    if (userId === '') {
        const favoriteIcon = <FontAwesomeIcon icon={faStarRegular} />
        
        favoriteButton = (
            <button className="icon-button" title="Favorite Animal" onClick={onFavoriteAnimalClickedNotLoggedIn}>
                <div className="icon-row">{favoriteIcon}</div>
            </button>
        )
    } else {
        const favorites = user.favorites
        let favoriteIcon
        if (favorites.includes(animalId)) {
            favoriteIcon = <FontAwesomeIcon icon={faStarSolid} />
        } else {
            favoriteIcon = <FontAwesomeIcon icon={faStarRegular} />
        }
    
        favoriteButton = (
            <button className="icon-button" title="Favorite Animal" onClick={onFavoriteAnimalClicked}>
                <div className="icon-row">{favoriteIcon}</div>
            </button>
        )
    }

    if (animal) {
        content = (
            <>
                <div className="animal_card">
                    <div className="animal_profile">
                        <div className="inline">
                            <h1>{animal.name}</h1>
                            <button
                                className="icon-button"
                                title="Edit Animal"
                                onClick={onEditAnimalClicked}
                            >
                                <div className="icon-row">
                                    <FontAwesomeIcon icon={faPencil} />
                                </div>
                            </button>
                            {favoriteButton}
                        </div>
                        <p>{animal.description}</p>
                    </div>
                    <div>
                        <div className="images_list">
                            {imageContent}
                        </div>
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