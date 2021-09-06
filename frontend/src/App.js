import React from 'react'; 
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Container>
            <Route path='/login' component={LoginScreen} />
            <Route path='/register' component={RegisterScreen} />
            <Route path='/profile' component={ProfileScreen} />
            <Route path='/product/:id' component={ProductScreen} />
            <Route path='/search/:keyword' component={HomeScreen}/> 
            <Route path='/search/page/:pageNumber' component={HomeScreen} exact /> {/* pagination during search*/}
            <Route path='/page/:pageNumber' component={HomeScreen} exact /> {/* pagination */}
            <Route path='/' component={HomeScreen} exact />
          </Container>
        </Container>
      </main>
      
      <Footer /> 
    </Router>
  ); 
}

export default App;