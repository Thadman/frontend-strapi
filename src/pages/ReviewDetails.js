import React from 'react'
import { useParams } from 'react-router-dom'
// import useFetch from '../hooks/useFetch'
import {useQuery, gql } from '@apollo/client'

const REVIEW = gql`
query GetReview($id: ID!){
  review(id: $id){
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

export default function ReviewDetails() {
  const { id } = useParams()
  // const { data, loading, error } = useFetch('http://localhost:1337/api/reviews/' + id)
  const { data, loading, error} = useQuery(REVIEW, {
    variables: {
      id: id
    }
  })

  if (loading) return <p>Loading...</p>
  if (error === [] || data === null) return <p>Error...</p>
  console.log(data)

  return (
    <div>
      <div className="review-card">
        <div className="rating">{data.review.data.attributes.rating}</div>
        <h2 className="">{data.review.data.attributes.Title}</h2>

        {data.review.data.attributes.categories.data.map(cat => (
          <small key={cat.id}>{cat.attributes.name}</small>
        ))}

        <p>{data.review.data.attributes.body}</p>
      </div>
    </div>
  )
}