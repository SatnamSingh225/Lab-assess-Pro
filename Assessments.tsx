import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Eye,
  Edit,
  Download
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { format } from 'date-fns';

const Assessments: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [labFilter, setLabFilter] = useState('all');

  const [assessments] = useState([
    {
      id: 1,
      title: 'Machine Learning Algorithm Implementation',
      labType: 'ML',
      student: { name: 'John Doe', email: 'john.doe@university.edu' },
      faculty: { name: 'Faculty Akash' },
      status: 'submitted',
      totalScore: null,
      grade: null,
      dueDate: new Date('2024-12-20'),
      submittedAt: new Date('2024-12-18'),
      createdAt: new Date('2024-12-10')
    },
    {
      id: 2,
      title: 'Neural Network Project',
      labType: 'AI',
      student: { name: 'Jane Smith', email: 'jane.smith@university.edu' },
      faculty: { name: 'Faculty Saravanan' },
      status: 'graded',
      totalScore: 85,
      grade: 'A',
      dueDate: new Date('2024-12-15'),
      submittedAt: new Date('2024-12-14'),
      gradedAt: new Date('2024-12-16'),
      createdAt: new Date('2024-12-05')
    },
    {
      id: 3,
      title: 'Full Stack Web Application',
      labType: 'FSD',
      student: { name: 'Mike Johnson', email: 'mike.johnson@university.edu' },
      faculty: { name: 'Faculty Prasad' },
      status: 'graded',
      totalScore: 92,
      grade: 'A+',
      dueDate: new Date('2024-12-22'),
      submittedAt: new Date('2024-12-20'),
      gradedAt: new Date('2024-12-21'),
      createdAt: new Date('2024-12-12')
    },
    {
      id: 4,
      title: 'Data Analysis with Python',
      labType: 'ML',
      student: { name: 'Sarah Wilson', email: 'sarah.wilson@university.edu' },
      faculty: { name: 'Faculty Akash' },
      status: 'draft',
      totalScore: null,
      grade: null,
      dueDate: new Date('2024-12-25'),
      submittedAt: null,
      createdAt: new Date('2024-12-15')
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'text-gray-600 bg-gray-100';
      case 'submitted': return 'text-blue-600 bg-blue-100';
      case 'graded': return 'text-green-600 bg-green-100';
      case 'reviewed': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return FileText;
      case 'submitted': return Clock;
      case 'graded': return CheckCircle;
      case 'reviewed': return Eye;
      default: return FileText;
    }
  };

  const getLabColor = (labType: string) => {
    switch (labType) {
      case 'ML': return 'text-green-700 bg-green-100';
      case 'AI': return 'text-purple-700 bg-purple-100';
      case 'FSD': return 'text-blue-700 bg-blue-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+':
      case 'A': return 'text-green-700 bg-green-100';
      case 'B+':
      case 'B': return 'text-blue-700 bg-blue-100';
      case 'C+':
      case 'C': return 'text-yellow-700 bg-yellow-100';
      case 'D': return 'text-orange-700 bg-orange-100';
      case 'F': return 'text-red-700 bg-red-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const filteredAssessments = assessments.filter(assessment => {
    const matchesSearch = assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assessment.student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || assessment.status === statusFilter;
    const matchesLab = labFilter === 'all' || assessment.labType === labFilter;
    
    return matchesSearch && matchesStatus && matchesLab;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assessments</h1>
          <p className="text-gray-600">
            {user?.role === 'faculty' 
              ? 'Manage and grade student assessments' 
              : 'View your submitted assessments and grades'}
          </p>
        </div>
        {user?.role === 'faculty' && (
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>New Assessment</span>
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search assessments, students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="submitted">Submitted</option>
            <option value="graded">Graded</option>
            <option value="reviewed">Reviewed</option>
          </select>

          <select
            value={labFilter}
            onChange={(e) => setLabFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="all">All Labs</option>
            <option value="ML">ML Lab</option>
            <option value="AI">AI Lab</option>
            <option value="FSD">FSD Lab</option>
          </select>

          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* Assessment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">{assessments.length}</p>
            </div>
            <FileText className="w-8 h-8 text-gray-400" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Submitted</p>
              <p className="text-2xl font-bold text-blue-600">
                {assessments.filter(a => a.status === 'submitted').length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Graded</p>
              <p className="text-2xl font-bold text-green-600">
                {assessments.filter(a => a.status === 'graded').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Score</p>
              <p className="text-2xl font-bold text-purple-600">
                {Math.round(assessments.filter(a => a.totalScore).reduce((sum, a) => sum + a.totalScore!, 0) / assessments.filter(a => a.totalScore).length)}%
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-purple-400" />
          </div>
        </div>
      </div>

      {/* Assessments List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assessment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {user?.role === 'faculty' ? 'Student' : 'Faculty'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score/Grade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAssessments.map((assessment) => {
                const StatusIcon = getStatusIcon(assessment.status);
                return (
                  <tr key={assessment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getLabColor(assessment.labType)}`}>
                            <span className="text-xs font-semibold">{assessment.labType}</span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {assessment.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            Created {format(assessment.createdAt, 'MMM dd, yyyy')}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {user?.role === 'faculty' ? assessment.student.name : assessment.faculty.name}
                        </div>
                        {user?.role === 'faculty' && (
                          <div className="text-sm text-gray-500">{assessment.student.email}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(assessment.status)}`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {assessment.status.charAt(0).toUpperCase() + assessment.status.slice(1)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {assessment.totalScore ? (
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-900">
                            {assessment.totalScore}%
                          </span>
                          <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getGradeColor(assessment.grade!)}`}>
                            {assessment.grade}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {format(assessment.dueDate, 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-indigo-600 hover:text-indigo-900">
                          <Eye className="w-4 h-4" />
                        </button>
                        {user?.role === 'faculty' && (
                          <button className="text-gray-600 hover:text-gray-900">
                            <Edit className="w-4 h-4" />
                          </button>
                        )}
                        <button className="text-gray-600 hover:text-gray-900">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filteredAssessments.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No assessments found</h3>
          <p className="text-gray-500">
            {searchTerm || statusFilter !== 'all' || labFilter !== 'all'
              ? 'Try adjusting your search or filter criteria.'
              : user?.role === 'faculty'
                ? 'Create your first assessment to get started.'
                : 'No assessments have been assigned yet.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default Assessments;