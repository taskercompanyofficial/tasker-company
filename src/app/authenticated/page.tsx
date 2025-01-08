"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Line, Doughnut, Bar as ChartJSBar } from "react-chartjs-2";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ReTooltip,
  ResponsiveContainer,
  BarChart,
  Legend as ReLegend,
  Bar,
} from "recharts";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { CheckCircle, XCircle, AlertCircle, BarChart2 } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
);

export default function DashboardPage() {
  // Complaints status data
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

  // Complaints by brand data
  const brandComplaintsData = {
    labels: ["Nike", "Adidas", "Puma", "Reebok", "Under Armour"],
    datasets: [
      {
        label: "Open",
        data: [45, 38, 32, 28, 25],
        backgroundColor: "rgba(99, 102, 241, 0.8)",
      },
      {
        label: "Closed",
        data: [35, 30, 25, 22, 20],
        backgroundColor: "rgba(34, 197, 94, 0.8)",
      },
      {
        label: "Rejected",
        data: [12, 10, 8, 7, 6],
        backgroundColor: "rgba(244, 63, 94, 0.8)",
      },
    ],
  };

  // Today's complaints timeline
  const todayComplaints = {
    labels: ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"],
    datasets: [
      {
        label: "Complaints",
        data: [12, 19, 15, 25, 22, 30, 28, 20, 18],
        borderColor: "rgb(99, 102, 241)",
        tension: 0.4,
        fill: true,
        backgroundColor: "rgba(99, 102, 241, 0.1)",
      },
    ],
  };

  const miniChartOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { display: false },
      y: { display: false },
    },
    elements: {
      point: { radius: 0 },
      line: { borderWidth: 2 },
    },
  };

  return (
    <div className="space-y-8 antialiased">
      {/* Quick Stats Section */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Opened Complaints",
            icon: <CheckCircle className="h-5 w-5 text-indigo-600" />,
            data: complaintStatusData.opened,
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
            data: complaintStatusData.closed,
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
            data: complaintStatusData.rejected,
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
            data: complaintStatusData.total,
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
                  <AreaChart
                    data={item.data.data.map((value, i) => ({
                      value,
                      name: i,
                    }))}
                  >
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
                className={`mt-2 flex items-center gap-1 text-xs font-medium ${item.data === complaintStatusData.rejected ? "text-red-600" : "text-emerald-600"} transition-all duration-300 group-hover:gap-2`}
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

      <div className="grid gap-8">
        {/* Complaints by Brand and Today's Timeline */}
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="shadow-lg md:col-span-2">
            <CardHeader>
              <CardTitle className="text-gray-800">
                Complaints by Brand
              </CardTitle>
              <CardDescription className="text-gray-600">
                Distribution of complaints across brands
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ChartJSBar
                data={brandComplaintsData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top",
                    },
                  },
                  scales: {
                    y: {
                      grid: {
                        color: "rgba(0,0,0,0.05)",
                      },
                    },
                    x: {
                      grid: {
                        display: false,
                      },
                    },
                  },
                }}
              />
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-800">Today's Timeline</CardTitle>
              <CardDescription className="text-gray-600">
                Hourly complaint volume
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Line
                data={todayComplaints}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        color: "rgba(0,0,0,0.05)",
                      },
                    },
                    x: {
                      grid: {
                        display: false,
                      },
                    },
                  },
                }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
