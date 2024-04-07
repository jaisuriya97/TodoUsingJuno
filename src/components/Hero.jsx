import React from 'react'
import { Link } from 'react-router-dom';
function Hero() {
  return (
    
    <div>
        <section class="bg-white  mt-20">
    <div class="py-8 px-4 mx-auto max-w-screen-xl text-center text-dark lg:py-16 lg:px-12 ">

        <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-dark md:text-5xl lg:text-6xl dark:text-dark">We invest in the world’s potential</h1>
        <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-900">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
        <div class="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4 text-dark">

            <Link to='/makeTender' className='inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-dark rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900'>
            Make a Tender
                <svg class="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </Link>
            <Link to='buyTender' className='inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-white focus:ring-4 focus:ring-gray-100 dark:text-dark dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800'>
            View Tender
            </Link> 
        </div>
    </div>
</section>
    </div>
  )
}

export default Hero