import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { useParams, Link } from 'react-router-dom' 

const CATEGORY = gql`
query GetCategory($id : ID!) {
  category(id: $id) {
  	data  {
      id
      attributes {
    		name
        reviews {
          data {
            id
            attributes {
              Title
              body
              rating
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
    }
  }
}
`

export default function Category() {
  const { id } = useParams()
  const { loading, error, data } = useQuery(CATEGORY, {
    variables: {
      id: id
    }
  })

  if (loading) return <p>Loading Category...</p>
  if (error === [] || data === null) return <p>Error loading category...</p>
  console.log(data)
  console.log(id)

  return (
    <div>
      <h2 className="cat-name">{data.category.data.attributes.name}</h2>
      {data.category.data.attributes.reviews.data.map(data => (
        <div key={data.id} className="review-card">
          <div className="rating">{data.attributes.rating}</div>
          <h2 className="review-name">{data.attributes.Title}</h2>

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