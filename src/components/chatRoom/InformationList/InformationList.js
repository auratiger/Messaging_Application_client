import React from 'react';

import Toolbar from '../Toolbar/Toolbar';
import ToolbarButton from '../ToolbarButton/ToolbarButton';

import './InformationList.css';
import Tooltip from '@material-ui/core/Tooltip';


const InformationList = (props) => {

    return(
        <div className={"conversation-list"}>
            <Toolbar
            title="Users"
            leftItems={[
                <Tooltip key="cog" title="Settings">
                <ToolbarButton key="cog" icon="ion-ios-cog"/>
                </Tooltip>
            ]}
            rightItems={[
                <Tooltip key="cog" title="Add">
                <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
                </Tooltip>
            ]}
            />
        </div>
    )
}

export default InformationList;