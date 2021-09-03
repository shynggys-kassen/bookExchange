import React from 'react'; 
import {Container} from 'react-bootstrap'
import './App.css';
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'

function App() {
  return (
    <>
      <Header />
      <Container><HomeScreen /></Container>
      <main><Container>This is main</Container></main>
      <Footer /> 
    </>
  ); 
}

export default App;
