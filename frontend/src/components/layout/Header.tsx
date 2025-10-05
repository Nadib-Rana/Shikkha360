import React from 'react'

function Header() {
    return (
        <div className='fixed w-full flex justify-between border-b-1'>
            <h2 className='text-3xl font-bold text-gray-700 text-center'>Admin Name</h2>
            <div className='flex justify-between'>
                <ul className='m-1 text-left'>
                    <li className='text-xl font-bold text-gray-500'>UserName</li>
                    <li className='text-sm font-mono'>UserID:213002247</li>
                </ul>
                <img
                    src="https://avatars.githubusercontent.com/u/169526577?v=4"
                    alt="ProfileImg"
                    className='max-w-[50px] max-h-[50px] border-2 border-gray-700 rounded-[50%] p-0.5 m-1'
                />
            </div>
        </div >
    )
}

export default Header