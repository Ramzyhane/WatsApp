import moment from 'moment';
import React from 'react'

const Bubble = (props) => {

    const isMyMessage = props.userId === props.msg.userId ? true : false;
  return (
   <>
        {
            
            isMyMessage ? (<>
                <div className='row'>
                    <div className='bubble_me'>
                        <p className='name'>{props.msg.name}</p>
                        <p className='message'>{props.msg.text}</p>
                </div>
                </div>
            </>) : (<>
                <div className='row' style={{direction:'rtl'}}>
                    <div className='bubble_you'>
                        <p className='name'>{props.msg.name}</p>
                        <p className='message'>{props.msg.text}</p>
                    </div>
            </div>
            </>)
        }

    </>
  )
}

export default Bubble