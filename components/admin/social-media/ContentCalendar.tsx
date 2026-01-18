'use client';

import { useMemo, useState } from 'react';
import type { ScheduledPost } from '@/lib/social-publisher';

interface ContentCalendarProps {
  posts: ScheduledPost[];
  loading: boolean;
}

export function ContentCalendar({ posts, loading }: ContentCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Get calendar data
  const calendarData = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // First day of month
    const firstDay = new Date(year, month, 1);
    const startingDay = firstDay.getDay();

    // Days in month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Create calendar grid
    const weeks: (number | null)[][] = [];
    let week: (number | null)[] = [];

    // Add empty cells before first day
    for (let i = 0; i < startingDay; i++) {
      week.push(null);
    }

    // Add days
    for (let day = 1; day <= daysInMonth; day++) {
      week.push(day);
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    }

    // Fill remaining cells
    if (week.length > 0) {
      while (week.length < 7) {
        week.push(null);
      }
      weeks.push(week);
    }

    return { weeks, year, month };
  }, [currentDate]);

  // Get posts for a specific day
  const getPostsForDay = (day: number) => {
    return posts.filter((post) => {
      if (!post.scheduled_for) return false;
      const postDate = new Date(post.scheduled_for);
      return (
        postDate.getFullYear() === calendarData.year &&
        postDate.getMonth() === calendarData.month &&
        postDate.getDate() === day
      );
    });
  };

  // Navigation
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      calendarData.month === today.getMonth() &&
      calendarData.year === today.getFullYear()
    );
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-warm-gray-100 p-6 animate-pulse">
        <div className="h-8 bg-warm-gray-200 rounded w-48 mb-6" />
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 35 }).map((_, i) => (
            <div key={i} className="aspect-square bg-warm-gray-100 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-warm-gray-100 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-warm-gray-100">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-warm-gray-800">
            {monthNames[calendarData.month]} {calendarData.year}
          </h2>
          <button
            onClick={goToToday}
            className="px-3 py-1 text-sm font-medium text-coral hover:bg-coral/10 rounded-lg transition-colors"
          >
            Hoy
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={prevMonth}
            className="p-2 hover:bg-warm-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-warm-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-warm-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-warm-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-4">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {dayNames.map((day) => (
            <div key={day} className="text-center text-sm font-medium text-warm-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Weeks */}
        <div className="space-y-2">
          {calendarData.weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7 gap-2">
              {week.map((day, dayIndex) => {
                if (day === null) {
                  return <div key={dayIndex} className="aspect-square" />;
                }

                const dayPosts = getPostsForDay(day);
                const hasFB = dayPosts.some((p) => p.platforms.includes('facebook'));
                const hasIG = dayPosts.some((p) => p.platforms.includes('instagram'));

                return (
                  <div
                    key={dayIndex}
                    className={`aspect-square p-1 rounded-lg border transition-colors cursor-pointer hover:border-coral ${
                      isToday(day)
                        ? 'bg-coral/10 border-coral'
                        : dayPosts.length > 0
                        ? 'bg-warm-gray-50 border-warm-gray-200'
                        : 'border-transparent hover:bg-warm-gray-50'
                    }`}
                  >
                    <div className="h-full flex flex-col">
                      <span
                        className={`text-sm font-medium ${
                          isToday(day) ? 'text-coral' : 'text-warm-gray-700'
                        }`}
                      >
                        {day}
                      </span>

                      {/* Post Indicators */}
                      {dayPosts.length > 0 && (
                        <div className="flex-1 flex flex-col justify-end">
                          <div className="flex gap-0.5 flex-wrap">
                            {hasFB && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full" title="Facebook" />
                            )}
                            {hasIG && (
                              <div className="w-2 h-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full" title="Instagram" />
                            )}
                          </div>
                          {dayPosts.length > 1 && (
                            <span className="text-[10px] text-warm-gray-500 mt-0.5">
                              +{dayPosts.length - 1}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 px-4 py-3 border-t border-warm-gray-100 bg-warm-gray-50">
        <div className="flex items-center gap-1.5 text-xs text-warm-gray-500">
          <div className="w-2 h-2 bg-blue-500 rounded-full" />
          Facebook
        </div>
        <div className="flex items-center gap-1.5 text-xs text-warm-gray-500">
          <div className="w-2 h-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full" />
          Instagram
        </div>
        <div className="ml-auto text-xs text-warm-gray-400">
          {posts.length} post{posts.length !== 1 ? 's' : ''} programados
        </div>
      </div>
    </div>
  );
}
