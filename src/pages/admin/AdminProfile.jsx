import React from 'react';
import Layout from '../../components/layout/Layout';
import { Mail, Phone, MapPin, Calendar, Briefcase, Book, Users, Award } from 'lucide-react';
import { useAuth } from '../../context/Auth';

function AdminProfile() {
  const { auth } = useAuth();

  const stats = [
    { label: 'Projects', value: '12', icon: Briefcase },
    { label: 'Students', value: '2.4K', icon: Users },
    { label: 'Courses', value: '24', icon: Book },
    { label: 'Awards', value: '6', icon: Award },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
            {/* Cover Image */}
            <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

            {/* Profile Info */}
            <div className="relative px-6 pb-6">
              {/* Avatar */}
              <div className="absolute -top-16">
                <div className="h-32 w-32 rounded-full ring-4 ring-gray-800 bg-gray-700 flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">
                    {auth?.user?.name ? auth.user.name.charAt(0).toUpperCase() : 'A'}
                  </span>
                </div>
              </div>

              {/* Name and Title */}
              <div className="mt-16">
                <h1 className="text-3xl font-bold text-white">
                  {auth?.user?.name || 'Admin Name'}
                </h1>
                <p className="text-gray-400 mt-1">Senior Administrator</p>
              </div>

              {/* Contact Info */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center text-gray-400">
                  <Mail className="h-5 w-5 mr-2" />
                  <span>{auth?.user?.email || 'admin@example.com'}</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Phone className="h-5 w-5 mr-2" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="bg-gray-800 overflow-hidden rounded-lg shadow px-6 py-5"
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Icon className="h-8 w-8 text-indigo-500" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-400 truncate">
                          {stat.label}
                        </dt>
                        <dd className="text-lg font-semibold text-white">
                          {stat.value}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Additional Info */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* About Section */}
            <div className="bg-gray-800 rounded-lg shadow-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">About</h2>
              <p className="text-gray-400">
                Experienced administrator with a proven track record in educational management
                and leadership. Passionate about fostering innovation and excellence in
                education through technology and modern teaching methodologies.
              </p>
              <div className="mt-4 flex items-center text-gray-400">
                <Calendar className="h-5 w-5 mr-2" />
                <span>Joined January 2023</span>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-800 rounded-lg shadow-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center">
                        <Users className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-white">
                        Added new course to the platform
                      </p>
                      <p className="text-xs text-gray-400">2 hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AdminProfile;