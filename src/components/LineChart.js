import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getXaxisConfig, transformData} from './utils';

  const LineChartWrapper = ({ data }) => {
    const graphData = transformData(data);
    console.log(graphData)
    return (
      <div className="w-full h-64">
        <ResponsiveContainer>
          <LineChart data={graphData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" {...getXaxisConfig('date', 'dd MMM', 0, 0)} dy={10} />
            <YAxis             tickFormatter={(value) => {
              if (value >= 50000) {
                return new Intl.NumberFormat('en', {
                  notation: 'compact',
                  compactDisplay: 'short',
                }).format(value)
              }
              return value
            }} domain={['dataMin', 'auto']} scale='auto' />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="cases" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="deaths" stroke="#82ca9d" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="recovered" stroke="#ffc658" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  export default LineChartWrapper;
