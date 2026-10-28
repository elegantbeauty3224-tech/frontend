import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { AnnouncementConfig } from '../types';

interface AnnouncementBarProps {
  announcement: AnnouncementConfig;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ announcement }) => {
  if (!announcement.enabled) return null;

  return (
    <div
      style={{
        backgroundColor: announcement.themeColor || '#12372A',
        color: announcement.textColor || '#FFFFFF',
      }}
      className="py-2.5 px-4 shadow-sm border-b border-black/15 transition-colors"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          {announcement.badgeText && (
            <span
              style={{
                backgroundColor: announcement.badgeBgColor || '#FBFADA',
                color: announcement.badgeTextColor || '#12372A',
              }}
              className="badge font-extrabold text-[10px] px-2.5 py-0.5 border-0 animate-pulse shadow-xs"
            >
              {announcement.badgeText}
            </span>
          )}
          <span className="font-semibold opacity-95">
            {announcement.messageText}
          </span>
        </div>

        <div className="flex items-center gap-4">
          {announcement.showPhone && (
            <a
              href={`tel:${announcement.phoneNumber}`}
              className="flex items-center gap-1.5 text-amber-300 hover:text-white font-mono font-bold transition-colors"
            >
              <Phone size={14} className="text-amber-400" />
              <span>{announcement.phoneText || `Call Us ${announcement.phoneNumber}`}</span>
            </a>
          )}

          {announcement.showWhatsapp && (
            <a
              href={`https://wa.me/${announcement.whatsappNumber.replace(/[^0-9]/g, '')}?text=আসসালামু%20আলাইকুম,%20Elegant%20Beauty%20অফার%20সম্পর্কে%20জানতে%20চাই`}
              target="_blank"
              rel="noreferrer"
              className="hidden md:flex items-center gap-1 text-[#25D366] hover:underline text-xs"
            >
              <MessageCircle size={14} />
              <span>WhatsApp Chat</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

