import { useState, useEffect } from "react"
import { useUpdateImageMutation, useDeleteImageMutation } from "./imagesApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import useAuth from "../../hooks/useAuth"

const EditImageForm = ({ image }) => {
    
    const { isEmployee, isAdmin } = useAuth()

    const [updateImage, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateImageMutation()

    const [deleteImage, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteImageMutation()

    const navigate = useNavigate()

    const [caption, setCaption] = useState(image.caption)

    useEffect(() => {

        if (isSuccess || isDelSuccess) {
            setCaption('')
            navigate('/dash/animals')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onCaptionChanged = e => setCaption(e.target.value)

    const canSave = [caption].every(Boolean) && !isLoading

    const onSaveImageClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await updateImage({ id: image.id, caption })
        }
    }

    const onDeleteImageClicked = async () => {
        await deleteImage({ id: image.id })
    }

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validCaptionClass = !caption ? "form__input--incomplete" : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''


    let deleteButton = null
    if (isEmployee || isAdmin) {
        deleteButton = (
            <button
                className="icon-button"
                name="Delete"
                onClick={onDeleteImageClicked}
            >
                <FontAwesomeIcon icon={faTrashCan} />
            </button>
        )
    }

    let srcImage = "https://via.placeholder.com/400"
    if (image.path) {
        srcImage = image.path
    }

    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edit Image #{image.ticket}</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveImageClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        {deleteButton}
                    </div>
                </div>

                <div style={ {width: '18rem'} }>
                    <img src={srcImage} className="card-img-top" alt={"FIXME"}></img>
                </div>

                <label className="form__label" htmlFor="image-caption">
                    Caption:</label>
                <textarea
                    className={`form__input form__input--caption ${validCaptionClass}`}
                    id="image-caption"
                    name="caption"
                    value={caption}
                    onChange={onCaptionChanged}
                />
            </form>
        </>
    )

    return content
}

export default EditImageForm