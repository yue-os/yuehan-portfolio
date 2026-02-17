import React from 'react';

export interface Project {
  id: string;
  title: string;
  category: 'Game Dev' | 'Full Stack' | 'Security';
  description: string;
  techStack: string[];
  imageUrl: string;
  link?: string;
}

export interface Stat {
  label: string;
  value: string;
  icon: React.ComponentType<any>;
  color: string;
}

export interface Service {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  skills: string[];
  color: 'cyan' | 'purple' | 'crimson';
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: React.ComponentType<any>;
}