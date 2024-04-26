import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Card ({image,price,info,name,id,removeTour,selectTour}) {

  const [readmore, setReadmore] = useState(true);

  const description = readmore ? `${info.substring(0,200)}...` :  info;
  function readmorehandler(){
    setReadmore(!readmore);
  }

  const notify = () => toast(`Great Deal in just: ${price}`);

  return (
    <div className='card'>
      <div>
        <img src={image} className='image' alt=''/>
      </div>
      <div className='tour-info'>
        <div className='tour-details'>
          <h4 className='tour-price'>$ {price}</h4>
          <h4 className='tour-name'> {name} </h4>
        </div>

        <div className='description'>
          {description}
          <span className='read-more' onClick={readmorehandler}>
            {readmore ? `show less` : `Read \More`}
          </span>
        </div>

      <button className='btn-red' onClick={ () => removeTour(id)}>
        Not Interested
      </button>
      <button className='btn-red' onClick={() => {selectTour(id); setReadmore(false); notify();}}>
        Interested
      </button>
      <div>
        <ToastContainer />
      </div>
      </div>
    </div>
  )
}

export default Card;