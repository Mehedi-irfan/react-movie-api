import { createContext, useContext, useEffect, useState } from "react";

export const AppContext = createContext();

const API = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=titanic`

export const AppProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState({ show: true, msg: '' })

    // get movies function 
    const getMovies = async (url) => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            if (data.Response === 'True') {
                setMovies(data.Search);
                setIsLoading(false)
            }
            else {
                setIsLoading(true);
                setIsError({ show: true, msg: data.error })
            }
        } catch (error) {
            console.log(error);
        }
    }

    // get the data
    useEffect(() => {
        getMovies(API)
    }, [])

    return (
        <AppContext.Provider value={{ movies, isError, isLoading }}>
            {children}
        </AppContext.Provider>
    )
}

const useGlobalContext = () => {
    return useContext(AppContext)
}

export { useGlobalContext }