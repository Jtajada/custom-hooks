import { useEffect, useState } from 'react'

const locaclCache = {}

export const useFetch = (url) => {

    const [state, setState] = useState({
        data: null,
        isLoading: true,
        hasError: false,
        error: null
    })

    useEffect(() => {
        getFetch();
    }, [url])

    const setLoadingState = () => {
        setState({
            data: null,
            isLoading: true,
            hasError: false,
            error: null
        })
    }

    const getFetch = async () => {

        if (locaclCache[url]) {
            console.log('Usando cache');

            setState({
                data: locaclCache[url],
                isLoading: false,
                hasError: false,
                error: null
            })
            return;
        }

        setLoadingState();

        const resp = await fetch(url);

        // sleep
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (!resp.ok) {
            setState({
                data: null,
                isLoading: false,
                hasError: true,
                error: {
                    code: resp.status,
                    message: resp.statusText
                }
            })
            return;
        }

        const data = await resp.json();

        setState({
            data,
            isLoading: false,
            hasError: false,
            error: null
        })

        // Manejo del cache
        locaclCache[url] = data;

    }

    return {
        data: state.data,
        isLoading: state.isLoading,
        hasError: state.hasError,
    }
}
