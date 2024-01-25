import { useGetImagesQuery } from './imagesApiSlice'
import { memo } from 'react'
import { getBaseUrl } from '../../app/api/apiSlice'
import { useNavigate } from 'react-router-dom'

const Image = ({ imageEntityId }) => {

    const navigate = useNavigate()

    const { image } = useGetImagesQuery("imagesList", {
        selectFromResult: ({ data }) => ({
            image: data?.entities[imageEntityId]
        }),
    })


    const onEditImageClicked = () => navigate(`/dash/animals/image/${imageEntityId}`)

    if (image) {

        let srcImage = "https://via.placeholder.com/400"
        if (image.path) {
            srcImage = getBaseUrl() + '/' + image.path
        }

        return (

            <div className="card" style={ {width: '18rem'} }>
                <button
                    title="Edit Image"
                    onClick={onEditImageClicked}
                >
                    <img src={srcImage} className="card-img-top" alt={"FIXME"}></img>
                    <div className="card-body">
                        <p className="card-text">{image.caption}</p>
                    </div>
                </button>
            </div>

        )

    } else return null
}

const memoizedImage = memo(Image)

// when you import Image from './Image' in another module, you're actually importing the memoized version of the Image component, thanks to the memo function
// This can be useful for optimizing performance in situations where the Image component's re-rendering can be avoided by memoization.
export default memoizedImage