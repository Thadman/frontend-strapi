import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"

// page and layout imports
import Homepage from './pages/Homepage'
import ReviewDetails from './pages/ReviewDetails'
import Category from './pages/Category'
import SiteHeader from './components/SiteHeader'

// apollo client - this will make new instance and store it in variable
const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql',
  cache: new InMemoryCache()
})


function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
        <div className="App">
          <SiteHeader></SiteHeader>
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route path="/reviews/:id" element={<ReviewDetails />} />
            <Route path="/category/:id" element={<Category />} />
          </Routes>
        </div>
      </ApolloProvider>
    </Router>
  );
}

export default App;
