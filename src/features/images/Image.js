import { useGetImagesQuery } from './imagesApiSlice'
import { memo } from 'react'
import { getBaseUrl } from '../../app/api/apiSlice'

const Image = ({ imageEntityId }) => {

    
    const { image } = useGetImagesQuery("imagesList", {
        selectFromResult: ({ data }) => ({
            image: data?.entities[imageEntityId]
        }),
    })

    if (image) {

        let srcImage = "https://via.placeholder.com/400"
        if (image.path) {
            srcImage = getBaseUrl() + '/' + image.path
        }
        console.log(srcImage)

        return (

            <div className="card" style={ {width: '18rem'} }>
                <img src={srcImage} className="card-img-top" alt={"TBD"}></img>
                <div className="card-body">
                    <p className="card-text">{image.caption}</p>
                </div>
            </div>

        )

    } else return null
}

const memoizedImage = memo(Image)

// when you import Image from './Image' in another module, you're actually importing the memoized version of the Image component, thanks to the memo function
// This can be useful for optimizing performance in situations where the Image component's re-rendering can be avoided by memoization.
export default memoizedImage