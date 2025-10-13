import React from "react";
import { Link } from "react-router-dom";

interface StatCard {
  id: number;
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  path: string;
}

interface StatSection {
  id: number;
  sectionTitle: string;
  stats: StatCard[];
}

interface StatsCardsProps {
  sections: StatSection[];
}

const StatsCards: React.FC<StatsCardsProps> = ({ sections }) => {
  return (
    <div className="space-y-10">
      {sections.map((section) => (
        <div key={section.id}>
          <h2 className="text-xl font-bold text-gray-700 mb-4">{section.sectionTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {section.stats.map((stat) => (
              <Link
                to={stat.path}
                key={stat.id}
                className="bg-white rounded-xl shadow p-6 flex items-center gap-4 hover:shadow-lg transition hover:bg-gray-50"
              >
                <div className={`text-4xl ${stat.color}`}>{stat.icon}</div>
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;