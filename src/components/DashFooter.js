import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse } from "@fortawesome/free-solid-svg-icons"
import { useNavigate, useLocation } from 'react-router-dom'
import useAuth from "../hooks/useAuth"

const DashFooter = () => {

    const { username, status } = useAuth()

    const navigate = useNavigate()
    const { pathname } = useLocation()

    const onGoHomeClicked = () => {
        if (!status) {
            navigate('/')
        } else {
            navigate('/dash')
        }
    }

    let goHomeButton = null
    if (pathname !== '/dash') {
        goHomeButton = (
            <button
                className="dash-footer__button icon-button"
                title="Home"
                onClick={onGoHomeClicked}
            >
                <FontAwesomeIcon icon={faHouse} />
            </button>
        )
    }

    const content = (
        <footer className="dash-footer">
            <div className="dash-footer__info">
                {goHomeButton}
                {(username) ? (<p>Current User: {username}</p>) : ""}
                {(status) ? (<p>Status: {status}</p>) : ""}
            </div>
            <span className="attribution">
                    <a href="https://www.freepik.com">*Background Image Designed by Elsystudio / Freepik</a>
                    {' : '}
                    <a href="https://icons8.com/icon/1OTMIGesNl9k/kissing-cat">Kissing Cat</a> favicon by <a href="https://icons8.com">Icons8</a>
            </span>
            
        </footer>
    )
    return content
}
export default DashFooter