import { createContext, useContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const API = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`

export const AppProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState({ show: true, msg: '' })
    const [search, setSearch] = useState('titanic')

    // get movies function 
    const getMovies = async (url) => {
        setIsLoading(true)
        try {
            const res = await fetch(url);
            const data = await res.json();
            if (data.Response === 'True') {
                setMovies(data.Search);
                setIsError({ show: false, msg: '' })
                setIsLoading(false)
            }
            else {
                setIsLoading(true);
                setIsError({ show: true, msg: data.Error })
            }
        } catch (error) {
            console.log(error);
        }
    }

    // get the data
    useEffect(() => {
        let timeOut = setTimeout(() => {
            getMovies(`${API}&s=${search}`)
        }, 500)
        return () => clearTimeout(timeOut)
    }, [search])

    return (
        <AppContext.Provider value={{ movies, isError, isLoading, search, setSearch }}>
            {children}
        </AppContext.Provider>
    )
}

const useGlobalContext = () => {
    return useContext(AppContext)
}

export { useGlobalContext }