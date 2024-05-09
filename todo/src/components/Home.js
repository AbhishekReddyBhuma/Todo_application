import React from 'react';
import "./Home.css";
import { ContextProvider } from './Context';

const Home = () => {

    const {userName,setUserName} = ContextProvider();

    return (
        <div className='todo-home'>
            <span className='header'>Todo</span>
            <aside id='userName'>{userName}</aside>
        </div>
    )
}

export default Home
