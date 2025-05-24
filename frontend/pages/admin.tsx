import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ChartBarIcon,
  ClockIcon,
  UserGroupIcon,
  CubeIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

const AdminDashboard = () => {
  interface ReportData {
    uniqueUsers: number;
    topPages: { page: string; count: number }[];
    avgTimePerPage: { page: string; avg_time_spent: number }[];
    topProducts: {
      product_id: string;
      product_name: string;
      count: number;
    }[];
    loggedInUserCount: number; // changed from loggedInCounts array to single number
  }

  const [report, setReport] = useState<ReportData | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchReport = async () => {
    const params: any = {};
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;

    try {
      const { data } = await axios.get("https://trackkart-production.up.railway.app/admin/report", {
        params,
      });
      setReport(data as ReportData);
    } catch (error) {
      console.error("Error fetching report:", error);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen pt-16 pb-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          📊 Admin Dashboard
        </h2>

        <div className="flex flex-wrap justify-center gap-10 mb-12">
          <label className="flex flex-col text-left text-black">
            <span className="mb-1 font-medium text-center">Start Date</span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </label>
          <label className="flex flex-col text-left text-black">
            <span className="mb-1 font-medium text-center">End Date</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </label>
          <button
            onClick={fetchReport}
            className="self-end px-5 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
          >
            Apply Filters
          </button>
        </div>

        {report && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Total Unique User Visits */}
            <Card
              icon={<UserGroupIcon className="w-6 h-6 text-indigo-600" />}
              title="Total Unique User Visits"
            >
              <p className="text-3xl font-semibold text-indigo-600">
                {report.uniqueUsers}
              </p>
            </Card>

            {/* Top 3 Visited Pages */}
            <Card
              icon={<ChartBarIcon className="w-6 h-6 text-indigo-600" />}
              title="Top 3 Visited Pages"
            >
              <List
                items={report.topPages.map((p) => `${p.page} — ${p.count}`)}
              />
            </Card>

            {/* Logged In Users */}
            <Card
              icon={<ArrowPathIcon className="w-6 h-6 text-indigo-600" />}
              title="Active Logged In Users"
            >
              <p className="text-gray-700 text-sm">
                {report.loggedInUserCount} user
                {report.loggedInUserCount !== 1 ? "s" : ""} currently logged in
              </p>
            </Card>

            {/* Top 5 Products Clicked" */}
            <Card
              icon={<CubeIcon className="w-6 h-6 text-indigo-600" />}
              title="Top 5 Products Clicked"
              span={2}
            >
              <List
                items={report.topProducts.map(
                  (p) => `PID:${p.product_id} : ${p.product_name} — ${p.count}`
                )}
              />
            </Card>

            {/* Avg. Time on Pages */}
            <Card
              icon={<ClockIcon className="w-6 h-6 text-indigo-600" />}
              title="Avg. Time on Pages"
            >
              <List
                items={report.avgTimePerPage.map(
                  (p) =>
                    `${p.page} — ${Number(p.avg_time_spent).toFixed(2)} sec`
                )}
              />
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

const Card = ({
  title,
  icon,
  children,
  span = 1,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  span?: number;
}) => (
  <div
    className={`bg-white rounded-2xl shadow p-6 text-left ${
      span === 2 ? "sm:col-span-2" : ""
    }`}
  >
    <div className="flex items-center gap-2 mb-2">
      {icon}
      <h3 className="text-lg font-bold text-gray-800">{title}</h3>
    </div>
    {children}
  </div>
);

const List = ({ items }: { items: string[] }) => (
  <ul className="list-disc pl-5 space-y-1 text-gray-700">
    {items.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </ul>
);

export default AdminDashboard;
