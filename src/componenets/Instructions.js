import React from 'react'
import Navv from './Navv'

function Instructions() {
  return (
    <div>
      <Navv></Navv>
        <h1>Instructions</h1>
        <p>
            Every user have total of 5 Hints to use, and with every hint 10 points will be deducted from total score point.
        </p>
        <p>
            User has only 2 chance to Guess the code , after that he/she will not be able to guess the code and game will be over
        </p>
        <h2>All the best!!</h2>
    </div>
  )
}

export default Instructions