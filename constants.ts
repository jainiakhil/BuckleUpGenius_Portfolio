import { Project, Testimonial, Service, SocialLink } from './types';
import { Instagram, Linkedin, Twitter, Mail } from 'lucide-react';

export const SERVICES: Service[] = [
  { id: '1', title: 'Creative Writing' },
  { id: '2', title: 'Photography' },
  { id: '3', title: 'Video Editing' },
  { id: '4', title: 'Web Design' },
  { id: '5', title: 'Subtitling' },
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Neon Silence',
    category: 'Photography',
    image: 'https://picsum.photos/id/237/800/1000',
    description: 'A study of urban solitude in Tokyo.',
    year: '2023',
  },
  {
    id: '2',
    title: 'Echoes of Ink',
    category: 'Brand Design',
    image: 'https://picsum.photos/id/24/800/1000',
    description: 'Rebranding for a heritage calligraphy studio.',
    year: '2024',
  },
  {
    id: '3',
    title: 'The Lost Tape',
    category: 'Video Editing',
    image: 'https://picsum.photos/id/48/800/600',
    description: 'Short film editing and color grading.',
    year: '2023',
  },
  {
    id: '4',
    title: 'Minimalist Future',
    category: 'Web Design',
    image: 'https://picsum.photos/id/4/800/800',
    description: 'E-commerce platform for digital artists.',
    year: '2024',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Elena Vance',
    role: 'Art Director, Vogue',
    text: 'A rare talent who understands the delicate balance between digital precision and analog soul.',
    emphasis: ['rare talent', 'analog soul']
  },
  {
    id: '2',
    name: 'Marcus Thorne',
    role: 'Filmmaker',
    text: 'The editing pace was impeccable. Every cut told a story. Truly cinematic work.',
    emphasis: ['impeccable', 'cinematic']
  },
  {
    id: '3',
    name: 'Sarah Jenkins',
    role: 'CEO, BrightStart',
    text: 'Transformed our brand voice completely. The copy is sharp, witty, and deeply human.',
    emphasis: ['transformed', 'deeply human']
  },
  {
    id: '4',
    name: 'David Chen',
    role: 'Product Lead, TechFlow',
    text: 'Working with him was like checking into a luxury hotel. Everything was handled before I could even ask.',
    emphasis: ['luxury hotel', 'handled']
  },
  {
    id: '5',
    name: 'Jessica Lee',
    role: 'Founder, Core',
    text: 'I was blown away by the creative direction. It wasn\'t just a website; it was a full experience.',
    emphasis: ['blown away', 'full experience']
  },
];

export const SOCIALS: SocialLink[] = [
  { platform: 'Instagram', url: '#', icon: Instagram },
  { platform: 'LinkedIn', url: '#', icon: Linkedin },
  { platform: 'Twitter', url: '#', icon: Twitter },
  { platform: 'Email', url: 'mailto:hello@creative.com', icon: Mail },
];