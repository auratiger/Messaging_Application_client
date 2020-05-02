import React, {Component} from 'react';

import Toolbar from '../Navigation/Toolbar/Toolbar';

class Layout extends Component{
    render(){
        console.log(this.props.history);
        
        return(
            <main>
                <Toolbar/>
                {this.props.children}
            </main>
        )
    }
}

export default Layout;
