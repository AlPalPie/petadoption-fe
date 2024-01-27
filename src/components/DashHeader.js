import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faFileCirclePlus,
    faFilePen,
    faUserGear,
    faUserPlus,
    faRightFromBracket,
    faCat,
    faPlus
} from "@fortawesome/free-solid-svg-icons"
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import useAuth from '../hooks/useAuth'
import PulseLoader from 'react-spinners/PulseLoader'
import { getAppTitle } from '../App'

const DASH_REGEX = /^\/dash(\/)?$/
const NOTES_REGEX = /^\/dash\/notes(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/
const ANIMALS_REGEX = /^\/dash\/animals(\/)?$/


const DashHeader = () => {
    const { status, isEmployee, isAdmin } = useAuth()

    const navigate = useNavigate()
    const { pathname } = useLocation()

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])

    const onNewNoteClicked = () => navigate('/dash/notes/new')
    const onNewUserClicked = () => navigate('/dash/users/new')
    const onNewAnimalClicked = () => navigate('/dash/animals/new')
    const onAnimalsClicked = () => navigate('/dash/animals')
    const onNotesClicked = () => navigate('/dash/notes')
    const onUsersClicked = () => navigate('/dash/users')

    let dashClass = null
    if (!DASH_REGEX.test(pathname) && !NOTES_REGEX.test(pathname) && !USERS_REGEX.test(pathname) && !ANIMALS_REGEX.test(pathname)) {
        dashClass = "dash-header__container--small"
    }

    let newNoteButton = null
    if (NOTES_REGEX.test(pathname)) {
        // FIXME:
        // eslint-disable-next-line
        newNoteButton = (
            <button
                className="icon-button"
                title="New Note"
                onClick={onNewNoteClicked}
            >
                <FontAwesomeIcon icon={faFileCirclePlus} />
            </button>
        )
    }

    let newAnimalButton = null
    if (ANIMALS_REGEX.test(pathname) && (isEmployee || isAdmin)) {
        newAnimalButton = (
            <button
                className="icon-button"
                title="New Animal"
                onClick={onNewAnimalClicked}
            >
                <div className="icon-row">
                    <FontAwesomeIcon icon={faPlus} />
                </div>
            </button>
        )
    }

    let newUserButton = null
    if (USERS_REGEX.test(pathname)) {
        newUserButton = (
            <button
                className="icon-button"
                title="New User"
                onClick={onNewUserClicked}
            >
                <FontAwesomeIcon icon={faUserPlus} />
            </button>
        )
    }

    let animalButton = null
    if (!ANIMALS_REGEX.test(pathname) && pathname.includes('/dash')) {
        animalButton = (
            <button
                className="icon-button"
                title="Animals"
                onClick={onAnimalsClicked}
            >
                <div className="icon-row">
                    <FontAwesomeIcon icon={faCat} />
                </div>
            </button>
        )
    }

    let userButton = null
    if (isAdmin) {
        if (!USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
            userButton = (
                <button
                    className="icon-button"
                    title="Users"
                    onClick={onUsersClicked}
                >
                    <FontAwesomeIcon icon={faUserGear} />
                </button>
            )
        }
    }

    let notesButton = null
    if (!NOTES_REGEX.test(pathname) && pathname.includes('/dash')) {
        // FIXME:
        // eslint-disable-next-line
        notesButton = (
            <button
                className="icon-button"
                title="Notes"
                onClick={onNotesClicked}
            >
                <FontAwesomeIcon icon={faFilePen} />
            </button>
        )
    }

    let logoutButton = null
    if (status) {
        logoutButton = (
            <button
                className="icon-button"
                title="Logout"
                onClick={sendLogout}
            >
                <FontAwesomeIcon icon={faRightFromBracket} />
            </button>
        )
    }

    const errClass = isError ? "errmsg" : "offscreen"

    let buttonContent
    if (isLoading) {
        buttonContent = <PulseLoader color={"#FFF"} />
    } else {
        buttonContent = (
            <>
                {newAnimalButton}
                {/* FIXME: newNoteButton */}
                {newUserButton}
                {animalButton}
                {/* FIXME: notesButton */}
                {userButton}
                {logoutButton}
            </>
        )
    }


    let authContent
    if (!status) {
        authContent = (
            <>
                <span className="public__auth floatright">
                    <span><Link to="/login" className="public__auth">User Login</Link></span>
                    <span><Link to="/newuser">Create Account</Link></span>
                </span>
            </>
        )
    }

    const content = (
        <>
            <header className="dash-header">
                <div className={`dash-header__container ${dashClass}`}>
                    <Link to="/dash">
                        <h1 className="dash-header__title">{getAppTitle()}</h1>
                    </Link>
                    {authContent}
                    <nav className="dash-header__nav">
                        {buttonContent}
                    </nav>
                </div>
            </header>
            <p className={errClass}>{error?.data?.message}</p>
        </>
    )

    return content
}
export default DashHeader