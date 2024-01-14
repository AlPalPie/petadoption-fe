import { useState, useEffect } from "react"


// web storage:
// localStorage allows browser to store key-value objects with no expiration date
//     the objects persist even after user closes the browser or restarts the computer
//     the objects are cleared either by the user or if the browser decides its needs room for something else

const usePersist = () => {
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);

    useEffect(() => {
        localStorage.setItem("persist", JSON.stringify(persist))
    }, [persist])

    return [persist, setPersist]
}
export default usePersist