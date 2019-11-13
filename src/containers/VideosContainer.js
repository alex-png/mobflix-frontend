import React from 'react'
import VideoSlide from '../components/VideoSlide'
import "../components/VideoStuff.css"
import LogInOrSignUp from "../components/LogInOrSignUp"
import ReactPlayer from "react-player"
import ChatBox from "../components/Chatbox"
import "./VideoContainer.css"
import Loader from 'react-loader-spinner'



class VideosContainer extends React.Component {
    state = ({
        loggedIn: false,
        userId: 0,
        videoClick: false,
        currentVideoTitle: "",
        currentVideoSeries: "",
        currentVideoUrl: "",
        currentVideoImgUrl: "",
        currentVideoId: 0,
        allVideos: [],
        loading: true
    })

    //when logged in, change log in state to true so that container will render
    logInContainer = (user) => {
        console.log("INSIDE VIDEOCONTAINER", user)

        // this is a test
        
        this.setState(prevProps => ({ loggedIn: true, userId: user.id }))
    }

    //this function will be passed into each individual video, so that when clicked, it'll set videoClick inside this scope to true, rendering the modal
    videoClickInContainer = (videoObj) => {
        this.setState(prevProps => ({
            videoClick: !prevProps.videoClick,
            currentVideoTitle: videoObj.title,
            currentVideoSeries: videoObj.series,
            currentVideoUrl: videoObj.url,
            currentVideoImgUrl: videoObj.imgUrl,
            currentVideoId: videoObj.id

        }))
    }

    //this function is executed when modal is closed, changing videoClick back to false and resetting video attributes in state
    handleCloseClick = () => {
        this.setState(prevProps => ({
            videoClick: !prevProps.videoClick,
            currentVideoTitle: "",
            currentVideoSeries: "",
            currentVideoUrl: "",
            currentVideoImgUrl: ""

        }))


    }

    render() {
        //styling for modal
        const blackBox = {
            background: "rgba(0,0,0,1)",
            position: "fixed",
            top: "0",
            left: "0",
            width: "100vw",
            height: "100vh",
            zIndex: "2"
        }




        return this.state.loading ?
            (<Loader

                type="Oval"
                color="red"
                height={100}
                width={100}
                flex={1} />)
            :
            (this.state.loggedIn ? (
                
                <div className="contain" >
                    {this.state.videoClick ? (
                        <div style={blackBox}>
                            <div className="close" onClick={this.handleCloseClick} />
                            <div >
                                <ReactPlayer url={this.state.currentVideoUrl} className='react-player'
                                    playing
                                    width='100%'
                                    height='500px'
                                />
                            </div>
                            <br />
                            <ChatBox currentVideoId={this.state.currentVideoId} userId={this.state.userId} />

                        </div>
                    )
                        :
                        null}
                    
                    <div className="header"><h1 style={{color:"red", fontWeight: "400" }}>MOBflix</h1> im watching senseless videos ova' hea'  </div>
                    <br />
                    <h1>Funny</h1>
                    <VideoSlide allVideos={this.state.allVideos.filter(vid => vid.genre.includes("Funny"))} className="row" videoClickInContainer={this.videoClickInContainer} />
                    <br />
                    <h1>Murder</h1>
                    <VideoSlide allVideos={this.state.allVideos.filter(vid => vid.genre.includes("Murder"))} className="row" videoClickInContainer={this.videoClickInContainer} />
                    <br />
                    <h1>Drama</h1>
                    <VideoSlide allVideos={this.state.allVideos.filter(vid => vid.genre.includes("Drama"))} className="row" videoClickInContainer={this.videoClickInContainer} />
                    <br />
                    <h1>Movies</h1>
                    <VideoSlide allVideos={this.state.allVideos.filter(vid => vid.genre.includes("Movie"))} className="row" videoClickInContainer={this.videoClickInContainer} />
                    <br />
                    <h1>Television</h1>
                    <VideoSlide allVideos={this.state.allVideos.filter(vid => vid.genre.includes("Television"))} className="row" videoClickInContainer={this.videoClickInContainer} />

                </div>
            )
                :
                (<div>
                    <LogInOrSignUp logInContainer={this.logInContainer} />
                </div>)
            )
    }

    componentDidMount() {
        return fetch('http://localhost:3000/videos')
            .then(response => response.json())
            .then(data => this.setState({
                allVideos: data
            })
            ).then(() => {
                this.setState({ loading: false })
            })



    }//
}
export default VideosContainer
