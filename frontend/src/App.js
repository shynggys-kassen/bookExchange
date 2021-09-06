import React from 'react'; 
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import './App.css';
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import LoginScreen from './screens/LoginScreen'

function App() {
  return (
    <Router>
      <Header />
      <Container>
        <Route path='/login' component={LoginScreen} />
        <Route path='/product/:id' component={ProductScreen} />
        <Route path='/' component={HomeScreen} exact />
      </Container>
      <main><Container></Container></main>
      <Footer /> 
    </Router>
  ); 
}

export default App;