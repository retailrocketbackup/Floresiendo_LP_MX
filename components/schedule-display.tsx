"use client";

import { useState } from "react";
import {
  categoryConfig,
  type DaySchedule,
  type ActivityCategory,
} from "@/lib/encuentros-data";

interface ScheduleDisplayProps {
  schedule: DaySchedule[];
  retreatTitle?: string;
  retreatYear?: number;
}

// Helper to generate ICS calendar file content
function generateICSContent(
  schedule: DaySchedule[],
  retreatTitle: string,
  year: number
): string {
  const monthMap: Record<string, string> = {
    Enero: "01", Febrero: "02", Marzo: "03", Abril: "04",
    Mayo: "05", Junio: "06", Julio: "07", Agosto: "08",
    Septiembre: "09", Octubre: "10", Noviembre: "11", Diciembre: "12",
  };

  const events: string[] = [];

  schedule.forEach((day) => {
    // Parse date like "19 de Febrero"
    const dateMatch = day.date.match(/(\d+)\s+de\s+(\w+)/);
    if (!dateMatch) return;

    const dayNum = dateMatch[1].padStart(2, "0");
    const monthName = dateMatch[2];
    const month = monthMap[monthName] || "01";
    const dateStr = `${year}${month}${dayNum}`;

    // Create one event per day with all activities
    const activities = day.items
      .map((item) => `${item.time} - ${item.activity}${item.description ? `: ${item.description}` : ""}`)
      .join("\\n");

    const startTime = day.items[0]?.time.replace(":", "") + "00";
    const endTime = "235900"; // End of day

    events.push(`BEGIN:VEVENT
DTSTART:${dateStr}T${startTime}
DTEND:${dateStr}T${endTime}
SUMMARY:${retreatTitle} - ${day.day}: ${day.theme}
DESCRIPTION:${activities}
LOCATION:Santuario FloreSiendo, Morelos, México
STATUS:CONFIRMED
END:VEVENT`);
  });

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//FloreSiendo//Encuentro//ES
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:${retreatTitle}
${events.join("\n")}
END:VCALENDAR`;
}

// Helper to download ICS file
function downloadICS(content: string, filename: string) {
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Helper to generate Google Calendar URL
function generateGoogleCalendarURL(
  schedule: DaySchedule[],
  retreatTitle: string,
  year: number
): string {
  const monthMap: Record<string, string> = {
    Enero: "01", Febrero: "02", Marzo: "03", Abril: "04",
    Mayo: "05", Junio: "06", Julio: "07", Agosto: "08",
    Septiembre: "09", Octubre: "10", Noviembre: "11", Diciembre: "12",
  };

  // Get first and last day
  const firstDay = schedule[0];
  const lastDay = schedule[schedule.length - 1];

  const parseDate = (dateStr: string) => {
    const match = dateStr.match(/(\d+)\s+de\s+(\w+)/);
    if (!match) return "";
    const day = match[1].padStart(2, "0");
    const month = monthMap[match[2]] || "01";
    return `${year}${month}${day}`;
  };

  const startDate = parseDate(firstDay.date);
  const endDate = parseDate(lastDay.date);
  const startTime = firstDay.items[0]?.time.replace(":", "") || "1700";
  const endTime = lastDay.items[lastDay.items.length - 1]?.time.replace(":", "") || "1500";

  const details = schedule
    .map((day) => `${day.day} - ${day.theme}: ${day.items.length} actividades`)
    .join("%0A");

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(retreatTitle)}&dates=${startDate}T${startTime}00/${endDate}T${endTime}00&details=${details}&location=${encodeURIComponent("Santuario FloreSiendo, Morelos, México")}`;
}

