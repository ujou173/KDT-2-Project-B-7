import React from 'react';
import './statusBar.css'

interface StatusBarProps {}
const StatusBar: React.FC<StatusBarProps> = () => {
  return (
    <div className='statusBar'>
      <div className='userInfo'>
        <div className='characterColor'></div>
      </div>
    </div>
  )
}
export default StatusBar;