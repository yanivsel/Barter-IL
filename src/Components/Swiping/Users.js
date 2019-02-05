import React, { Component } from 'react';
// import { Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import Axios from 'axios';
import User from './User';
import NavBar from '../NavBar';
// import CurrentUser from '../UserPage/CurrentUser';
// import Carousel from 'nuka-carousel';

@inject('UserData')
@observer
class Users extends Component {

    componentDidMount = () => {
        this.props.UserData.getUsers()
    }

    likingUser = async (likedUserId) => {
        console.log("here with likeduserid " + likedUserId)
        await this.props.UserData.getUsers()
        let currentUser = this.props.UserData.users
            .find(user => user.username === localStorage.getItem('username'))
        Axios.put(`http://localhost:8000/users/${currentUser._id}`, {
            id: likedUserId
        })
        console.log(`this is the likedID: ${likedUserId}`)
        console.log(currentUser._id)
        this.props.UserData.increaseIndex()
    }
    dislikeUser = () => {
        this.props.UserData.increaseIndex()
    }

    render() {
        const filterdUsers = this.props.UserData.users.filter((user, index) => {
            return (index === this.props.UserData.index)
        })
        return (
            <div>
                <NavBar />
                {filterdUsers.map(user => {
                    return (
                        <div>
                            <User user={user} likingUser={this.likingUser} dislikeUser={this.dislikeUser} />

                        </div>



                    )
                }
                )}

            </div>
        )
    }
}


export default Users