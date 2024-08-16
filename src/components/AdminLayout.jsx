import React from 'react';
import { Outlet } from 'react-router-dom';
import { AdminNav } from './AdminNav';

export const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col shadow-lg">
        <div className="flex items-center justify-center h-16 border-b border-gray-700">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
        </div>
        <AdminNav />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-[var(--primary-color)] shadow-md px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-white">Admin Panel</h2>
            
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-y-auto bg-[var(--primary-color)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};