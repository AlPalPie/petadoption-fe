import { useParams } from 'react-router-dom'
import EditImageForm from './EditImageForm'
import { useGetImagesQuery } from './imagesApiSlice'
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from '../../hooks/useTitle'
import { getAppTitle } from '../../App'

const EditImage = () => {
    useTitle(`${getAppTitle()}: Edit Image`)

    const { id } = useParams()

    const { image } = useGetImagesQuery("imagesList", {
        selectFromResult: ({ data }) => ({
            image: data?.entities[id]
        }),
    })

    if (!image) return <PulseLoader color={"#FFF"} />

    const content = <EditImageForm image={image} />

    return content
}
export default EditImage