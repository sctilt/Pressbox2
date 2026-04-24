"use client";

import {
  LineChart, Line, XAxis, YAxis, Tooltip
} from "recharts";

export default function PlayerChart({ data }) {
  return (
    <LineChart width={500} height={250} data={data}>
      <XAxis dataKey="week" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="value" stroke="#ffd100" />
    </LineChart>
  );
}
