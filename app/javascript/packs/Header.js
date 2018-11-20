import React, {Component} from 'react';


export class Header extends Component {
    render() {
        return (

            <header role="banner" className="Header l-header">
                <div className="p-header">
                    <div className="l-container">
                        <div className="l-header__logo"><a className="p-logo" href="#">Translators</a></div>
                        <div className="l-header__language">
                            <ul className="p-language">
                                <li className="p-language__item">日本語</li>
                                <li className="p-language__item">English</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        );
    };
};


