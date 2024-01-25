import { useState, useEffect } from "react"
import { useUpdateAnimalMutation, useDeleteAnimalMutation } from "./animalsApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import useAuth from "../../hooks/useAuth"

const EditAnimalForm = ({ animal }) => {
    
    const { isEmployee, isAdmin } = useAuth()

    const [updateAnimal, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateAnimalMutation()

    const [deleteAnimal, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteAnimalMutation()

    const navigate = useNavigate()

    const [name, setName] = useState(animal.name)
    const [description, setDescription] = useState(animal.description)
    const [file, setFile] = useState(null)

    useEffect(() => {

        if (isSuccess || isDelSuccess) {
            setName('')
            setDescription('')
            navigate('/dash/animals')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onNameChanged = e => setName(e.target.value)
    const onDescriptionChanged = e => setDescription(e.target.value)
    const onFileChanged = e => setFile(e.target.files[0])

    const canSave = [name, description].every(Boolean) && !isLoading

    const onSaveAnimalClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            let multiFormData = new FormData();
            multiFormData.append("id", animal.id)
            multiFormData.append("name", name)
            multiFormData.append("description", description)
            multiFormData.append("multerimage", file)

            await updateAnimal(multiFormData)
        }
    }


    const onDeleteAnimalClicked = async () => {
        await deleteAnimal({ name })
    }

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validNameClass = !name ? "form__input--incomplete" : ''
    const validDescriptionClass = !description ? "form__input--incomplete" : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''


    let deleteButton = null
    if (isEmployee || isAdmin) {
        deleteButton = (
            <button
                className="icon-button"
                name="Delete"
                onClick={onDeleteAnimalClicked}
            >
                <FontAwesomeIcon icon={faTrashCan} />
            </button>
        )
    }

    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edit Animal #{animal.ticket}</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveAnimalClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        {deleteButton}
                    </div>
                </div>
                <label className="form__label" htmlFor="animal-name">
                    Name:</label>
                <input
                    className={`form__input ${validNameClass}`}
                    id="animal-name"
                    name="name"
                    type="text"
                    autoComplete="off"
                    value={name}
                    onChange={onNameChanged}
                />

                <label className="form__label" htmlFor="animal-description">
                    Description:</label>
                <textarea
                    className={`form__input form__input--description ${validDescriptionClass}`}
                    id="animal-description"
                    name="description"
                    value={description}
                    onChange={onDescriptionChanged}
                />

                <label className="form__label form__checkbox-container" htmlFor="multerimage">
                    UPLOAD IMAGE:</label>
                <input
                    type="file"
                    id="multerimage"
                    name="multerimage"
                    onChange={onFileChanged}
                />
            </form>
        </>
    )

    return content
}

export default EditAnimalForm