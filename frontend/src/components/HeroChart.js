import React from 'react';
import {
	Radar,
	RadarChart,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis,
	ResponsiveContainer,
} from 'recharts';

const HeroChart = ({ chartData }) => {
	return (
		<ResponsiveContainer width="100%" height="100%" margin="10">
			<RadarChart
				cx="50%"
				cy="50%"
				outerRadius="70%"
				data={chartData}
				margin={{ top: 0, left: 40, right: 40, bottom: 0 }}
			>
				<PolarGrid />
				<PolarAngleAxis dataKey="name" tick={{ fill: 'white' }} />
				<PolarRadiusAxis dataKey="fullMark" tick={{ fontSize: '0.7em' }} />
				<Radar
					dataKey="amt"
					stroke="#8884d8"
					fill="#8884d8"
					fillOpacity={0.6}
				/>
			</RadarChart>
		</ResponsiveContainer>
	);
};

export default HeroChart;
