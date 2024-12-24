import React from 'react';
import type { Program } from '../../types/channel-details';

interface ProgramScheduleProps {
  programs: Program[];
}

export const ProgramSchedule = ({ programs }: ProgramScheduleProps) => {
  return (
    <div className="bg-[#262626] rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Program Schedule</h2>
      <div className="space-y-4">
        {programs.map((program) => (
          <div
            key={program.id}
            className="flex items-start gap-4 p-4 bg-[#1a1a1a] rounded-lg"
          >
            <div className="flex-shrink-0 w-24">
              <div className="text-sm text-gray-400">
                {new Date(program.startTime).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">{program.title}</h3>
              <p className="text-sm text-gray-400 mt-1">{program.description}</p>
              <div className="flex gap-2 mt-2">
                {program.rating && (
                  <span className="px-2 py-0.5 bg-gray-700 rounded text-xs">
                    {program.rating}
                  </span>
                )}
                {program.closedCaptions && (
                  <span className="px-2 py-0.5 bg-gray-700 rounded text-xs">
                    CC
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};