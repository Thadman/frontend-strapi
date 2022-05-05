import {useEffect, useState} from 'react'

const useFetch = (url) => {
  const [data, setData] = useState([])
  const [error, setError] = useState([])
  const [loading, setLoading] = useState(true)

  // fetch when component loads
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      try {
        const res = await fetch(url)
        const json = await res.json()

        setData(json)
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
        console.log(error)
      }
    }

    fetchData();
  }, [url])

  return  { loading, error, data }
}

export default useFetch