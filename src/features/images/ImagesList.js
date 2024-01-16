import { useGetImagesQuery } from "./imagesApiSlice"
import Image from './Image'
import PulseLoader from 'react-spinners/PulseLoader'

const ImagesList = () => {

    const {
        data: images,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetImagesQuery('imagesList', {
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

        const { ids } = images
        content = (
            <div>
                {ids?.length && ids.map(imageEntityId => <Image key={imageEntityId} imageEntityId={imageEntityId} />)}
            </div>
        )
    }

    return content
}
export default ImagesList