
import './App.css';
import Navbar from './components/Navbar'
import React, { useState } from 'react'
import News from './components/News';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'

const App = () => {
  const [progress, setProgress] = useState(0)

  const apiKey = process.env.REACT_APP_API_KEY



  // const setProgress = (progress) => {
  //   setCount(progress)
  // }


  return (
    <div>
      <Router>

        <Navbar />
        <LoadingBar
          height={3}
          color='#f11946'
          progress={progress}

        />

        <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey} key={"general"} countryName={"in"} pageSize={8} category={"general"} />} />
          <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key={""} countryName={"in"} pageSize={8} category={"business"} />} />
          <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key={"entertainment"} countryName={"in"} pageSize={8} category={"entertainment"} />} />
          <Route exact path="/health" element={<News setProgress={setProgress} key={"health"} apiKey={apiKey} countryName={"in"} pageSize={8} category={"health"} />} />
          <Route exact path="/science" element={<News setProgress={setProgress} key={"science"} apiKey={apiKey} countryName={"in"} pageSize={8} category={"science"} />} />
          <Route exact path="/sports" element={<News setProgress={setProgress} key={"sports"} apiKey={apiKey} countryName={"in"} pageSize={8} category={"sports"} />} />
          <Route exact path="/technology" element={<News setProgress={setProgress} key={"technology"} apiKey={apiKey} countryName={"in"} pageSize={8} category={"technology"} />} />

        </Routes>
      </Router>
    </div>
  )

}


export default App