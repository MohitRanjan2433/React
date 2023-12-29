import React from 'react'
import Card from './Card';

function Tours ({tours, removeTour, selectTour}) {
  return (
    <div className='container'>
      <div>
        <h2 className='title'>Plan with Love</h2>
      </div>
      <div className='cards'>
        {
          tours.map( (tour) => {
            return <Card key={tour.id} {...tour} removeTour={removeTour} selectTour={selectTour}></Card>
          })
        }
      </div>
    </div>
  );
}

export default Tours;