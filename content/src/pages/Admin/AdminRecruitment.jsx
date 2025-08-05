import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  UserPlus, 
  Users, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase,
  Save,
  X,
  Edit,
  Trash2,
  Eye,
  Plus
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { toast } from 'react-toastify';

const AdminRecruitment = () => {
  const { employees, createEmployee, updateEmployee, deleteEmployee } = useAdmin();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [viewingEmployee, setViewingEmployee] = useState(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      if (editingEmployee) {
        const result = await updateEmployee(editingEmployee.id, data);
        if (result.success) {
          toast.success('Employee updated successfully!');
          setEditingEmployee(null);
        } else {
          toast.error(result.error || 'Failed to update employee');
        }
      } else {
        const result = await createEmployee(data);
        if (result.success) {
          toast.success('Employee created successfully!');
          setShowAddForm(false);
        } else {
          toast.error(result.error || 'Failed to create employee');
        }
      }
      reset();
    } catch (error) {
      toast.error('Operation failed. Please try again.');
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    reset(employee);
    setShowAddForm(true);
  };

  const handleDelete = async (employeeId) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        const result = await deleteEmployee(employeeId);
        if (result.success) {
          toast.success('Employee deleted successfully!');
        } else {
          toast.error(result.error || 'Failed to delete employee');
        }
      } catch (error) {
        toast.error('Delete operation failed');
      }
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingEmployee(null);
    reset();
  };

  const EmployeeForm = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 mb-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-aps-dark">
          {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
        </h2>
        <button
          onClick={handleCancel}
          className="p-2 text-aps-gray-500 hover:text-aps-gray-700 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-aps-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              className="w-full px-4 py-3 border border-aps-gray-300 rounded-lg focus:ring-2 focus:ring-aps-primary focus:border-transparent"
              placeholder="Enter full name"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-aps-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email format'
                }
              })}
              className="w-full px-4 py-3 border border-aps-gray-300 rounded-lg focus:ring-2 focus:ring-aps-primary focus:border-transparent"
              placeholder="Enter email address"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-aps-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              {...register('phone')}
              className="w-full px-4 py-3 border border-aps-gray-300 rounded-lg focus:ring-2 focus:ring-aps-primary focus:border-transparent"
              placeholder="Enter phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-aps-gray-700 mb-2">
              Role *
            </label>
            <select
              {...register('role', { required: 'Role is required' })}
              className="w-full px-4 py-3 border border-aps-gray-300 rounded-lg focus:ring-2 focus:ring-aps-primary focus:border-transparent"
            >
              <option value="">Select role</option>
              <option value="hr">HR Manager</option>
              <option value="recruiter">Recruiter</option>
              <option value="coordinator">Coordinator</option>
              <option value="analyst">Data Analyst</option>
            </select>
            {errors.role && (
              <p className="text-red-600 text-sm mt-1">{errors.role.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-aps-gray-700 mb-2">
              Department
            </label>
            <select
              {...register('department')}
              className="w-full px-4 py-3 border border-aps-gray-300 rounded-lg focus:ring-2 focus:ring-aps-primary focus:border-transparent"
            >
              <option value="">Select department</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Recruitment">Recruitment</option>
              <option value="Operations">Operations</option>
              <option value="Analytics">Analytics</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-aps-gray-700 mb-2">
              Status
            </label>
            <select
              {...register('status')}
              className="w-full px-4 py-3 border border-aps-gray-300 rounded-lg focus:ring-2 focus:ring-aps-primary focus:border-transparent"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-aps-gray-200">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-3 border border-aps-gray-300 rounded-lg text-aps-gray-700 hover:bg-aps-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center space-x-2 px-6 py-3 bg-aps-primary text-white rounded-lg hover:bg-aps-secondary transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>{editingEmployee ? 'Update' : 'Create'} Employee</span>
          </button>
        </div>
      </form>
    </motion.div>
  );

  const EmployeeCard = ({ employee }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg border border-aps-gray-200 p-6 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-aps-primary to-aps-secondary rounded-full flex items-center justify-center">
            <span className="text-white font-medium">
              {employee.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-aps-dark">{employee.name}</h3>
            <p className="text-sm text-aps-gray-600 capitalize">{employee.role}</p>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          employee.status === 'active' 
            ? 'bg-green-100 text-green-800' 
            : employee.status === 'inactive'
            ? 'bg-red-100 text-red-800'
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {employee.status}
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-aps-gray-600">
          <Mail className="w-4 h-4 mr-2" />
          <span>{employee.email}</span>
        </div>
        {employee.phone && (
          <div className="flex items-center text-sm text-aps-gray-600">
            <Phone className="w-4 h-4 mr-2" />
            <span>{employee.phone}</span>
          </div>
        )}
        {employee.department && (
          <div className="flex items-center text-sm text-aps-gray-600">
            <Briefcase className="w-4 h-4 mr-2" />
            <span>{employee.department}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-aps-gray-200">
        <span className="text-xs text-aps-gray-500">
          Joined {new Date(employee.joinedAt || Date.now()).toLocaleDateString()}
        </span>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewingEmployee(employee)}
            className="p-2 text-aps-gray-500 hover:text-aps-primary rounded-lg transition-colors"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleEdit(employee)}
            className="p-2 text-aps-gray-500 hover:text-aps-secondary rounded-lg transition-colors"
            title="Edit Employee"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(employee.id)}
            className="p-2 text-aps-gray-500 hover:text-red-500 rounded-lg transition-colors"
            title="Delete Employee"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-aps-light via-white to-aps-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-aps-primary to-aps-secondary rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <UserPlus className="w-8 h-8" />
                <div>
                  <h1 className="text-3xl font-bold">Employee Recruitment</h1>
                  <p className="text-aps-gray-100 mt-1">
                    Manage your team members and recruitment process
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{employees.length}</div>
                <div className="text-aps-gray-100">Total Employees</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Add Employee Button */}
        {!showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-aps-primary text-white rounded-lg hover:bg-aps-secondary transition-colors shadow-lg"
            >
              <Plus className="w-5 h-5" />
              <span>Add New Employee</span>
            </button>
          </motion.div>
        )}

        {/* Employee Form */}
        {showAddForm && <EmployeeForm />}

        {/* Employee Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map((employee) => (
            <EmployeeCard key={employee.id} employee={employee} />
          ))}
        </div>

        {employees.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <Users className="w-16 h-16 text-aps-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-aps-gray-700 mb-2">
              No employees found
            </h3>
            <p className="text-aps-gray-500 mb-6">
              Start building your team by adding your first employee.
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="btn-primary"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add First Employee
            </button>
          </motion.div>
        )}

        {/* Employee Details Modal */}
        {viewingEmployee && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-aps-dark">Employee Details</h2>
                <button
                  onClick={() => setViewingEmployee(null)}
                  className="p-1 rounded-lg hover:bg-aps-gray-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-aps-primary to-aps-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold text-lg">
                      {viewingEmployee.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-aps-dark">{viewingEmployee.name}</h3>
                  <p className="text-aps-gray-600 capitalize">{viewingEmployee.role}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-aps-gray-700">Email:</span>
                    <span className="text-sm text-aps-gray-600">{viewingEmployee.email}</span>
                  </div>
                  {viewingEmployee.phone && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-aps-gray-700">Phone:</span>
                      <span className="text-sm text-aps-gray-600">{viewingEmployee.phone}</span>
                    </div>
                  )}
                  {viewingEmployee.department && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-aps-gray-700">Department:</span>
                      <span className="text-sm text-aps-gray-600">{viewingEmployee.department}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-aps-gray-700">Status:</span>
                    <span className={`text-sm font-medium capitalize ${
                      viewingEmployee.status === 'active' ? 'text-green-600' : 
                      viewingEmployee.status === 'inactive' ? 'text-red-600' : 'text-yellow-600'
                    }`}>
                      {viewingEmployee.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-aps-gray-700">Joined:</span>
                    <span className="text-sm text-aps-gray-600">
                      {new Date(viewingEmployee.joinedAt || Date.now()).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminRecruitment;