import React from 'react'
import "./VideoStuff.css"

class Video extends React.Component {
    state = ({
        clicked: false

    })

    handleClick = () => {
        let title = this.props.title
        let series = this.props.series
        let url = this.props.url
        let imgUrl = this.props.img_url
        let id = this.props.id
        let videoObj = { title: title, series: series, url: url, imgUrl: imgUrl, id: id}
        this.props.videoClickInContainer(videoObj)
        // this.props.handleClick(title, series, url, imgUrl)
    }

    render() {

        return (
            <div className="tile" >
                <div className="tile__media" onClick={this.handleClick} >
                    <img src={this.props.img_url} className="tile__img" alt={this.props.title} />
                    <div className="tile__title"> {this.props.title}</div>
                </div>
            </div>)
    }

}//end of class

export default Video