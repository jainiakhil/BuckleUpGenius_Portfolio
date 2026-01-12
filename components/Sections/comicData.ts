import { Project } from '../../types';

export type PanelType = 'Photography' | 'Graphic Design' | 'Writing' | 'Copyediting' | 'Subtitle' | 'Web Design';

export interface ComicPanelData extends Project {
    panelType: PanelType;
    issueId: string;
    gridArea?: string; // For custom grid layouts if needed
}

export interface ComicIssue {
    id: string;
    issueNumber: string; // "Issue #01"
    title: string;
    tagline: string;
    color: {
        primary: string; // Tailwind class or hex
        secondary: string;
        accent: string;
    };
    panels: ComicPanelData[];
}

/* 
 * ==========================================
 *  COMIC BOOK DATA CONFIGURATION
 * ==========================================
 *  HOW TO EDIT:
 *  1. To Add a New Issue: Copy an entire object in the COMIC_ISSUES array (from { to }).
 *  2. To Add a Project: Add a new object to the 'panels' array within an Issue.
 *  3. Panel Types: 'Photography' | 'Graphic Design' | 'Writing' | 'Copyediting' | 'Subtitle' | 'Web Design'
 *  4. Images: Use local paths (e.g., 'assets/projects/img1.jpg') or external URLs.
 */

export const COMIC_ISSUES: ComicIssue[] = [
    {
        id: 'issue-1',
        issueNumber: 'Issue #01',
        title: 'Visual Impact',
        tagline: 'Where images speak louder than words.',
        color: {
            primary: '#FF0000', // Bright Red
            secondary: '#F59E0B', // Amber-500
            accent: '#FEF3C7', // Amber-100
        },
        panels: [
            {
                id: 'p1',
                title: 'Neon Silence',
                category: 'Photography',
                panelType: 'Photography',
                image: 'https://picsum.photos/id/237/800/1000',
                description: 'A study of urban solitude in Tokyo.',
                year: '2023',
                issueId: 'issue-1',
            },
            {
                id: 'p2',
                title: 'Echoes of Ink',
                category: 'Brand Design',
                panelType: 'Graphic Design',
                image: 'https://picsum.photos/id/24/800/1000',
                description: 'Rebranding for a heritage calligraphy studio.',
                year: '2024',
                issueId: 'issue-1',
            },
            {
                id: 'p3',
                title: 'Urban Geometry',
                category: 'Photography',
                panelType: 'Photography',
                image: 'https://picsum.photos/id/48/800/800',
                description: 'Exploring lines and shadows in modern architecture.',
                year: '2023',
                issueId: 'issue-1',
            },
            {
                id: 'p4',
                title: 'Vivid Dreams',
                category: 'Graphic Design',
                panelType: 'Graphic Design',
                image: 'https://picsum.photos/id/55/800/800',
                description: 'Surrealist digital art series.',
                year: '2024',
                issueId: 'issue-1',
            },
        ],
    },
    {
        id: 'issue-2',
        issueNumber: 'Issue #02',
        title: 'Power of Words',
        tagline: 'Crafting narratives that resonate.',
        color: {
            primary: '#7C3AED', // Bold Violet
            secondary: '#F3F4F6', // Off-white
            accent: '#EDE9FE', // Violet-100
        },
        panels: [
            {
                id: 'w1',
                title: 'The Silent Echo',
                category: 'Creative Writing',
                panelType: 'Writing',
                image: 'https://picsum.photos/id/10/800/800', // Placeholder
                description: 'A short story about memory and loss.',
                year: '2023',
                issueId: 'issue-2',
            },
            {
                id: 'w2',
                title: 'Tech Weekly',
                category: 'Copyediting',
                panelType: 'Copyediting',
                image: 'https://picsum.photos/id/20/800/800',
                description: 'Editorial oversight for a leading tech blog.',
                year: '2024',
                issueId: 'issue-2',
            },
            {
                id: 'w3',
                title: 'Foreign Cinema',
                category: 'Subtitling',
                panelType: 'Subtitle',
                image: 'https://picsum.photos/id/30/800/600',
                description: 'Subtitling for indie french films.',
                year: '2024',
                issueId: 'issue-2',
            },
        ],
    },
    {
        id: 'issue-3',
        issueNumber: 'Issue #03',
        title: 'Build the Web',
        tagline: 'Architecting the digital future.',
        color: {
            primary: '#22C55E', // Vibrant Green
            secondary: '#06B6D4', // Cyan-500
            accent: '#D1FAE5', // Emerald-100
        },
        panels: [
            {
                id: 'dev1',
                title: 'Minimalist Future',
                category: 'Web Design',
                panelType: 'Web Design',
                image: 'https://picsum.photos/id/4/800/800',
                description: 'E-commerce platform for digital artists.',
                year: '2024',
                issueId: 'issue-3',
            },
            {
                id: 'dev2',
                title: 'DevDash',
                category: 'Web Design',
                panelType: 'Web Design',
                image: 'https://picsum.photos/id/60/800/800',
                description: 'Dashboard UI kit for developers.',
                year: '2023',
                issueId: 'issue-3',
            },
        ],
    },
];
