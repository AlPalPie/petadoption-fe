
// Visitors with no login can:
//     - read Animals and Images
//
// Customer can do all above as well as:
//     - update Animals and Images and only their own User info (FIXME: not yet supported)
//     - add new Images
//
// Employee can do all above as well as:
//     - add new Animals and Images
//     - delete Animals and Images
//
// Admin can perform all CRUD operations on all documents, main differences being:
//     - deleting Users

export const ROLES = {
    Customer: 'Customer',
    Employee: 'Employee',
    Admin: 'Admin'
}