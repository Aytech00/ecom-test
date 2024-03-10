import React from 'react'
interface modalProps {
    onClick: ()=> void
    children: React.ReactNode
}

const Modal = ({onClick, children}:modalProps) => {
  return (
    <div className="backdrop">
      <span onClick={onClick} className="flex cursor-pointer mt-7 text-white justify-end mr-7 text-2xl">
        x
      </span>
      <div className="top-[20%] left-0 sm:left-[3%] md:left-[40%]    z-14 fixed">
        {children}
      </div>
    </div>
  );
}

export default Modal