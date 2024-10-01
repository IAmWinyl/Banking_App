"use client"

import React from 'react'
import { Doughnut } from 'react-chartjs-2'; 
import {Chart, ArcElement} from 'chart.js';

Chart.register(ArcElement);

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
    const accountNames = accounts.map((a) => a.name);
    const balances = accounts.map((a) => a.currentBalance);

    const data = {
        labels: accountNames,
        datasets: [
            {
                label: "Banks",
                data: balances,
                backgroundColor: ["#0747b6", "#2265b8", "#2f91fa"],

            }
        ]
    }
    return (
        <Doughnut 
            data={data}
            options={{
                cutout: '60%',
                plugins: {
                    legend: {
                        display: false,
                    }
                }
            }}
        />
    )
}

export default DoughnutChart