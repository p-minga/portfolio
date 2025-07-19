import React from 'react'
import { About, Footer, Header, Skills,  Work, ShowCase } from './container';
import { Navbar } from './components';
import './App.scss';

function App() {
  return (
   <div className='app'>
      <Navbar />
      <Header />
      <About />
      <Work />
      <Skills />
      <ShowCase />
      <Footer />
 
   </div>
  );
}

export default App;