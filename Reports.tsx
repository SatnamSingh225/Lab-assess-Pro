import React, { useState } from 'react';
import { 
  Download, 
  Filter, 
  Calendar, 
  TrendingUp, 
  Users, 
  Award,
  BarChart3,
  PieChart
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart as RechartsPieChart,
  Cell,
  Area,
  AreaChart
} from 'recharts';

const Reports: React.FC = () => {
  const [dateRange, setDateRange] = useState('last30days');
  const [labFilter, setLabFilter] = useState('all');
  const [reportType, setReportType] = useState('overview');

  // Mock data
  const performanceData = [
    { month: 'Aug', ML: 78, AI: 82, FSD: 75 },
    { month: 'Sep', ML: 82, AI: 85, FSD: 79 },
    { month: 'Oct', ML: 85, AI: 88, FSD: 82 },
    { month: 'Nov', ML: 88, AI: 90, FSD: 85 },
    { month: 'Dec', ML: 90, AI: 92, FSD: 88 }
  ];

  const gradeDistribution = [
    { name: 'A+', value: 15, color: '#10B981' },
    { name: 'A', value: 25, color: '#3B82F6' },
    { name: 'B+', value: 30, color: '#8B5CF6' },
    { name: 'B', value: 20, color: '#F59E0B' },
    { name: 'C+', value: 8, color: '#EF4444' },
    { name: 'C', value: 2, color: '#6B7280' }
  ];

  const studentProgress = [
    { name: 'John Doe', ML: 85, AI: 88, FSD: 82, average: 85 },
    { name: 'Jane Smith', ML: 92, AI: 90, FSD: 94, average: 92 },
    { name: 'Mike Johnson', ML: 78, AI: 82, FSD: 80, average: 80 },
    { name: 'Sarah Wilson', ML: 88, AI: 85, FSD: 90, average: 88 },
    { name: 'David Brown', ML: 75, AI: 78, FSD: 76, average: 76 }
  ];

  const assessmentTrends = [
    { week: 'Week 1', submitted: 45, graded: 42, pending: 3 },
    { week: 'Week 2', submitted: 52, graded: 48, pending: 4 },
    { week: 'Week 3', submitted: 48, graded: 46, pending: 2 },
    { week: 'Week 4', submitted: 55, graded: 52, pending: 3 }
  ];

  const labComparison = [
    { lab: 'ML Lab', students: 45, avgScore: 85.2, completion: 94 },
    { lab: 'AI Lab', students: 38, avgScore: 87.8, completion: 97 },
    { lab: 'FSD Lab', students: 42, avgScore: 83.5, completion: 91 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assessment Reports</h1>
          <p className="text-gray-600">Comprehensive analytics and insights for lab assessments</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="overview">Overview</option>
              <option value="performance">Performance Analysis</option>
              <option value="student">Student Progress</option>
              <option value="comparison">Lab Comparison</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="last7days">Last 7 days</option>
              <option value="last30days">Last 30 days</option>
              <option value="last3months">Last 3 months</option>
              <option value="semester">Current Semester</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Lab Filter</label>
            <select
              value={labFilter}
              onChange={(e) => setLabFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="all">All Labs</option>
              <option value="ML">ML Lab</option>
              <option value="AI">AI Lab</option>
              <option value="FSD">FSD Lab</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Export Format</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
              <option value="pdf">PDF Report</option>
              <option value="excel">Excel Spreadsheet</option>
              <option value="csv">CSV Data</option>
            </select>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Assessments</p>
              <p className="text-3xl font-bold text-gray-900">247</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500">+12%</span>
            <span className="text-gray-600 ml-2">from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Score</p>
              <p className="text-3xl font-bold text-gray-900">85.7%</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Award className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500">+2.3%</span>
            <span className="text-gray-600 ml-2">improvement</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Students</p>
              <p className="text-3xl font-bold text-gray-900">125</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-purple-500">94%</span>
            <span className="text-gray-600 ml-2">participation rate</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completion Rate</p>
              <p className="text-3xl font-bold text-gray-900">94%</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <PieChart className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-orange-500">232/247</span>
            <span className="text-gray-600 ml-2">completed</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trends */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Performance Trends</h3>
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option>Last 5 months</option>
              <option>Last 3 months</option>
              <option>Current semester</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="ML" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
              <Area type="monotone" dataKey="AI" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
              <Area type="monotone" dataKey="FSD" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Grade Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Grade Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <RechartsPieChart>
              <Pie
                data={gradeDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {gradeDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {gradeDistribution.map((grade) => (
              <div key={grade.name} className="flex items-center space-x-2 text-sm">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: grade.color }}
                />
                <span className="text-gray-600">{grade.name}: {grade.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Assessment Trends */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Assessment Submission Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={assessmentTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="submitted" stroke="#3B82F6" strokeWidth={3} />
            <Line type="monotone" dataKey="graded" stroke="#10B981" strokeWidth={3} />
            <Line type="monotone" dataKey="pending" stroke="#F59E0B" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Student Performance Table */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Top Performing Students</h3>
          <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
            View All Students
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ML Lab
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  AI Lab
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  FSD Lab
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Average
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {studentProgress.map((student, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{student.ML}%</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{student.AI}%</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{student.FSD}%</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      student.average >= 90 ? 'bg-green-100 text-green-800' :
                      student.average >= 80 ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {student.average}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lab Comparison */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Lab Performance Comparison</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {labComparison.map((lab, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900">{lab.lab}</h4>
                <span className={`w-3 h-3 rounded-full ${
                  lab.lab === 'ML Lab' ? 'bg-green-500' :
                  lab.lab === 'AI Lab' ? 'bg-purple-500' : 'bg-blue-500'
                }`} />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Students</span>
                  <span className="font-medium">{lab.students}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Avg Score</span>
                  <span className="font-medium">{lab.avgScore}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Completion</span>
                  <span className="font-medium">{lab.completion}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;