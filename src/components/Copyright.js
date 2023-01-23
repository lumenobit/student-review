import React from 'react'
function Copyright() {
    return (
        <div className='text-center py-4'>
            &copy; {new Date().getFullYear()} <strong><a href="https://lumenobit.com/" rel="author" style={{ textDecoration: 'none' }}>Lumenobit</a></strong>. All rights reserved.
        </div >
    )
}
export default Copyright;