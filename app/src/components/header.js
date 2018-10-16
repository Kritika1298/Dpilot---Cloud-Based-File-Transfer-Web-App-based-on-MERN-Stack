import React,{Component} from'react'

class Header extends Component {

    render() {
        return (<div className={'app-header'}>

            <div className={'app-site-info'}>
                <h1><i className={'icon-paper-plane'}  />  Dpilot</h1>
                <div className={'site-title'}>SHARE YOUR FILE.</div>
                <div className={'site-slogan'}>SECURE ! SAFE ! FREE !</div>
            </div>
        </div>)
    }
}

export default Header;

