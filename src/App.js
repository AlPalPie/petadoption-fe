import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import NotesList from './features/notes/NotesList'
import UsersList from './features/users/UsersList'
import EditUser from './features/users/EditUser'
import NewUserForm from './features/users/NewUserForm'
import EditNote from './features/notes/EditNote'
import NewNote from './features/notes/NewNote'
import Prefetch from './features/auth/Prefetch'
import PersistLogin from './features/auth/PersistLogin'
import RequireAuth from './features/auth/RequireAuth'
import { ROLES } from './config/roles'
import useTitle from './hooks/useTitle';
import AnimalsList from './features/animals/AnimalsList';
import NewAnimal from './features/animals/NewAnimal';
import EditAnimal from './features/animals/EditAnimal';
import EditImage from './features/images/EditImage';

export const getAppTitle = () => {
  return 'Amazing Animal Adoption Agency'
}



function App() {
  useTitle(getAppTitle())

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route path="newuser" element={<NewUserForm />} />

        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
            <Route element={<Prefetch />}>
              <Route path="dash" element={<DashLayout />}>

                <Route index element={<Welcome />} />

                <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                  <Route path="users">
                    <Route index element={<UsersList />} />
                    <Route path=":id" element={<EditUser />} />
                  </Route>
                </Route>

                <Route path="notes">
                  <Route index element={<NotesList />} />
                  <Route path="new" element={<NewNote />} />
                  <Route path=":id" element={<EditNote />} />
                </Route>

                <Route path="animals">
                  <Route index element={<AnimalsList />} />
                  <Route path="new" element={<NewAnimal />} />
                  <Route path=":id" element={<EditAnimal />} />
                  <Route path="image/:id" element={<EditImage />} />
                </Route>

              </Route>{/* End Dash */}
            </Route>
          </Route>
        </Route>{/* End Protected Routes */}

      </Route>
    </Routes >
  );
}

export default App;
