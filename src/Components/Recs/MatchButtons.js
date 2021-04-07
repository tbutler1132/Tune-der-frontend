import React from 'react';

import GradeIcon from '@material-ui/icons/Grade';
import CloseIcon from '@material-ui/icons/Close';

function MatchButtons(props) {
    return (
        <div>
            <CloseIcon onClick={props.showNewProfile}/>
            <GradeIcon />
        </div>
    );
}

export default MatchButtons;