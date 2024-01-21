import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse } from "@fortawesome/free-solid-svg-icons"
import { useNavigate, useLocation } from 'react-router-dom'
import useAuth from "../hooks/useAuth"

const DashFooter = () => {

    const { username, status } = useAuth()

    const navigate = useNavigate()
    const { pathname } = useLocation()

    const onGoHomeClicked = () => navigate('/dash')

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
                <p>Current User: {username}</p>
                <p>Status: {status}</p>
            </div>
            <span className="attribution">
                    <a href="http://www.freepik.com">*Background Image Designed by Elsystudio / Freepik</a>
            </span>
        </footer>
    )
    return content
}
export default DashFooter