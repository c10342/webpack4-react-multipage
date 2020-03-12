
import './Header.scss'

import React from 'react'

import SearchBar from '../SearchBar/SearchBar.jsx'

class Header extends React.Component{
    render(){
        return (
            <div className="header">
                <SearchBar />
                <img className="banner-img" src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=134526025,4123415993&fm=26&gp=0.jpg"/>
            </div>
        );
    }
}


export default Header