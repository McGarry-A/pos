import { useEffect, useState } from "react";

const getWindowWidth = () => {
    const { innerWidth: width } = window;
    return width
}

const useIsMobile = () => {
    const [windowWidth, setWindowWidth] = useState<number>(getWindowWidth())

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(getWindowWidth())
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return windowWidth < 768 ? true : false
}

export default useIsMobile;