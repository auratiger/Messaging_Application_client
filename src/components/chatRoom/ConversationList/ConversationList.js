import React, {useState, useEffect} from 'react';
import ConversationSearch from '../ConversationSearch/ConversationSearch';
import ConversationListItem from '../ConversationListItem/ConversationListItem';
import Toolbar from '../Toolbar/Toolbar';
import ToolbarButton from '../ToolbarButton/ToolbarButton';
import { connect } from 'react-redux';
import {getGroups, createGroup, setGroups, setCurrentGroup} from '../../../store/actions/GroupHandling';
import {getMessages} from '../../../store/actions/MessageHandling';

import './ConversationList.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';

import image from '../../../resources/group/groupDefault.png';

function ConversationList(props) {
  const [open, setOpen] = useState(false);
  const [groupName, setGroupName] = useState("");

  useEffect(() => {
    props.getGroups(props.user);    
  },[])
  
  const handleClickOpen = () => {    
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createNewGroup = () => {
    if(groupName.trim() !== ""){
      props.setGroups([...props.groups, {name: groupName, text: "text", image: image}])
      props.createGroup(props.user, groupName);
    }
    handleClose()
  };

  const handleInput = (event) => {
    setGroupName(event.target.value);
  }

  const handleGroupClick = (group) => {    
    props.setCurrentGroup(group);
    props.getMessages(props.user, group.id);
    console.log(props.user);
  }

    return (
      <div className="conversation-list">
        <Toolbar
          title="Messenger"
          leftItems={[
            <Tooltip key="cog" title="Settings">
              <ToolbarButton key="cog" icon="ion-ios-cog"/>
            </Tooltip>
          ]}
          rightItems={[
            <Tooltip key="cog" title="Add">
              <ToolbarButton key="add" icon="ion-ios-add-circle-outline" onClick={handleClickOpen}/>
            </Tooltip>
          ]}
        />
        <ConversationSearch />
        {
          props.groups.map(group => 
            <ConversationListItem
              key={group.name}
              data={group}
              onClick={handleGroupClick}
            />
          )
        }
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Create</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Choose a name for your group
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Group name"
              type="text"
              onChange={handleInput}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={createNewGroup} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    groups: state.groups.groups,
  };
};

export default connect(mapStateToProps, {getGroups, createGroup, setGroups, setCurrentGroup, getMessages})(ConversationList);
