"use client";
import React from "react";
import {
  AreaChart,
  Area,
  Tooltip as ReTooltip,
  ResponsiveContainer,
} from "recharts";
import { CheckCircle, XCircle, AlertCircle, BarChart2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export default function ChartsByStatus() {
  const complaintStatusData = {
    opened: {
      count: 245,
      trend: "+12%",
      data: [20, 25, 18, 30, 22, 28, 24],
    },
    closed: {
      count: 182,
      trend: "+8%",
      data: [15, 20, 25, 18, 22, 20, 18],
    },
    rejected: {
      count: 63,
      trend: "-5%",
      data: [8, 12, 10, 13, 7, 9, 11],
    },
    total: {
      count: 490,
      trend: "+15%",
      data: [43, 57, 53, 61, 51, 57, 53],
    },
  };
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {[
        {
          title: "Opened Complaints",
          icon: <CheckCircle className="h-5 w-5 text-indigo-600" />,
          data: {
            count: 0,
            trend: "0%",
            data: [
              { date: "2024-01-01", value: 0 },
              { date: "2024-01-02", value: 0 },
              { date: "2024-01-03", value: 0 },
              { date: "2024-01-04", value: 0 },
              { date: "2024-01-05", value: 0 },
              { date: "2024-01-06", value: 0 },
              { date: "2024-01-07", value: 0 },
              { date: "2024-01-08", value: 0 },
            ],
          },
          color: {
            text: "text-indigo-600",
            border: "rgb(99, 102, 241)",
            background: "rgba(99, 102, 241, 0.1)",
          },
          tooltip: "Active complaints awaiting resolution",
        },
        {
          title: "Closed Complaints",
          icon: <XCircle className="h-5 w-5 text-emerald-600" />,
          data: {
            count: 1,
            trend: "+100%",
            data: [
              { date: "2024-01-01", value: 0 },
              { date: "2024-01-02", value: 0 },
              { date: "2024-01-03", value: 0 },
              { date: "2024-01-04", value: 0 },
              { date: "2024-01-05", value: 0 },
              { date: "2024-01-06", value: 0 },
              { date: "2024-01-07", value: 0 },
              { date: "2024-01-08", value: 1 },
            ],
          },
          color: {
            text: "text-emerald-600",
            border: "rgb(34, 197, 94)",
            background: "rgba(34, 197, 94, 0.1)",
          },
          tooltip: "Successfully resolved complaints",
        },
        {
          title: "Rejected Complaints",
          icon: <AlertCircle className="h-5 w-5 text-red-600" />,
          data: {
            count: 0,
            trend: "0%",
            data: [
              { date: "2024-01-01", value: 0 },
              { date: "2024-01-02", value: 0 },
              { date: "2024-01-03", value: 0 },
              { date: "2024-01-04", value: 0 },
              { date: "2024-01-05", value: 0 },
              { date: "2024-01-06", value: 0 },
              { date: "2024-01-07", value: 0 },
              { date: "2024-01-08", value: 0 },
            ],
          },
          color: {
            text: "text-red-600",
            border: "rgb(244, 63, 94)",
            background: "rgba(244, 63, 94, 0.1)",
          },
          tooltip: "Complaints marked as invalid or rejected",
        },
        {
          title: "Total Complaints",
          icon: <BarChart2 className="h-5 w-5 text-violet-600" />,
          data: {
            count: 3,
            trend: "+100%",
            data: [
              { date: "2024-01-01", value: 0 },
              { date: "2024-01-02", value: 0 },
              { date: "2024-01-03", value: 0 },
              { date: "2024-01-04", value: 0 },
              { date: "2024-01-05", value: 0 },
              { date: "2024-01-06", value: 0 },
              { date: "2024-01-07", value: 0 },
              { date: "2024-01-08", value: 3 },
            ],
          },
          color: {
            text: "text-violet-600",
            border: "rgb(139, 92, 246)",
            background: "rgba(139, 92, 246, 0.1)",
          },
          tooltip: "Total number of complaints received",
        },
      ].map((item, index) => (
        <Card
          key={index}
          className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="group/tooltip relative text-sm font-medium text-gray-800 transition-colors duration-200 group-hover:text-gray-900">
                {item.title}
                <span className="absolute -top-2 left-0 z-50 w-max rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover/tooltip:opacity-100">
                  {item.tooltip}
                </span>
              </CardTitle>
              <div className="transform transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                {item.icon}
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div
              className={`text-2xl font-bold ${item.color.text} transition-all duration-300 group-hover:scale-110`}
            >
              {item.data.count}
            </div>

            <div className="mt-2 h-[50px] transition-transform duration-300 group-hover:translate-y-1">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={item.data.data}>
                  <defs>
                    <linearGradient
                      id={`gradient-${index}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor={item.color.border}
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="100%"
                        stopColor={item.color.border}
                        stopOpacity={0.2}
                      />
                    </linearGradient>
                  </defs>
                  <ReTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border border-gray-200 bg-white/90 p-2 shadow-lg backdrop-blur-sm">
                            <p className="text-sm font-medium">{`Date: ${payload[0].payload.date}`}</p>
                            <p className="text-sm font-medium">{`Value: ${payload[0].value}`}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={item.color.border}
                    fill={`url(#gradient-${index})`}
                    strokeWidth={2}
                    animationDuration={1000}
                    animationEasing="ease-in-out"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <p
              className={`mt-2 flex items-center gap-1 text-xs font-medium ${
                item.data.trend.startsWith("-")
                  ? "text-red-600"
                  : "text-emerald-600"
              } transition-all duration-300 group-hover:gap-2`}
            >
              <span>{item.data.trend}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                from last month
              </span>
            </p>

            <div className="mt-3 h-1 w-full rounded-full bg-gray-100">
              <div
                className="h-1 rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${(item.data.count / complaintStatusData.total.count) * 100}%`,
                  backgroundColor: item.color.border,
                }}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
