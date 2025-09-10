import React, { useState } from 'react';

const Switch = () => {
const [value, setValue] = useState<string>("");
  const chainTOSwitch = (val: any) =>  {
    let answer = "";

    switch (val) {
      case 1:
        answer = "nadib";
        break;
      case 2:
        answer = "Rana";
        break;
      case 3:
        answer = "Number 3";
        break;
      default:
        answer = "No match found";
        break;
    }
    return answer;
  }
  return (
    <>
      <div className='
       flex
       justify-center
       items-center
       h-screen
       bg-green-500 shadow-md '>
        <p >{value}</p> <br />
        <button
          onClick={() => {
            setValue(chainTOSwitch(3)); 
          }}
        >
          Show Name
        </button>
      </div>
    </>
  );
}

export default Switch;
