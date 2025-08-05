import React, { useState } from 'react';
import { Search, Book, MessageCircle, Phone, Mail, ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';

const HelpCenter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      id: 1,
      question: 'How do I upload a resume?',
      answer: 'Navigate to the HR Dashboard and click on "Upload Resume". You can drag and drop files or click to browse. Supported formats are PDF and DOCX.',
      category: 'HR'
    },
    {
      id: 2,
      question: 'How does the resume parsing work?',
      answer: 'Our AI-powered system automatically extracts key information like name, email, phone, experience, and skills from uploaded resumes. It then suggests the most appropriate sector and designation.',
      category: 'HR'
    },
    {
      id: 3,
      question: 'Can I manually override the AI suggestions?',
      answer: 'Yes, after the AI processes a resume, you can manually select a different sector or designation from the dropdown menus before saving.',
      category: 'HR'
    },
    {
      id: 4,
      question: 'How do I apply for a job?',
      answer: 'Browse available positions on the candidate portal, click on a job that interests you, and follow the application process. You\'ll need to upload your resume and fill out the required information.',
      category: 'Candidate'
    },
    {
      id: 5,
      question: 'What permissions can I set for HR users?',
      answer: 'As an admin, you can control HR access to features like CRUD operations, folder management, report generation, and candidate data viewing through the permission matrix.',
      category: 'Admin'
    },
    {
      id: 6,
      question: 'How do I generate reports?',
      answer: 'Go to the Reports section in your dashboard. You can generate daily, weekly, or monthly reports with various filters and export them as CSV or PDF.',
      category: 'HR'
    }
  ];

  const quickLinks = [
    {
      title: 'Getting Started Guide',
      description: 'Learn the basics of using the platform',
      icon: Book,
      href: '#'
    },
    {
      title: 'Video Tutorials',
      description: 'Watch step-by-step video guides',
      icon: ExternalLink,
      href: '#'
    },
    {
      title: 'API Documentation',
      description: 'Technical documentation for developers',
      icon: Book,
      href: '#'
    }
  ];

  const contactOptions = [
    {
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      icon: MessageCircle,
      action: 'Start Chat',
      color: 'bg-green-500'
    },
    {
      title: 'Phone Support',
      description: 'Call us at +91 1234567890',
      icon: Phone,
      action: 'Call Now',
      color: 'bg-blue-500'
    },
    {
      title: 'Email Support',
      description: 'Send us an email at support@akshyapatra.com',
      icon: Mail,
      action: 'Send Email',
      color: 'bg-purple-500'
    }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-aps-dark mb-4">Help Center</h1>
          <p className="text-xl text-aps-gray-600 mb-8">
            Find answers to your questions and get the help you need
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-aps-gray-400 w-6 h-6" />
            <input
              type="text"
              placeholder="Search for help articles, FAQs, or guides..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-aps-primary focus:border-transparent shadow-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Links */}
            <div className="bg-white rounded-xl shadow-sm border border-aps-gray-200 p-6">
              <h2 className="text-2xl font-bold text-aps-dark mb-6">Quick Links</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {quickLinks.map((link, index) => {
                  const IconComponent = link.icon;
                  return (
                    <a
                      key={index}
                      href={link.href}
                      className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                    >
                      <IconComponent className="w-8 h-8 text-aps-primary mb-3 group-hover:scale-110 transition-transform" />
                      <h3 className="font-semibold text-aps-dark mb-2">{link.title}</h3>
                      <p className="text-sm text-aps-gray-600">{link.description}</p>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-white rounded-xl shadow-sm border border-aps-gray-200 p-6">
              <h2 className="text-2xl font-bold text-aps-dark mb-6">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-4">
                {filteredFaqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                      className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                    >
                      <div>
                        <h3 className="font-semibold text-aps-dark">{faq.question}</h3>
                        <span className="text-sm text-aps-primary font-medium">{faq.category}</span>
                      </div>
                      {expandedFaq === faq.id ? (
                        <ChevronDown className="w-5 h-5 text-aps-gray-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-aps-gray-400" />
                      )}
                    </button>
                    
                    {expandedFaq === faq.id && (
                      <div className="px-6 py-4 bg-white border-t border-gray-200">
                        <p className="text-aps-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {filteredFaqs.length === 0 && (
                <div className="text-center py-8">
                  <Search className="w-12 h-12 text-aps-gray-300 mx-auto mb-4" />
                  <p className="text-aps-gray-500">No FAQs found matching your search.</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Support */}
            <div className="bg-white rounded-xl shadow-sm border border-aps-gray-200 p-6">
              <h3 className="text-xl font-bold text-aps-dark mb-6">Contact Support</h3>
              
              <div className="space-y-4">
                {contactOptions.map((option, index) => {
                  const IconComponent = option.icon;
                  return (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className={`w-10 h-10 ${option.color} rounded-lg flex items-center justify-center`}>
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-aps-dark">{option.title}</h4>
                        </div>
                      </div>
                      <p className="text-sm text-aps-gray-600 mb-3">{option.description}</p>
                      <button className="w-full bg-aps-primary text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-aps-primary-dark transition-colors">
                        {option.action}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-xl shadow-sm border border-aps-gray-200 p-6">
              <h3 className="text-xl font-bold text-aps-dark mb-4">System Status</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-aps-gray-600">API Status</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600 font-medium">Operational</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-aps-gray-600">Resume Parser</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600 font-medium">Operational</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-aps-gray-600">Database</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600 font-medium">Operational</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;