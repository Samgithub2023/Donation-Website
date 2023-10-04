import React from 'react'
import about1 from '../images/about1.png'
import about2 from '../images/about2.png'
import about3 from '../images/about3.png'

const About = () => {
    return (
        <div className='my-14 border-b-2 pb-12'>
            <h1 className='text-2xl md:text-4xl font-bold font-poppins text-center mb-12'>About Us</h1>
            <div className="flex flex-col gap-16 sm:gap-6 mx-4 sm:mx-12 md:mx-20 lg:mx-44">

                <div className='flex justify-center gap-1'>
                    <img className='w-1/3' src={about1} alt="Use of donations made by you" />
                    <div className='flex flex-col justify-center items-center gap-2'>

                        <h1 className='font-bold text-lg '>Use of Donations made by you</h1>
                        <p className='text-center'>We with the help of your donations we work towards creating quality and equitable opportunities for children and communities to learn and grow with a view to long term sustainable change.</p>

                    </div>
                </div>

                <div className='flex justify-center gap-1'>
                    <div className=' flex flex-col justify-center items-center gap-2'>
                        <h1 className='font-bold text-lg m-2'>Education for children</h1>
                        <p className='m-2 text-center'>Thousands of children are helped by donors who accompany them along their journey. Sponsorship allows a child to attend school and learning the basic skills of life.</p>
                    </div>
                    <img className='w-1/3' src={about2} alt="Education for children" />
                </div>

                <div className='flex justify-center gap-1'>
                    <img className='w-1/3' src={about3} alt="Making them future ready" />
                    <div className=' flex flex-col justify-center items-center gap-2'>

                        <h1 className='font-bold text-lg m-2'>Making them future ready</h1>
                        <p className='m-2 text-center'>We at DoNations make children problem solvers, providing them a launching pad for their future by offering the children complimentary courses.</p>

                    </div>
                </div>


            </div>
        </div>
    )
}

export default About