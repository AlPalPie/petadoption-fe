import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewAnimalMutation } from "./animalsApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"

const NewAnimalForm = () => {

    const [addNewAnimal, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewAnimalMutation()

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [file, setFile] = useState(null)

    useEffect(() => {
        if (isSuccess) {
            setName('')
            setDescription('')
            navigate('/dash/animals')
        }
    }, [isSuccess, navigate])

    const onNameChanged = e => setName(e.target.value)
    const onDescriptionChanged = e => setDescription(e.target.value)
    const onFileChanged = e => {
        const file = e.target.files[0]
        setFile(file)
    }

    const canSave = [name, description].every(Boolean) && !isLoading

    const onSaveAnimalClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            console.log(`Creating New Animal with name = ${name}`)
            let multiFormData = new FormData();
            multiFormData.append("multerimage", file)
            multiFormData.append("name", name)
            multiFormData.append("description", description)

            const result = await addNewAnimal(multiFormData)
            console.log('Upload response:', result.data)
        }
    }

    const errClass = isError ? "errmsg" : "offscreen"
    const validNameClass = !name ? "form__input--incomplete" : ''
    const validDescriptionClass = !description ? "form__input--incomplete" : ''

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" encType="multipart/form-data" onSubmit={onSaveAnimalClicked}>
                <div className="form__name-row">
                    <h2>New Animal</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="name">
                    Name:</label>
                <input
                    className={`form__input ${validNameClass}`}
                    id="name"
                    name="name"
                    type="description"
                    autoComplete="off"
                    value={name}
                    onChange={onNameChanged}
                />

                <label className="form__label" htmlFor="description">
                    Description:</label>
                <textarea
                    className={`form__input form__input--text ${validDescriptionClass}`}
                    id="description"
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

export default NewAnimalForm