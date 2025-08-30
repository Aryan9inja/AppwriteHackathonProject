import React from 'react';
import { FileText, Eye, Globe, Award, TrendingUp } from 'lucide-react';

interface StatsGridProps {
  isAnimated: boolean;
}

const StatsGrid: React.FC<StatsGridProps> = ({ isAnimated }) => {
  const stats = [
    { label: 'Total Portfolios', value: '12', icon: FileText, change: '+2 this month', color: 'text-primary' },
    { label: 'Total Views', value: '15.2K', icon: Eye, change: '+18% from last month', color: 'text-success' },
    { label: 'Active Portfolios', value: '8', icon: Globe, change: '4 published', color: 'text-info' },
    { label: 'Profile Score', value: '94%', icon: Award, change: '+5% this week', color: 'text-warning' },
  ];

  return (
    <div className={`grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8 transform transition-all duration-700 delay-100 ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
      {stats.map((stat, index) => (
        <div 
          key={stat.label}
          className={`bg-card border border-border rounded-lg sm:rounded-xl p-3 sm:p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer animate-fade-in`}
          style={{ animationDelay: `${index * 150}ms` }}
        >
          <div className="flex items-center justify-between mb-2 sm:mb-4">
            <div className={`p-2 sm:p-3 rounded-lg bg-gradient-to-r ${
              stat.color === 'text-primary' ? 'from-primary/20 to-primary/10' :
              stat.color === 'text-success' ? 'from-success/20 to-success/10' :
              stat.color === 'text-info' ? 'from-info/20 to-info/10' :
              'from-warning/20 to-warning/10'
            }`}>
              <stat.icon className={`w-4 h-4 sm:w-6 sm:h-6 ${stat.color}`} />
            </div>
            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-success" />
          </div>
          <div className="space-y-1">
            <p className="text-lg sm:text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs sm:text-sm text-muted font-medium leading-tight">{stat.label}</p>
            <p className="text-xs text-success hidden sm:block">{stat.change}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;