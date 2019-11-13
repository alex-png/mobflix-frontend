import React from 'react'
import Video from './Video'
import "./VideoStuff.css"
// import MyVerticallyCenteredModal from "./Modal.js"
class VideoSlide extends React.Component {

    render() {        
        return (
            <div className="row"> 
            {this.props.allVideos.map(video => <Video className="row-inner" {...video} key={video.id} videoClickInContainer={this.props.videoClickInContainer}/>)}
            </div>
        )
    }
}

export default VideoSlide