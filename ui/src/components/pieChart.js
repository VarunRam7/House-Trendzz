import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


const options = {
    responsive: false,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'sold vs pending sales',
        },
    },
};

export default function PieChart({ gData }) {
    const data = {
        labels: ['Sold', 'Pending'],
        datasets: [
            {
                label: '# of Votes',
                data: [gData[0].total_homes_sold, gData[0].pending_sales],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ]

            },
        ],
    };

    return <Doughnut data={data} width={500} height={500} options={options} />;

}
