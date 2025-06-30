import { CheckCircle, BookOpen, Calendar } from 'lucide-react';

const RecentActivity = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h2>
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg p-6 border border-gray-100">
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors duration-200">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800">Completed goal: "Read 30 minutes daily"</p>
              <p className="text-sm text-gray-500">2 hours ago</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors duration-200">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800">New journal entry: "Morning reflections"</p>
              <p className="text-sm text-gray-500">Yesterday at 8:30 AM</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors duration-200">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800">Scheduled: "Weekly planning session"</p>
              <p className="text-sm text-gray-500">Tomorrow at 10:00 AM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
