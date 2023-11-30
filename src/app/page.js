"use client"
import Image from 'next/image'
import getBool from '@/firebase/getBool'

import Page1 from '@/components/page_1'
import Page2 from '@/components/page_2'
import Page3 from '@/components/page_3'


// Page 1 -> Hello, input your ID. If so still on Page 1 add your preffereces, after move to Page 2. Of if you added your preferences before, go to page 2 immediately.
// Page 2 -> We are waiting for everyone to finish their forms
// Page 3 -> Here are your matches but first give us ur ID

import React, { useState, useEffect } from 'react';


const MainPage = () => {
  const [currentState, setCurrentState] = useState(1);


  useEffect(() => {
    (async () => {
      let list = await getBool();
      console.log(list[0]['algo_done'])
      let algo_done = list[0]['algo_done']
      console.log(algo_done)
      if (list[0]['algo_done'] === true) {
        setCurrentState(3)
      }
    })();
  }, []);

  let componentToRender;
  
  switch (currentState) {
    case 1:
      componentToRender = <Page1 
      changeState={setCurrentState}
      />;
      break;
    case 2:
      componentToRender = <Page2 />;
      break;
    case 3:
      componentToRender = <Page3 />;
      break;
    default:
      componentToRender = null;
  }

  // Function to handle state change
  const changeState = (newState) => {
    setCurrentState(newState);
  };

  return (
    <div className='min-h-screen w-full flex flex-col items-center justify-between'>
      <div className="flex flex-col items-center justify-center h-30 w-full">

        <Image src="/logo.png" alt="Logo h-20" width={200} height={200} />
        </div>
        {componentToRender}

        <div className="flex flex-col items-center justify-center mb-10 w-full">
          <p className='text-center text-sm'>Developed with 💗 by IT Committee of ETH Entrepreneur Club in 2023</p>
        </div>
    </div>
  );
};

export default MainPage;
