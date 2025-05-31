import {
  Heart, Star, Zap, Anchor, Award, Bell, Book, Briefcase,
  Camera, Clock, Cloud, Coffee, Compass, Database, Diamond,
  Flag, Gift, Globe, Headphones, Home, Key, Leaf, Map, Moon,
  Music, Palette, Phone, Printer, Scissors, Sun, Tag, Umbrella,
  Wifi, MessageCircle, Hexagon, Calendar, Mail, Settings
} from 'lucide-react';

// Map of all available icons
const iconMap: Record<string, any> = {
  Heart, Star, Zap, Anchor, Award, Bell, Book, Briefcase,
  Camera, Clock, Cloud, Coffee, Compass, Database, Diamond,
  Flag, Gift, Globe, Headphones, Home, Key, Leaf, Map, Moon,
  Music, Palette, Phone, Printer, Scissors, Sun, Tag, Umbrella,
  Wifi, MessageCircle, Hexagon, Calendar, Mail, Settings
};

// Get a random icon names
export const getRandomIcons = (count: number): string[] => {
  const iconNames = Object.keys(iconMap);
  const shuffled = [...iconNames].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Get the Lucide icon component by name
export const getLucideIcon = (iconName: string): any => {
  return iconMap[iconName] || Heart; // Default to Heart if icon not found
};