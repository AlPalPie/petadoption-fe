import { useState, useEffect } from "react"
import { useAddNewUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
import { ROLES } from "../../config/roles"
import useTitle from "../../hooks/useTitle"
import { getAppTitle } from "../../App"
import { Link } from 'react-router-dom'

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const NewUserForm = () => {
    useTitle(`${getAppTitle()}: New User`)

    const [addNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(["Customer"])

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        if (isSuccess) {
            setUsername('')
            setPassword('')
            setRoles([])
            navigate('/')
        }
    }, [isSuccess, navigate])

    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions, //HTMLCollection 
            (option) => option.value
        )
        setRoles(values)
    }

    const canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading

    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewUser({ username, password, roles })
        }
    }

    const options = Object.values(ROLES).map(role => {
        return (
            <option
                key={role}
                value={role}

            > {role}</option >
        )
    })

    const errClass = isError ? "errmsg" : "offscreen"
    const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    const validPwdClass = !validPassword ? 'form__input--incomplete' : ''
    const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''


    const content = (
        <>
            <section className="public">
                <header>
                    <h1>New User</h1>
                </header>
                <main className="login">
                    <p className={errClass}>{error?.data?.message}</p>

                    <form className="form" onSubmit={onSaveUserClicked}>
                        <div className="form__title-row">
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
                        <label className="form__label" htmlFor="username">
                            Username: <span className="nowrap">[3-20 letters]</span></label>
                        <input
                            className={`form__input ${validUserClass}`}
                            id="username"
                            name="username"
                            type="text"
                            autoComplete="off"
                            value={username}
                            onChange={onUsernameChanged}
                        />

                        <label className="form__label" htmlFor="password">
                            Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
                        <input
                            className={`form__input ${validPwdClass}`}
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={onPasswordChanged}
                        />

                        <label className="form__label" htmlFor="roles">
                            USER ROLE:
                        </label>
                        <select
                            id="roles"
                            name="roles"
                            className={`form__select ${validRolesClass}`}
                            multiple={true}
                            size="3"
                            value={roles}
                            onChange={onRolesChanged}
                        >
                            {options}
                        </select>

                        <div className="subtext">
                            <p>Role permissions are as follows:</p>
                            <p>Customer:</p>
                            <ul>
                                <li>View Animals and Images</li>
                                <li>Update Animals and Images</li>
                                <li>Add new Images</li>
                            </ul>
                            <p>Employee:</p>
                            <ul>
                                <li>All permissions a Customer has</li>
                                <li>Add new Animals</li>
                                <li>Delete Animals and Images</li>
                            </ul>
                            <p>Admin:</p>
                            <ul>
                                <li>All permissions a Employee or Customer has</li>
                                <li>Delete Users</li>
                            </ul>
                        </div>

                    </form>

                    <p className="margintop">Already have an account? <Link to="/login" className="underline" >Log In</Link></p>
                </main>
                <footer>
                    <Link to="/">Back to Home</Link>
                </footer>
            </section>
        </>
    )

    return content
}
export default NewUserForm