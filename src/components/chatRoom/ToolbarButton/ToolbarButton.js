import React from 'react';
import './ToolbarButton.css';

const ToolbarButton = React.forwardRef((props, ref) => {
    const { icon } = props;
    return (
      <i ref={ref} {...props} onClick={props.onClick} className={`toolbar-button ${icon}`} />
    );
})

export default ToolbarButton;