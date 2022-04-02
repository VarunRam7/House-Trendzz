import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { GET, POST } from '../services/index'
import Graph from './graph';
import Lottie from 'react-lottie';
import animationData from '../assets/loading.json';
import PieChart from './pieChart';


export default function Home() {
    const [g1, setG1] = useState([])
    const [g2, setG2] = useState([])
    const [g3, setG3] = useState([])
    const [g4, setG4] = useState([])
    const [d1, setD1] = useState([])
    const [dropDown, setDropDown] = React.useState('')
    const [info, setInfo] = useState([])
    const [showGraph, setShowGraph] = useState(false)

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };


    const handleChange = async (event) => {
        setShowGraph(false)
        setDropDown(event.target.value);

        const resp = await POST('/get-region-info', { region: event.target.value })

        if (resp) {
            let x1 = []
            let x2 = []
            let x3 = []
            resp[0].forEach(i => { x1.push({ sales: i.total_homes_sold, duration: i.period_begin + " to " + i.period_end }) })
            setG1(x1)
            resp[1].forEach(i => { x2.push({ sales: i.total_homes_sold, duration: i.period_begin + " to " + i.period_end }) })
            setG2(x2)
            resp[2].forEach(i => { x3.push({ sales: i.total_homes_sold, duration: i.period_begin + " to " + i.period_end }) })
            setG3(x3)
            setD1(resp[3])
            setG4(resp[4])
            setShowGraph(true)

        }

    };

    useEffect(async () => {
        const d = await GET("/region-name")
        console.log(d)

        let x = []
        d.forEach(i => { x.push(i.region_name) })
        setInfo(x)
    }, [])


    return (
        <div className='w-full'>

            <div className='ml-4 flex'>
                <div className='text-2xl font-semibold mr-12'>Select your region:</div>
                <FormControl className='w-72'>
                    <InputLabel id="demo-simple-select-label">Regions</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={dropDown}
                        label="Regions"
                        onChange={handleChange}
                    >
                        {
                            info.map(x => {
                                return (
                                    <MenuItem value={x}> {x} </MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>
            </div>

            {!showGraph && <Lottie
                options={defaultOptions}
                height={400}
                width={400}
            />}

            {showGraph && (
                <div>
                    <div className='flex w-full'>
                        <div className='p-4 m-4 border-2 text-xl  p-auto w-full rounded-md  border-blue-300 font-semibold'>
                            <div className='flex items-center justify-center text-red-500'>{d1[0].total_sale}</div>
                            <div className='flex items-center justify-center'>{"Total Sales"}</div>
                        </div>
                        <div className='p-4 m-4 border-2 text-xl p-auto w-full rounded-md  border-blue-300 font-semibold'>
                            <div className='flex items-center justify-center text-green-500'>{d1[0].total_active}</div>
                            <div className='flex items-center justify-center'>{"Total Active Sales"}</div>
                        </div>
                        <div className='p-4 m-4 border-2 text-xl p-auto w-full rounded-md  border-blue-300 font-semibold'>
                            <div className='flex items-center justify-center text-yellow-500'>{d1[0].median_days_on_market}</div>
                            <div className='flex items-center justify-center'>{"Medain Days on Market"}</div>
                        </div>
                        <div className='p-4 m-4 border-2 text-xl p-auto w-full rounded-md  border-blue-300 font-semibold'>
                            <div className='flex items-center justify-center text-indigo-500'>{d1[0].median_active_list_price}</div>
                            <div className='flex items-center justify-center'>{"Median Active list Price"}</div>
                        </div>
                        <div className='p-4 m-4 border-2 text-xl p-auto w-full rounded-md  border-blue-300 font-semibold'>
                            <div className='flex items-center justify-center text-gray-500'>{d1[0].average_sale_to_list_ratio}</div>
                            <div className='flex items-center justify-center'>{"Average sale to list ratio"}</div>
                        </div>
                    </div>
                    <div className='flex flex-wrap justify-between'>
                        <div className='mt-8'><PieChart gData={g4} /></div>
                        <div className='mt-8'><Graph gData={g1} weekName={"1 week"} /></div>
                        <div className='mt-8'><Graph gData={g2} weekName={"4 weeks"} /></div>
                        <div className='mt-8'><Graph gData={g3} weekName={"12 weeks"} /></div>

                    </div>
                </div>
            )}
        </div>


    )

}