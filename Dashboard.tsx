import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Users, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  FileText,
  BarChart3,
  Plus
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalAssessments: 0,
    pendingReviews: 0,
    completedGrading: 0,
    averageScore: 0
  });

  const [recentActivity] = useState([
    { id: 1, type: 'assessment', title: 'ML Algorithm Implementation', student: 'John Doe', score: 85, time: '2 hours ago' },
    { id: 2, type: 'submission', title: 'AI Neural Network Project', student: 'Jane Smith', time: '4 hours ago' },
    { id: 3, type: 'grade', title: 'FSD React Application', student: 'Mike Johnson', score: 92, time: '6 hours ago' },
    { id: 4, type: 'feedback', title: 'ML Data Analysis', student: 'Sarah Wilson', time: '1 day ago' }
  ]);

  const gradeData = [
    { name: 'A+', value: 15, color: '#10B981' },
    { name: 'A', value: 25, color: '#3B82F6' },
    { name: 'B+', value: 30, color: '#8B5CF6' },
    { name: 'B', value: 20, color: '#F59E0B' },
    { name: 'C+', value: 8, color: '#EF4444' },
    { name: 'C', value: 2, color: '#6B7280' }
  ];

  const performanceData = [
    { subject: 'Code Efficiency', score: 78 },
    { subject: 'Experimental Setup', score: 85 },
    { subject: 'Viva Q&A', score: 72 },
    { subject: 'Documentation', score: 88 },
    { subject: 'Innovation', score: 65 }
  ];

  useEffect(() => {
    // Simulate API call
    setStats({
      totalAssessments: user?.role === 'faculty' ? 127 : 23,
      pendingReviews: user?.role === 'faculty' ? 8 : 3,
      completedGrading: user?.role === 'faculty' ? 119 : 20,
      averageScore: user?.role === 'faculty' ? 82.5 : 78.2
    });
  }, [user]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'assessment': return CheckCircle;
      case 'submission': return FileText;
      case 'grade': return BarChart3;
      case 'feedback': return AlertTriangle;
      default: return FileText;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'assessment': return 'text-green-600 bg-green-100';
      case 'submission': return 'text-blue-600 bg-blue-100';
      case 'grade': return 'text-purple-600 bg-purple-100';
      case 'feedback': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-indigo-100 text-lg">
              {user?.role === 'faculty' 
                ? `Managing ${user.facultyInfo?.department} Lab assessments` 
                : 'Track your academic progress'}
            </p>
          </div>
          <div className="text-right">
            <p className="text-indigo-100 text-sm">Current Semester</p>
            <p className="text-2xl font-bold">Fall 2024</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Assessments</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalAssessments}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600" />
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
              <p className="text-sm font-medium text-gray-600">
                {user?.role === 'faculty' ? 'Pending Reviews' : 'Pending Submissions'}
              </p>
              <p className="text-3xl font-bold text-gray-900">{stats.pendingReviews}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-orange-500 text-sm font-medium">Due this week</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                {user?.role === 'faculty' ? 'Completed Grading' : 'Completed Assessments'}
              </p>
              <p className="text-3xl font-bold text-gray-900">{stats.completedGrading}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-500">94%</span>
            <span className="text-gray-600 ml-2">completion rate</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Score</p>
              <p className="text-3xl font-bold text-gray-900">{stats.averageScore}%</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500">+3.2%</span>
            <span className="text-gray-600 ml-2">improvement</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              {user?.role === 'faculty' ? 'Student Performance Overview' : 'Your Performance Breakdown'}
            </h3>
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option>Last 30 days</option>
              <option>Last 3 months</option>
              <option>Last 6 months</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Grade Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Grade Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={gradeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {gradeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {gradeData.map((grade) => (
              <div key={grade.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: grade.color }}
                  />
                  <span className="text-gray-600">Grade {grade.name}</span>
                </div>
                <span className="font-medium">{grade.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
            View All
          </button>
        </div>
        <div className="space-y-4">
          {recentActivity.map((activity) => {
            const Icon = getActivityIcon(activity.type);
            return (
              <div key={activity.id} className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                <div className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-600">
                    {activity.student && `${activity.student} • `}{activity.time}
                  </p>
                </div>
                {activity.score && (
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{activity.score}%</p>
                    <p className="text-xs text-gray-500">Score</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      {user?.role === 'faculty' && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition-colors group">
              <Plus className="w-6 h-6 text-gray-400 group-hover:text-indigo-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-600 group-hover:text-indigo-700">New Assessment</p>
            </button>
            <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-colors group">
              <Users className="w-6 h-6 text-gray-400 group-hover:text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-600 group-hover:text-purple-700">Manage Students</p>
            </button>
            <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors group">
              <FileText className="w-6 h-6 text-gray-400 group-hover:text-green-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-600 group-hover:text-green-700">Create Rubric</p>
            </button>
            <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-colors group">
              <BarChart3 className="w-6 h-6 text-gray-400 group-hover:text-orange-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-600 group-hover:text-orange-700">View Reports</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;