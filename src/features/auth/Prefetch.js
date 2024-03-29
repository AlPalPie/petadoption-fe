import { store } from '../../app/store'
// eslint-disable-next-line
import { notesApiSlice } from '../notes/notesApiSlice'
import { usersApiSlice } from '../users/usersApiSlice';
import { animalsApiSlice } from '../animals/animalsApiSlice';
import { imagesApiSlice } from '../images/imagesApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {

    useEffect(() => {
        // FIXME: enable this after using notes:
        // store.dispatch(notesApiSlice.util.prefetch('getNotes', 'notesList', { force: true }))
        store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }))
        store.dispatch(animalsApiSlice.util.prefetch('getAnimals', 'animalsList', { force: true }))
        store.dispatch(imagesApiSlice.util.prefetch('getImages', 'imagesList', { force: true }))
    }, [])

    return <Outlet />
}
export default Prefetch
