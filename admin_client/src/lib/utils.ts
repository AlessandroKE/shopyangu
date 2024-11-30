import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | number | Date): string {
 
  const now = new Date();
  const targetDate = new Date(date); 

  const timeDiff = Math.abs(now.getTime() - targetDate.getTime());
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (seconds < 60) return "a few seconds ago";
  if (minutes < 2) return "1 min ago";
  if (minutes < 60) return `${minutes} mins ago`;
  if (hours < 2) return "1 hour ago";
  if (hours < 24) return `${hours} hours ago`;

  const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
  };

  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(targetDate);
  const currentYear = now.getFullYear(); 

  if(formattedDate.includes(currentYear.toString())) { 
    return formattedDate.replace(`, ${currentYear}`, '') 
  } else {
    return formattedDate; 
  }
}
