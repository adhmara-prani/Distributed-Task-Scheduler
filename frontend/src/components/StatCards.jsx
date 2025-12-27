import React from "react";
import {
  FiTrendingDown,
  FiTrendingUp,
  FiDollarSign,
  FiActivity,
  FiStar,
} from "react-icons/fi";

export const StatCards = () => {
  return (
    <>
      <Card
        title="Weekly Earnings"
        value="$845.50"
        pillText="12%"
        trend="up"
        period="Mon - Sun"
        Icon={FiDollarSign}
      />
      <Card
        title="Rides Completed"
        value="42"
        pillText="4%"
        trend="down"
        period="Last 7 days"
        Icon={FiActivity}
      />
      <Card
        title="Driver Rating"
        value="4.92"
        pillText="Top 5%"
        trend="up"
        period="Lifetime"
        Icon={FiStar}
      />
    </>
  );
};

const Card = ({ title, value, pillText, trend, period, Icon }) => {
  return (
    <div className="col-span-12 md:col-span-4 p-4 rounded border border-stone-300">
      <div className="flex mb-8 items-start justify-between">
        <div>
          <h3 className="text-stone-500 mb-2 text-sm flex items-center gap-2">
            {Icon && <Icon className="text-stone-400" />} {title}
          </h3>
          <p className="text-3xl font-semibold">{value}</p>
        </div>

        <span
          className={`text-xs flex items-center gap-1 font-medium px-2 py-1 rounded ${
            trend === "up"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {trend === "up" ? <FiTrendingUp /> : <FiTrendingDown />} {pillText}
        </span>
      </div>

      <p className="text-xs text-stone-500">{period}</p>
    </div>
  );
};
