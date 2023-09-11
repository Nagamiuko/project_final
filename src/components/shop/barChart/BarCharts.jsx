import React from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarCharts = ({data , title , qty}) => {
  return (
     <>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis dataKey="Total"/>
          <Tooltip />
          <Legend />
          <Bar dataKey="Total" fill="#8884d8" />
          {/* <Bar dataKey="Total" fill="#82ca9d" /> */}
        </BarChart>
      </ResponsiveContainer>
   </>
  )
}

export default BarCharts
