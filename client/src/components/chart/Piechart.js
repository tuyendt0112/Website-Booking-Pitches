import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { apiGetUsers } from "apis";
import { useParams } from "react-router-dom";
import { renderCustomizedLabel } from "ultils/helper";

const Piechart = () => {
  const COLORS = ["#00C49F", "#FFBB28", "#FF8042"];

  const [user, setUser] = useState(null);
  const [user2, setUser2] = useState(null);

  const fetchUsers1 = async () => {
    const response = await apiGetUsers({ role: "3" });
    if (response.success) setUser(response);
  };

  const fetchUsers2 = async () => {
    const response = await apiGetUsers({ role: "2" });
    if (response.success) setUser2(response);
  };
  useEffect(() => {
    fetchUsers1();
    fetchUsers2();
  }, []);

  const data = [
    { name: "Player", value: user?.counts },
    { name: "Pitch Owner", value: user2?.counts },
  ];

  return (
    <div className="w-full h-[22rem] p-4 rounded-sm border border-gray-200 flex flex-col">
      <strong className="text-white font-bold text-center">
        Buyer Profile
      </strong>
      <div className="mt-3 w-full flex-1 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={300}>
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={105}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Piechart;
