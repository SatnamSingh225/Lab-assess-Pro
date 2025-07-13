import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Plus, Trash2, GripVertical, Save, ArrowLeft } from 'lucide-react';

interface Criterion {
  id: string;
  name: string;
  description: string;
  weight: number;
  levels: Level[];
}

interface Level {
  id: string;
  name: string;
  description: string;
  points: number;
}

const RubricBuilder: React.FC = () => {
  const [rubricName, setRubricName] = useState('');
  const [rubricDescription, setRubricDescription] = useState('');
  const [labType, setLabType] = useState('ML');
  const [criteria, setCriteria] = useState<Criterion[]>([
    {
      id: '1',
      name: 'Code Efficiency',
      description: 'Quality and efficiency of the implemented code',
      weight: 40,
      levels: [
        { id: '1-1', name: 'Excellent', description: 'Highly optimized, clean code', points: 90 },
        { id: '1-2', name: 'Good', description: 'Well-written, mostly efficient', points: 75 },
        { id: '1-3', name: 'Satisfactory', description: 'Functional but could be improved', points: 60 },
        { id: '1-4', name: 'Needs Improvement', description: 'Inefficient or poorly structured', points: 40 }
      ]
    }
  ]);

  const addCriterion = () => {
    const newCriterion: Criterion = {
      id: Date.now().toString(),
      name: 'New Criterion',
      description: '',
      weight: 20,
      levels: [
        { id: `${Date.now()}-1`, name: 'Excellent', description: '', points: 90 },
        { id: `${Date.now()}-2`, name: 'Good', description: '', points: 75 },
        { id: `${Date.now()}-3`, name: 'Satisfactory', description: '', points: 60 },
        { id: `${Date.now()}-4`, name: 'Needs Improvement', description: '', points: 40 }
      ]
    };
    setCriteria([...criteria, newCriterion]);
  };

  const updateCriterion = (id: string, field: keyof Criterion, value: any) => {
    setCriteria(criteria.map(c => 
      c.id === id ? { ...c, [field]: value } : c
    ));
  };

  const deleteCriterion = (id: string) => {
    setCriteria(criteria.filter(c => c.id !== id));
  };

  const updateLevel = (criterionId: string, levelId: string, field: keyof Level, value: any) => {
    setCriteria(criteria.map(c => 
      c.id === criterionId 
        ? {
            ...c,
            levels: c.levels.map(l => 
              l.id === levelId ? { ...l, [field]: value } : l
            )
          }
        : c
    ));
  };

  const addLevel = (criterionId: string) => {
    const newLevel: Level = {
      id: `${criterionId}-${Date.now()}`,
      name: 'New Level',
      description: '',
      points: 50
    };
    
    setCriteria(criteria.map(c => 
      c.id === criterionId 
        ? { ...c, levels: [...c.levels, newLevel] }
        : c
    ));
  };

  const deleteLevel = (criterionId: string, levelId: string) => {
    setCriteria(criteria.map(c => 
      c.id === criterionId 
        ? { ...c, levels: c.levels.filter(l => l.id !== levelId) }
        : c
    ));
  };

  const totalWeight = criteria.reduce((sum, c) => sum + c.weight, 0);

  const CriterionCard: React.FC<{ criterion: Criterion; index: number }> = ({ criterion, index }) => {
    const [{ isDragging }, drag] = useDrag({
      type: 'criterion',
      item: { id: criterion.id, index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    const [, drop] = useDrop({
      accept: 'criterion',
      hover: (item: { id: string; index: number }) => {
        if (item.index !== index) {
          const draggedCriterion = criteria[item.index];
          const newCriteria = [...criteria];
          newCriteria.splice(item.index, 1);
          newCriteria.splice(index, 0, draggedCriterion);
          setCriteria(newCriteria);
          item.index = index;
        }
      },
    });

    return (
      <div
        ref={(node) => drag(drop(node))}
        className={`bg-white rounded-xl p-6 shadow-sm border border-gray-200 ${
          isDragging ? 'opacity-50' : ''
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
            <input
              type="text"
              value={criterion.name}
              onChange={(e) => updateCriterion(criterion.id, 'name', e.target.value)}
              className="text-lg font-semibold text-gray-900 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded px-2"
            />
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Weight:</label>
              <input
                type="number"
                value={criterion.weight}
                onChange={(e) => updateCriterion(criterion.id, 'weight', parseInt(e.target.value))}
                className="w-16 px-2 py-1 border border-gray-300 rounded text-center focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                min="0"
                max="100"
              />
              <span className="text-sm text-gray-500">%</span>
            </div>
            <button
              onClick={() => deleteCriterion(criterion.id)}
              className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mb-4">
          <textarea
            value={criterion.description}
            onChange={(e) => updateCriterion(criterion.id, 'description', e.target.value)}
            placeholder="Describe what this criterion evaluates..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            rows={2}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-700">Performance Levels</h4>
            <button
              onClick={() => addLevel(criterion.id)}
              className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
            >
              + Add Level
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {criterion.levels.map((level) => (
              <div key={level.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <input
                    type="text"
                    value={level.name}
                    onChange={(e) => updateLevel(criterion.id, level.id, 'name', e.target.value)}
                    className="font-medium text-gray-900 bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded px-1"
                  />
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={level.points}
                      onChange={(e) => updateLevel(criterion.id, level.id, 'points', parseInt(e.target.value))}
                      className="w-12 px-1 py-1 border border-gray-300 rounded text-center text-sm focus:ring-1 focus:ring-indigo-500 focus:border-transparent"
                      min="0"
                      max="100"
                    />
                    <button
                      onClick={() => deleteLevel(criterion.id, level.id)}
                      className="text-red-400 hover:text-red-600"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <textarea
                  value={level.description}
                  onChange={(e) => updateLevel(criterion.id, level.id, 'description', e.target.value)}
                  placeholder="Describe this performance level..."
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-indigo-500 focus:border-transparent"
                  rows={2}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Rubric Builder</h1>
            <p className="text-gray-600">Create custom assessment criteria for your lab</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
            Preview
          </button>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>Save Rubric</span>
          </button>
        </div>
      </div>

      {/* Rubric Info */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Rubric Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rubric Name</label>
            <input
              type="text"
              value={rubricName}
              onChange={(e) => setRubricName(e.target.value)}
              placeholder="Enter rubric name..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Lab Type</label>
            <select
              value={labType}
              onChange={(e) => setLabType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="ML">ML Lab</option>
              <option value="AI">AI Lab</option>
              <option value="FSD">FSD Lab</option>
            </select>
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={rubricDescription}
            onChange={(e) => setRubricDescription(e.target.value)}
            placeholder="Describe the purpose and scope of this rubric..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            rows={3}
          />
        </div>
      </div>

      {/* Weight Summary */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Weight Distribution</h3>
          <div className={`text-lg font-bold ${totalWeight === 100 ? 'text-green-600' : 'text-red-600'}`}>
            {totalWeight}% / 100%
          </div>
        </div>
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all ${
                totalWeight === 100 ? 'bg-green-500' : totalWeight > 100 ? 'bg-red-500' : 'bg-yellow-500'
              }`}
              style={{ width: `${Math.min(totalWeight, 100)}%` }}
            />
          </div>
          {totalWeight !== 100 && (
            <p className="text-sm text-gray-600 mt-2">
              {totalWeight > 100 
                ? 'Total weight exceeds 100%. Please adjust criterion weights.'
                : 'Total weight is less than 100%. Please adjust criterion weights.'}
            </p>
          )}
        </div>
      </div>

      {/* Criteria */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Assessment Criteria</h3>
          <button
            onClick={addCriterion}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Criterion</span>
          </button>
        </div>

        {criteria.map((criterion, index) => (
          <CriterionCard key={criterion.id} criterion={criterion} index={index} />
        ))}

        {criteria.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No criteria added yet</h3>
            <p className="text-gray-500 mb-6">Start building your rubric by adding assessment criteria.</p>
            <button
              onClick={addCriterion}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 inline-flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Your First Criterion</span>
            </button>
          </div>
        )}
      </div>

      {/* Quick Templates */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-300 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 text-left">
            <h4 className="font-medium text-gray-900 mb-2">Code Quality Template</h4>
            <p className="text-sm text-gray-600">Standard criteria for code-based assessments</p>
          </button>
          <button className="p-4 border border-gray-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 text-left">
            <h4 className="font-medium text-gray-900 mb-2">Project Template</h4>
            <p className="text-sm text-gray-600">Comprehensive project evaluation criteria</p>
          </button>
          <button className="p-4 border border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 text-left">
            <h4 className="font-medium text-gray-900 mb-2">Viva Template</h4>
            <p className="text-sm text-gray-600">Oral examination and presentation criteria</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RubricBuilder;