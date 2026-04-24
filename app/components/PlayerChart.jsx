
"use client";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

export default function PlayerChart({ data }) {
  return (
    <LineChart width={400} height={200} data={data}>
      <XAxis dataKey="week"/>
      <YAxis/>
      <Tooltip/>
      <Line type="monotone" dataKey="value"/>
    </LineChart>
  );
}
