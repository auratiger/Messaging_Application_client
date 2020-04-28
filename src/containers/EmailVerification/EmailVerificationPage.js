import React, {Component} from 'react';
import {connect} from 'react-redux';

import {verifyEmail} from '../../store/actions/emailVerification';

class EmailVerificationPage extends Component{

    componentDidMount(){
        this.props.verifyEmail();
    }

    render(){
        return(
            <div>
                <h1>hello</h1>
            </div>
        )
    }
}

export default connect(null, {verifyEmail})(EmailVerificationPage);