import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import { jwtDecode } from 'jwt-decode'

const useAuth = () => {

    // useSelector is a React-Redux Hook that allows components to access the store.
	// It accepts a selector function as an argument
	// Any time an action has been dispatched and the Redux store has been updated, useSelector will re-run our selector function.
    // If the selector returns a different value than last time, useSelector will make sure our component re-renders with the new value.
    const token = useSelector(selectCurrentToken)
    let isCustomer = false
    let isEmployee = false
    let isAdmin = false
    let status = ""

    if (token) {
        const decoded = jwtDecode(token)
        const { id, username, roles } = decoded.UserInfo

        isCustomer = roles.includes('Customer')
        isEmployee = roles.includes('Employee')
        isAdmin = roles.includes('Admin')

        if (isCustomer) status = "Customer"
        if (isEmployee) status = "Employee"
        if (isAdmin) status = "Admin"

        return { id, username, roles, status, isCustomer, isEmployee, isAdmin }
    }

    return { id: '', username: '', roles: [], isCustomer, isEmployee, isAdmin, status }
}
export default useAuth