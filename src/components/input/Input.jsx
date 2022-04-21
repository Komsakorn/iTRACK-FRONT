import React from 'react';

import './Input.css';

const Input = ({isInvalid = false, ...props}) => {
  return <>  
          <input className={isInvalid ? 'error' : ''} {...props} />
          {isInvalid && <div className='error-text'>Email is invalid</div>}
         </>;
}

export default Input;