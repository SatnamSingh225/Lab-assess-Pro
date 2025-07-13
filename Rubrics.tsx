import React, { useState } from 'react';
import { Plus, Search, Edit, Copy, Trash2, Eye } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Rubrics: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [labFilter, setLabFilter] = useState('all');

  const [rubrics] = useState([
    {
      id: 1,
      name: 'ML Algorithm Assessment',
      description: 'Comprehensive rubric for machine learning algorithm implementation and evaluation',
      labType: 'ML',
      criteria: [
        { name: 'Code Efficiency', weight: 0.4 },
        { name: 'Algorithm Accuracy', weight: 0.3 },
        { name: 'Documentation', weight: 0.3 }
      ],
      isDefault: true,
      createdBy: 'Faculty Akash',
      createdAt: new Date('2024-11-15'),
      usageCount: 45
    },
    {
      id: 2,
      name: 'AI Neural Network Project',
      description: 'Evaluation criteria for neural network design and implementation projects',
      labType: 'AI',
      criteria: [
        { name: 'Network Architecture', weight: 0.35 },
        { name: 'Training Process', weight: 0.25 },
        { name: 'Performance Analysis', weight: 0.25 },
        { name: 'Viva Q&A', weight: 0.15 }
      ],
      isDefault: true,
      createdBy: 'Faculty Saravanan',
      createdAt: new Date('2024-11-20'),
      usageCount: 32
    },
    {
      id: 3,
      name: 'Full Stack Development',
      description: 'Complete assessment rubric for full stack web application projects',
      labType: 'FSD',
      criteria: [
        { name: 'Frontend Implementation', weight: 0.3 },
        { name: 'Backend Development', weight: 0.3 },
        { name: 'Database Design', weight: 0.2 },
        { name: 'Deployment & Testing', weight: 0.2 }
      ],
      isDefault: true,
      createdBy: 'Faculty Prasad',
      createdAt: new Date('2024-11-25'),
      usageCount: 28
    },
    {
      id: 4,
      name: 'Custom ML Project Rubric',
      description: 'Customized rubric for advanced machine learning research projects',
      labType: 'ML',
      criteria: [
        { name: 'Research Methodology', weight: 0.25 },
        { name: 'Implementation Quality', weight: 0.25 },
        { name: 'Results Analysis', weight: 0.25 },
        { name: 'Innovation Factor', weight: 0.25 }
      ],
      isDefault: false,
      createdBy: 'Faculty Akash',
      createdAt: new Date('2024-12-01'),
      usageCount: 8
    }
  ]);

  const getLabColor = (labType: string) => {
    switch (labType) {
      case 'ML': return 'text-green-700 bg-green-100 border-green-200';
      case 'AI': return 'text-purple-700 bg-purple-100 border-purple-200';
      case 'FSD': return 'text-blue-700 bg-blue-100 border-blue-200';
      default: return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const filteredRubrics = rubrics.filter(rubric => {
    const matchesSearch = rubric.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rubric.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLab = labFilter === 'all' || rubric.labType === labFilter;
    
    return matchesSearch && matchesLab;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assessment Rubrics</h1>
          <p className="text-gray-600">Create and manage evaluation criteria for lab assessments</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Create Rubric</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search rubrics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          
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
        </div>
      </div>

      {/* Rubrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRubrics.map((rubric) => (
          <div key={rubric.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{rubric.name}</h3>
                  {rubric.isDefault && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-3">{rubric.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className={`inline-flex items-center px-2 py-1 rounded border ${getLabColor(rubric.labType)}`}>
                    {rubric.labType} Lab
                  </span>
                  <span>Used {rubric.usageCount} times</span>
                  <span>By {rubric.createdBy}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                  <Copy className="w-4 h-4" />
                </button>
                {user?.role === 'faculty' && (
                  <>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                      <Edit className="w-4 h-4" />
                    </button>
                    {!rubric.isDefault && (
                      <button className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Criteria Preview */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Assessment Criteria</h4>
              {rubric.criteria.map((criterion, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-900">{criterion.name}</span>
                  <span className="text-sm text-gray-600">{Math.round(criterion.weight * 100)}%</span>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
              <span className="text-xs text-gray-500">
                Created {rubric.createdAt.toLocaleDateString()}
              </span>
              <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                Use This Rubric
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredRubrics.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No rubrics found</h3>
          <p className="text-gray-500 mb-6">
            {searchTerm || labFilter !== 'all'
              ? 'Try adjusting your search or filter criteria.'
              : 'Create your first rubric to get started with assessments.'}
          </p>
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 inline-flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>Create Your First Rubric</span>
          </button>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Rubrics</p>
              <p className="text-2xl font-bold text-gray-900">{rubrics.length}</p>
            </div>
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-semibold text-sm">{rubrics.length}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Default Rubrics</p>
              <p className="text-2xl font-bold text-green-600">
                {rubrics.filter(r => r.isDefault).length}
              </p>
            </div>
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 font-semibold text-sm">
                {rubrics.filter(r => r.isDefault).length}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Most Used</p>
              <p className="text-xl font-bold text-purple-600">
                {Math.max(...rubrics.map(r => r.usageCount))} times
              </p>
            </div>
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 font-semibold text-sm">★</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Custom Rubrics</p>
              <p className="text-2xl font-bold text-orange-600">
                {rubrics.filter(r => !r.isDefault).length}
              </p>
            </div>
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-orange-600 font-semibold text-sm">
                {rubrics.filter(r => !r.isDefault).length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rubrics;