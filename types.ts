import React from 'react';

export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  year: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  avatar?: string;
  emphasis?: string[];
}

export interface Service {
  id: string;
  title: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: React.ElementType;
}