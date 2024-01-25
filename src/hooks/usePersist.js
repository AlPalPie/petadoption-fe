import { useState, useEffect } from "react"



// This hook is exported to allow us to persist a state variable across sessions
const usePersist = () => {
    // web storage:
    // localStorage allows browser to store key-value objects with no expiration date
    //     the objects persist even after user closes the browser or restarts the computer
    //     the objects are cleared either by the user or if the browser decides its needs room for something else
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);

    useEffect(() => {
        localStorage.setItem("persist", JSON.stringify(persist))
    }, [persist])

    return [persist, setPersist]
}
export default usePersist