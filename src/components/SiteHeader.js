import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'

const CATEGORIES = gql`
query GetCategories{
  categories {
  	data  {
      id
      attributes {
     		name
      }
    }
  }
}
`

export default function SiteHeader() {
  const {loading, error, data} = useQuery(CATEGORIES)
  
  if (loading) return <p>Loading Categories...</p>
  if (error === [] || data === null) return <p>Error fetching Categories...</p>
  // console.log(data)

  return (
    <div className="site-header">
      <Link to="/"><h1>Project Reviews</h1></Link>
        <nav className="categories">
          <span>Filter Review by Category: </span>
          {data.categories.data.map(category => (
            <Link key={category.id} to={`/category/${category.id}`}>{category.attributes.name}</Link>
          ))}
        </nav>
    </div>
  )
}
