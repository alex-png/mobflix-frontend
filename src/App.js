import React from 'react';
import VideosContainer from './containers/VideosContainer';
import './App.css';
// import "node_modules/video-react/dist/video-react.css"


class App extends React.Component {


  render() {
    return (
      <div>
        
        <VideosContainer classname="contain" />
      </div>)

  }




}//end of class 



export default App;
