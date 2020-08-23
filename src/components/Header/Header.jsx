import React from 'react';
import { SearchBar, Logo } from '../';
import './Header.scss';

const Header = ({
    onSubmit
}) => {
    return (
        <div className='Header__container'>
            <Logo />
            <SearchBar onSubmit={onSubmit} />
        </div>
    )
}

export default Header;