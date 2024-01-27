import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../features/auth/authSlice"
import { jwtDecode } from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isCustomer = false
    let isEmployee = false
    let isAdmin = false
    let status = ""

    if (token) {
        const decoded = jwtDecode(token)
        const { username, roles } = decoded.UserInfo

        isCustomer = roles.includes('Customer')
        isEmployee = roles.includes('Employee')
        isAdmin = roles.includes('Admin')

        if (isCustomer) status = "Customer"
        if (isEmployee) status = "Employee"
        if (isAdmin) status = "Admin"

        return { username, roles, status, isCustomer, isEmployee, isAdmin }
    }

    return { username: '', roles: [], isCustomer, isEmployee, isAdmin, status }
}
export default useAuth