export function ScheduleDisplay({
  schedule,
  retreatTitle = "Encuentro FloreSiendo",
  retreatYear = 2026
}: ScheduleDisplayProps) {
  // Start with all days collapsed
  const [expandedDays, setExpandedDays] = useState<number[]>([]);
  const [showCalendarMenu, setShowCalendarMenu] = useState(false);

  const handleAddToCalendar = (type: "google" | "ics") => {
    if (type === "google") {
      const url = generateGoogleCalendarURL(schedule, retreatTitle, retreatYear);
      window.open(url, "_blank");
    } else {
      const icsContent = generateICSContent(schedule, retreatTitle, retreatYear);
      downloadICS(icsContent, `${retreatTitle.replace(/\s+/g, "-").toLowerCase()}.ics`);
    }
    setShowCalendarMenu(false);
  };

  const toggleDay = (index: number) => {
    setExpandedDays((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const scrollToDay = (index: number) => {
    const element = document.getElementById(`day-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      // Expand if collapsed
      if (!expandedDays.includes(index)) {
        setExpandedDays((prev) => [...prev, index]);
      }
    }
  };

  // Calculate day summary
  const getDaySummary = (day: DaySchedule) => {
    const items = day.items;
    const startTime = items[0]?.time || "";
    const endTime = items[items.length - 1]?.time || "";
    const ceremonyCount = items.filter((i) => i.category === "ceremony").length;
    return { count: items.length, startTime, endTime, ceremonyCount };
  };

  return (
    <div className="space-y-6">
      {/* Journey Progress Visual with Calendar Button */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1" /> {/* Spacer */}

          {/* Add to Calendar Button */}
          <div className="relative">
            <button
              onClick={() => setShowCalendarMenu(!showCalendarMenu)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#8b2a4a] bg-white border border-[#8b2a4a]/20 rounded-full hover:bg-[#8b2a4a]/5 hover:border-[#8b2a4a]/40 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="hidden sm:inline">Agregar al Calendario</span>
              <span className="sm:hidden">Calendario</span>
              <svg className={`w-4 h-4 transition-transform ${showCalendarMenu ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {showCalendarMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-30">
                <button
                  onClick={() => handleAddToCalendar("google")}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google Calendar
                </button>
                <button
                  onClick={() => handleAddToCalendar("ics")}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Descargar .ics (Apple/Outlook)
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center">
          {schedule.map((day, index) => {
            const summary = getDaySummary(day);
            return (
              <div key={index} className="flex items-center">
                {/* Day Dot */}
                <button
                  onClick={() => scrollToDay(index)}
                  className="group flex flex-col items-center"
                >
                  <div
                    className={`w-5 h-5 rounded-full transition-all duration-300 flex items-center justify-center ${
                      expandedDays.includes(index)
                        ? "bg-[#8b2a4a] ring-4 ring-[#8b2a4a]/20 scale-110"
                        : "bg-[#d4a853]/40 hover:bg-[#d4a853] hover:scale-110"
                    }`}
                  >
                    {/* Activity count inside dot */}
                    <span className={`text-[8px] font-bold ${
                      expandedDays.includes(index) ? "text-white" : "text-[#8b2a4a]/60"
                    }`}>
                      {summary.count}
                    </span>
                  </div>
                  <span
                    className={`mt-2 text-xs font-medium transition-colors ${
                      expandedDays.includes(index)
                        ? "text-[#8b2a4a]"
                        : "text-gray-400 group-hover:text-[#8b2a4a]"
                    }`}
                  >
                    {day.day}
                  </span>
                  <span
                    className={`text-[10px] transition-colors hidden sm:block ${
                      expandedDays.includes(index)
                        ? "text-[#8b2a4a]/70"
                        : "text-gray-300 group-hover:text-[#8b2a4a]/50"
                    }`}
                  >
                    {day.theme}
                  </span>
                  {/* Time range below theme */}
                  <span
                    className={`text-[9px] transition-colors hidden md:block mt-0.5 ${
                      expandedDays.includes(index)
                        ? "text-[#d4a853]"
                        : "text-gray-300 group-hover:text-[#d4a853]/70"
                    }`}
                  >
                    {summary.startTime}-{summary.endTime}
                  </span>
                </button>

                {/* Connector Line */}
                {index < schedule.length - 1 && (
                  <div
                    className={`w-12 sm:w-20 md:w-28 h-0.5 mx-1 transition-colors ${
                      expandedDays.includes(index) && expandedDays.includes(index + 1)
                        ? "bg-[#8b2a4a]"
                        : expandedDays.includes(index) || expandedDays.includes(index + 1)
                          ? "bg-gradient-to-r from-[#8b2a4a] to-[#d4a853]/40"
                          : "bg-[#d4a853]/30"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Sticky Day Navigation */}
      <div className="sticky top-0 z-20 bg-[#fdf8f4]/95 backdrop-blur-sm py-3 -mx-4 px-4 border-b border-[#8b2a4a]/10">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {schedule.map((day, index) => {
            const isExpanded = expandedDays.includes(index);
            return (
              <button
                key={index}
                onClick={() => scrollToDay(index)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isExpanded
                    ? "bg-[#8b2a4a] text-white shadow-md"
                    : "bg-white text-[#8b2a4a] border border-[#8b2a4a]/20 hover:border-[#8b2a4a]/40"
                }`}
              >
                <span className="block">{day.day}</span>
                <span className="block text-xs opacity-80">{day.theme}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Day Cards */}
      <div className="space-y-4">
        {schedule.map((day, dayIndex) => {
          const isExpanded = expandedDays.includes(dayIndex);
          const summary = getDaySummary(day);

          return (
            <div
              key={dayIndex}
              id={`day-${dayIndex}`}
              className="bg-white rounded-2xl shadow-lg overflow-hidden scroll-mt-24"
            >
              {/* Day Header - Clickable */}
              <button
                onClick={() => toggleDay(dayIndex)}
                className="w-full text-left bg-gradient-to-r from-[#8b2a4a] to-[#722240] text-white p-5 hover:from-[#9b3a5a] hover:to-[#823250] transition-colors"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-xl font-bold">
                        {day.day} · {day.weekday} {day.date}
                      </h3>
                      {/* Expand/Collapse Icon */}
                      <svg
                        className={`w-5 h-5 transition-transform duration-200 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                    <p className="text-[#d4a853] font-medium mt-1">{day.theme}</p>

                    {/* Collapsed Summary */}
                    {!isExpanded && (
                      <div className="flex items-center gap-3 mt-2 text-white/70 text-sm">
                        <span>{summary.count} actividades</span>
                        <span>·</span>
                        <span>{summary.startTime} - {summary.endTime}</span>
                        {summary.ceremonyCount > 0 && (
                          <>
                            <span>·</span>
                            <span className="flex items-center gap-1">
                              <span>🌙</span>
                              {summary.ceremonyCount} ceremonia{summary.ceremonyCount > 1 ? "s" : ""}
                            </span>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Tagline on right */}
                  {day.tagline && isExpanded && (
                    <p className="text-white/70 italic text-sm hidden md:block">
                      &ldquo;{day.tagline}&rdquo;
                    </p>
                  )}
                </div>
              </button>

              {/* Expandable Content */}
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-6">
                  {/* Tagline for mobile when expanded */}
                  {day.tagline && (
                    <p className="text-[#8b2a4a]/60 italic text-sm mb-4 md:hidden">
                      &ldquo;{day.tagline}&rdquo;
                    </p>
                  )}

                  <div className="space-y-3">
                    {day.items.map((item, itemIndex) => {
                      const category = item.category as ActivityCategory | undefined;
                      const config = category ? categoryConfig[category] : null;
                      const isCeremony = category === "ceremony";
                      const isOptional = item.isOptional;

                      return (
                        <div
                          key={itemIndex}
                          className={`flex gap-4 p-3 rounded-lg transition-colors ${
                            isCeremony
                              ? "bg-purple-50 border border-purple-200"
                              : isOptional
                                ? "bg-amber-50/50 border border-amber-100"
                                : "hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex-shrink-0 w-14 text-[#d4a853] font-semibold text-sm">
                            {item.time}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              {/* Category Icon */}
                              {config && (
                                <span className="text-base" aria-hidden="true">
                                  {config.icon === "moon" && "🌙"}
                                  {config.icon === "star" && "⭐"}
                                  {config.icon === "heart" && "💬"}
                                  {config.icon === "sparkles" && "✨"}
                                  {config.icon === "utensils" && "🍽️"}
                                  {config.icon === "flame" && "🔥"}
                                  {config.icon === "clipboard" && "📋"}
                                </span>
                              )}
                              <p
                                className={`font-medium ${
                                  isCeremony ? "text-purple-900" : "text-gray-800"
                                }`}
                              >
                                {item.activity}
                              </p>
                              {/* Optional Badge */}
                              {isOptional && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                  Opcional
                                </span>
                              )}
                            </div>
                            {item.description && (
                              <p
                                className={`text-sm mt-1 ${
                                  isCeremony ? "text-purple-700" : "text-gray-500"
                                }`}
                              >
                                {item.description}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
