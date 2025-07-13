import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  Download, 
  Upload, 
  Mic, 
  Video, 
  Image, 
  Play, 
  Pause,
  Star,
  MessageSquare,
  Save,
  Send,
  FileText
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useDropzone } from 'react-dropzone';

const AssessmentDetail: React.FC = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isRecording, setIsRecording] = useState(false);
  const [scores, setScores] = useState({
    codeEfficiency: { score: 0, feedback: '' },
    experimentalSetup: { score: 0, feedback: '' },
    vivaQA: { score: 0, feedback: '' }
  });

  // Mock assessment data
  const assessment = {
    id: parseInt(id || '1'),
    title: 'Machine Learning Algorithm Implementation',
    description: 'Implement and evaluate a machine learning algorithm for classification tasks',
    labType: 'ML',
    student: {
      name: 'John Doe',
      email: 'john.doe@university.edu',
      rollNumber: 'CS2021001'
    },
    faculty: {
      name: 'Faculty Akash',
      department: 'ML'
    },
    status: 'submitted',
    dueDate: new Date('2024-12-20'),
    submittedAt: new Date('2024-12-18'),
    rubric: {
      name: 'ML Algorithm Assessment Rubric',
      criteria: [
        { name: 'Code Efficiency', weight: 0.4, maxScore: 100 },
        { name: 'Experimental Setup', weight: 0.3, maxScore: 100 },
        { name: 'Viva Q&A', weight: 0.3, maxScore: 100 }
      ]
    },
    submissions: [
      {
        type: 'code',
        filename: 'ml_algorithm.py',
        originalName: 'ml_algorithm.py',
        size: 15420,
        uploadedAt: new Date('2024-12-18T10:30:00')
      },
      {
        type: 'document',
        filename: 'report.pdf',
        originalName: 'ML_Algorithm_Report.pdf',
        size: 2847392,
        uploadedAt: new Date('2024-12-18T10:35:00')
      }
    ]
  };

  const onDrop = (acceptedFiles: File[]) => {
    console.log('Files uploaded:', acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.m4a'],
      'video/*': ['.mp4', '.avi', '.mov'],
      'image/*': ['.png', '.jpg', '.jpeg']
    }
  });

  const handleScoreChange = (criterion: string, field: string, value: string | number) => {
    setScores(prev => ({
      ...prev,
      [criterion]: {
        ...prev[criterion as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const calculateTotalScore = () => {
    const { codeEfficiency, experimentalSetup, vivaQA } = scores;
    return Math.round(
      codeEfficiency.score * 0.4 + 
      experimentalSetup.score * 0.3 + 
      vivaQA.score * 0.3
    );
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'submissions', label: 'Submissions' },
    { id: 'grading', label: 'Grading', faculty: true },
    { id: 'multimedia', label: 'Multimedia', faculty: true },
    { id: 'feedback', label: 'Feedback' }
  ];

  const filteredTabs = tabs.filter(tab => !tab.faculty || user?.role === 'faculty');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{assessment.title}</h1>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>Lab: {assessment.labType}</span>
              <span>•</span>
              <span>Student: {assessment.student.name}</span>
              <span>•</span>
              <span>Due: {assessment.dueDate.toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {user?.role === 'faculty' && (
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2">
              <Save className="w-4 h-4" />
              <span>Save Grade</span>
            </button>
          )}
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Status Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-medium text-blue-900">Assessment Submitted</p>
              <p className="text-sm text-blue-700">
                Submitted on {assessment.submittedAt?.toLocaleDateString()} at {assessment.submittedAt?.toLocaleTimeString()}
              </p>
            </div>
          </div>
          {user?.role === 'faculty' && (
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
              <Send className="w-4 h-4" />
              <span>Start Grading</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {filteredTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Assessment Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <p className="text-gray-600">{assessment.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Lab Type</label>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        {assessment.labType}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {assessment.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Rubric Criteria</h3>
                <div className="space-y-4">
                  {assessment.rubric.criteria.map((criterion, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{criterion.name}</h4>
                        <p className="text-sm text-gray-600">Max Score: {criterion.maxScore}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{Math.round(criterion.weight * 100)}%</p>
                        <p className="text-sm text-gray-600">Weight</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Info</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <p className="text-gray-900">{assessment.student.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="text-gray-600">{assessment.student.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Roll Number</label>
                    <p className="text-gray-600">{assessment.student.rollNumber}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Faculty Info</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <p className="text-gray-900">{assessment.faculty.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Department</label>
                    <p className="text-gray-600">{assessment.faculty.department} Lab</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'submissions' && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Submitted Files</h3>
            <div className="space-y-4">
              {assessment.submissions.map((submission, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{submission.originalName}</p>
                      <p className="text-sm text-gray-600">
                        {(submission.size / 1024).toFixed(1)} KB • Uploaded {submission.uploadedAt.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'grading' && user?.role === 'faculty' && (
          <div className="space-y-6">
            {assessment.rubric.criteria.map((criterion, index) => {
              const criterionKey = criterion.name.toLowerCase().replace(/\s+/g, '').replace(/[^a-z]/g, '') as keyof typeof scores;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{criterion.name}</h3>
                    <span className="text-sm text-gray-600">Weight: {Math.round(criterion.weight * 100)}%</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Score (0-100)</label>
                      <div className="flex items-center space-x-4">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={scores[criterionKey]?.score || 0}
                          onChange={(e) => handleScoreChange(criterionKey, 'score', parseInt(e.target.value))}
                          className="flex-1"
                        />
                        <div className="w-16 text-center">
                          <span className="text-2xl font-bold text-indigo-600">
                            {scores[criterionKey]?.score || 0}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Poor</span>
                        <span>Average</span>
                        <span>Excellent</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Feedback</label>
                      <textarea
                        value={scores[criterionKey]?.feedback || ''}
                        onChange={(e) => handleScoreChange(criterionKey, 'feedback', e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Provide specific feedback for this criterion..."
                      />
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Total Score</h3>
                  <p className="text-sm text-gray-600">Calculated based on rubric weights</p>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-bold text-indigo-600">{calculateTotalScore()}%</p>
                  <div className="flex items-center space-x-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(calculateTotalScore() / 20)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'multimedia' && user?.role === 'faculty' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Multimedia Annotations</h3>
              
              <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-gray-400'
              }`}>
                <input {...getInputProps()} />
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">
                  {isDragActive ? 'Drop files here' : 'Upload multimedia files'}
                </p>
                <p className="text-gray-600 mb-4">
                  Drag and drop audio recordings, video demonstrations, or annotated images
                </p>
                <div className="flex justify-center space-x-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Mic className="w-4 h-4" />
                    <span>Audio</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Video className="w-4 h-4" />
                    <span>Video</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Image className="w-4 h-4" />
                    <span>Images</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <Mic className="w-5 h-5 text-blue-600" />
                  <span>Voice Comments</span>
                </h4>
                <button
                  onClick={() => setIsRecording(!isRecording)}
                  className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium ${
                    isRecording
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isRecording ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isRecording ? 'Stop Recording' : 'Start Recording'}</span>
                </button>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <Video className="w-5 h-5 text-purple-600" />
                  <span>Screen Recording</span>
                </h4>
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium">
                  <Video className="w-4 h-4" />
                  <span>Start Recording</span>
                </button>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <Image className="w-5 h-5 text-green-600" />
                  <span>Image Markup</span>
                </h4>
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
                  <Image className="w-4 h-4" />
                  <span>Annotate Image</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'feedback' && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Assessment Feedback</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Overall Comment</label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Provide overall feedback for the student..."
                />
              </div>
              
              <div className="grid gri d-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Strengths</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="What did the student do well?"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Areas for Improvement</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="What can the student improve on?"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssessmentDetail;