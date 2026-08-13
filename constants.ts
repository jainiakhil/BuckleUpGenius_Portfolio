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
    name: 'Aashish Richhariya',
    role: 'Software Engineer, Meta',
    text: 'It was a pleasure working with buckleupgenius. He did an excellent job copyediting my statement.',
    emphasis: ['pleasure', 'excellent job']
  },
  {
    id: '2',
    name: 'Shashank Shekhar',
    role: 'Research Engineer, Google DeepMind',
    text: 'Working with buckleupgenius for my website was great. He came up with very specific solutions!',
    emphasis: ['was great', 'very specific solutions']
  },
  {
    id: '3',
    name: 'Aleena Baby',
    role: 'ML Engineer, Access e.v',
    text: 'This guy is really genius. He did a fantastic job in creating our logo.',
    emphasis: ['really genius', 'fantastic job']
  },
  {
    id: '4',
    name: 'Dylan Menter',
    role: 'Influencer',
    text: 'I am blown away by the quality and creativity of Akhil\'s work. Definitely recommended.',
    emphasis: ['blown away', 'quality and creativity']
  },
  {
    id: '5',
    name: 'Geet Behera',
    role: 'Civil Servant',
    text: 'He perfectly grasped my initial idea and even used his creativity to my advantage.',
    emphasis: ['perfectly grasped', 'creativity to my advantage']
  },
  {
    id: '6',
    name: 'valulife',
    role: 'Fiverr Customer',
    text: 'Beyond PHENOMENAL! Buckleupgenius is the absolute best at graphic design. Consummate professional.',
    emphasis: ['Beyond PHENOMENAL', 'consummate professional']
  },
  {
    id: '7',
    name: 'clarinome',
    role: 'Fiverr Customer',
    text: 'It was such a pleasure to work with Akhil. The speed and quality were impressive.',
    emphasis: ['pleasure', 'speed and quality']
  },
  {
    id: '8',
    name: 'Iain Wise',
    role: 'Businessman',
    text: 'I couldn\'t be more impressed. A truly impressive operator. Look forward to working again soon.',
    emphasis: ['couldn\'t be more impressed', 'impressive operator']
  },
  {
    id: '9',
    name: 'robertsdgr',
    role: 'Fiverr Customer',
    text: 'Akhil is extremely knowledgeable and did an amazing job. HIGHLY RECOMMEND!',
    emphasis: ['extremely knowledgeable', 'HIGHLY RECOMMEND']
  },
  {
    id: '10',
    name: 'Vijayshree',
    role: 'Git Infosys',
    text: 'Amazing delivery. He delivered exactly what I was looking for. Hats off to the speed!',
    emphasis: ['Amazing delivery', 'Hats off']
  },
];

export const SOCIALS: SocialLink[] = [
  { platform: 'Instagram', url: '#', icon: Instagram },
  { platform: 'LinkedIn', url: '#', icon: Linkedin },
  { platform: 'Twitter', url: '#', icon: Twitter },
  { platform: 'Email', url: 'mailto:pro.jainiakhil@gmail.com', icon: Mail },
];