import React, {Component} from 'react';

import Aux from '../../hoc/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar';

class Layout extends Component{
    render(){
        return(
            <Aux>
                <div>
                    <Toolbar/>
                    <main >
                        {this.props.children}
                    </main>
                </div>
            </Aux>
        )
    }
}

export default Layout;
