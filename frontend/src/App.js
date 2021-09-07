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
import ProductEditScreen from './screens/ProductEditScreen'

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
            <Route path='/product/:id' component={ProductScreen} exact/>
            <Route path='/search/:keyword' component={HomeScreen} exact/> 
            <Route path='/product/:id/edit' component={ProductEditScreen} exact/> 
            <Route path='/search/:keyword/page/:pageNumber' component={HomeScreen} exact /> {/* pagination during search*/}
            <Route path='/page/:pageNumber' component={HomeScreen} /> {/* pagination */}
            <Route path='/' component={HomeScreen} exact />
          </Container>
        </Container>
      </main>
      
      <Footer /> 
    </Router>
  ); 
}

export default App;