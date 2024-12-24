import React from 'react';
import { Info, Tv, Globe, Devices, PlaySquare } from 'lucide-react';
import type { ChannelDetails } from '../../types/channel-details';

interface ChannelInfoProps {
  details: ChannelDetails;
}

export const ChannelInfo = ({ details }: ChannelInfoProps) => {
  return (
    <div className="bg-[#262626] rounded-lg p-6 space-y-6">
      {/* Channel Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold">{details.name}</h2>
          <p className="text-gray-400 mt-2">{details.category}</p>
        </div>
        <div className="flex gap-2">
          {details.closedCaptions && (
            <span className="px-2 py-1 bg-gray-700 rounded text-sm">CC</span>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="flex items-start gap-4">
        <Info className="w-5 h-5 mt-1 flex-shrink-0" />
        <p className="text-gray-300">{details.description}</p>
      </div>

      {/* Video Quality */}
      <div className="flex items-start gap-4">
        <Tv className="w-5 h-5 mt-1 flex-shrink-0" />
        <div>
          <h3 className="font-semibold mb-2">Available Qualities</h3>
          <div className="flex gap-2">
            {details.videoQualities.map(quality => (
              <span
                key={quality.label}
                className={`px-2 py-1 rounded text-sm ${
                  quality.available ? 'bg-gray-700' : 'bg-gray-800 text-gray-500'
                }`}
              >
                {quality.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Regional Availability */}
      <div className="flex items-start gap-4">
        <Globe className="w-5 h-5 mt-1 flex-shrink-0" />
        <div>
          <h3 className="font-semibold mb-2">Regional Availability</h3>
          <p className="text-gray-300">
            {details.regionalRestrictions.length > 0
              ? `Available in: ${details.regionalRestrictions.join(', ')}`
              : 'Available worldwide'}
          </p>
        </div>
      </div>

      {/* Device Compatibility */}
      <div className="flex items-start gap-4">
        <Devices className="w-5 h-5 mt-1 flex-shrink-0" />
        <div>
          <h3 className="font-semibold mb-2">Supported Devices</h3>
          <div className="flex flex-wrap gap-2">
            {details.deviceCompatibility.map(device => (
              <span key={device} className="px-2 py-1 bg-gray-700 rounded text-sm">
                {device}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Features */}
      {details.interactiveFeatures.length > 0 && (
        <div className="flex items-start gap-4">
          <PlaySquare className="w-5 h-5 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold mb-2">Interactive Features</h3>
            <div className="flex flex-wrap gap-2">
              {details.interactiveFeatures.map(feature => (
                <span key={feature} className="px-2 py-1 bg-gray-700 rounded text-sm">
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};