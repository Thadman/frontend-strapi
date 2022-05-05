import React from 'react'
// import useFetch from '../hooks/useFetch'
import { Link } from 'react-router-dom'
import { useQuery, gql } from "@apollo/client"

// graphql query
const REVIEWS = gql`
query GetReviews{
  reviews
  {
  	data  {
      id
      attributes {
        Title
        rating
        body
        categories {
          data {
            id
            attributes {
              name
            }
          }
        }
      }
    }
  }
}
`

export default function Homepage() {
  // graphlql query destructured
  const { loading, data, error } = useQuery(REVIEWS)
  // const { loading, error, data } = useFetch('http://localhost:1337/api/reviews')
  
  if (loading) return <p>Loading...</p>
  if (error === [] || data === null) return <p>Error...</p>
  
  // console.log(data)
  // console.log(loading)
  // console.log(error)
  // console.log(REVIEWS)

  return (
    <div>
      {data.reviews.data.map(data => (
        <div key={data.id} className="review-card">
          <div className="rating">{data.attributes.rating}</div>
          <h2 className="">{data.attributes.title}</h2>

          {data.attributes.categories.data.map(cat => (
            <small key={cat.id}>{cat.attributes.name}</small>
          ))}

          <p>{data.attributes.body.substring(0, 250)}...</p>
          <Link to={`/reviews/${data.id}`}>Read More</Link>
        </div>
      ))}
    </div>
  )
}