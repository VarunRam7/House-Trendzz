import React, { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


export const options = {
    responsive: false,
    plugins: {
        legend: {
            position: 'top',
        },

    },
};

export default function Graph({ gData, weekName }) {

    const [label, setLabel] = useState([]);
    const [totalData, setTotalData] = useState([]);


    useEffect(() => {
        let l = []
        let t = []

        if (gData.length !== 0) {
            gData.forEach(x => {
                l.push(x.duration)
                t.push(x.sales)
            })
        }

        setLabel(l)
        setTotalData(t)


    }, [gData])




    const data = {
        labels: label,
        datasets: [
            {
                label: weekName,
                data: totalData,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },

        ],
    };


    return <Line options={options} data={data} width={800} height={500} />;


}

