import "./Chatbox.css"
import React from "react"

class ChatBox extends React.Component {
    state = ({
        allVideoComments: [],
        comment: ""
    })

    //filters array based on current clicked video id
    filteredArray = () => {
        return this.state.allVideoComments.filter(vidComObj => vidComObj.video_id === this.props.currentVideoId).reverse();
    }

    //when mapping comments associated with this video, we'll call on this function
    //passing in the neccesary information.
    messageComponent = (commentObj) => {
        return (
            <div key={commentObj.id} className="message">
                <img alt="idk" className="avatar" src="https://i.pinimg.com/originals/c7/73/f4/c773f4d77f6088a92d4ac01b94b8296d.jpg" />
                <div className="username"> {commentObj.user.username}: </div>
                <div className="datetime">{commentObj.created_at}</div>
                <p className="text">{commentObj.comment}</p>
                {this.props.userId === commentObj.user_id? <button onClick={this.handleDelete} name="delete" id={commentObj.id}> Delete! </button> : null }
            </div>
        )
    }

    //handle delete
    handleDelete = (e) => {
        e.preventDefault()
        console.log("delete!")

        fetch(`http://localhost:3000/video_comments/${e.target.id}`, {
            method: "DELETE",   
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              }})

    }

    

    //will post comment to database
    handleSubmit = (e) => {
        e.preventDefault()
        console.log("clicked!")
        this.setState({
            comment: ""
        })
        this.postToDataBase()
        this.fetchComments()
    }

    //updates state comment
    handleChange = (e) => {
        e.preventDefault()
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    //helper method that will be called in handleSubmit
    postToDataBase = () => {
        let formData = {
            user_id: this.props.userId,
            video_id: this.props.currentVideoId,
            comment: this.state.comment
        };

        let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(formData)
        };

        fetch("http://localhost:3000/video_comments", configObj);

    }


    //render
    render() {

        return (
            <div>
                <div className="container">
                    <div className="chat-container" onSubmit={this.handleDelete} name="delete message">
                        {this.filteredArray().map(commentObj => this.messageComponent(commentObj))}
                    </div>
                    <form className="send-message-form" onSubmit={this.handleSubmit} name="post message">
                        <input name="comment" type="text" placeholder="Your message" onChange={this.handleChange} value={this.state.comment} />
                        <button type="submit" >Send</button>
                    </form>

                </div>
            </div>)
    }

    fetchComments = () => {
        fetch("http://localhost:3000/video_comments")
            .then(response => response.json())
            .then(data => this.setState({
                allVideoComments: data
            }))
    }

    interval;
    componentDidMount() {
        this.interval = setInterval(this.fetchComments, 700)
    }
    componentWillUnmount() {
        clearInterval(this.interval)
    }
}

export default ChatBox