import { Project } from '../../types';

export type PanelType = 'Photography' | 'Graphic Design' | 'Writing' | 'Copyediting' | 'Subtitle' | 'Web Design';

export interface ComicPanelData extends Project {
    panelType: PanelType;
    issueId: string;
    gridArea?: string; // For custom grid layouts if needed
    images?: string[]; // Array of image URLs for carousel modal
    link?: string; // Follow-up link URL
    linkText?: string; // Follow-up button label
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
 *  4. Images: Provide an array of image URLs in `images: ['/url1.jpg', '/url2.jpg']`.
 *  5. Follow-up Link: Provide `link: 'https://...'` and optional `linkText: 'Explore Series'`.
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
                title: 'My India',
                category: 'Graphic Design',
                panelType: 'Graphic Design',
                image: '/files/Projects/p1_1.jpg',
                images: [
                    '/files/Projects/p1_1.jpg',
                    '/files/Projects/p1_2.jpg',
                    '/files/Projects/p1_3.jpg',
                    '/files/Projects/p1_4.jpg',
                    '/files/Projects/p1_5.jpg',
                    '/files/Projects/p1_6.jpg',
                    '/files/Projects/p1_7.jpg',
                    '/files/Projects/p1_8.jpg',
                    '/files/Projects/p1_9.jpg',
                    '/files/Projects/p1_10.jpg',
                    '/files/Projects/p1_11.jpg'
                ],
                description: 'Advertising content for the book, "My India" by Olivera Jankovska',
                year: '2020',
                issueId: 'issue-1',
                link: 'https://www.amazon.com/stores/Olivera-Jankovska/author/B08MBGQRH2',
                linkText: 'Check Out This Book!'
            },
            {
                id: 'p2',
                title: 'Astronomy on Tap: Koln',
                category: 'Logo Design',
                panelType: 'Graphic Design',
                image: '/files/Projects/p2_1.jpg',
                images: [
                    '/files/Projects/p2_1.jpg'
                ],
                description: 'New logo design for the Astronomy on Tap: Koln chapter',
                year: '2020',
                issueId: 'issue-1',
                link: 'https://www.facebook.com/share/18Ec6duQiX/',
                linkText: 'Check Out Their FB Page!'
            },
            {
                id: 'p3',
                title: 'PlasticTree',
                category: 'Brand Design',
                panelType: 'Graphic Design',
                image: '/files/Projects/p3_1.png',
                images: [
                    '/files/Projects/p3_1.png',
                    '/files/Projects/p3_2.jpg',
                    '/files/Projects/p3_3.jpg',
                    '/files/Projects/p3_4.jpg',
                    '/files/Projects/p3_5.jpg',
                    '/files/Projects/p3_6.png',
                    '/files/Projects/p3_7.png'
                ],
                description: 'Brand images and publicity materials for Plastic Tree, a climate positive waste management company based in Washington, D.C.',
                year: '2021',
                issueId: 'issue-1',
                link: 'https://www.linkedin.com/company/plastictreellc/about/',
                linkText: 'Check Out The Company!'
            },
            {
                id: 'p4',
                title: 'Vivid Dreams',
                category: 'Photography',
                panelType: 'Photography',
                image: '/files/Projects/p4_1.jpeg',
                images: [
                    '/files/Projects/p4_1.jpeg',
                    '/files/Projects/p4_2.jpg',
                    '/files/Projects/p4_3.jpg',
                    '/files/Projects/p4_4.jpg',
                    '/files/Projects/p4_5.jpg',
                    '/files/Projects/p4_6.jpg',
                    '/files/Projects/p4_7.jpg',
                    '/files/Projects/p4_8.jpg',
                    '/files/Projects/p4_9.jpg',
                    '/files/Projects/p4_10.jpeg'
                ],
                description: 'A few good photos from my daily life',
                year: '2024',
                issueId: 'issue-1',
                link: 'https://www.instagram.com/jainiakhil',
                linkText: 'Check Out My Insta!'
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
                title: 'Flames Within',
                category: 'Creative Writing',
                panelType: 'Writing',
                image: '/files/Projects/w1_1.jpg',
                description: 'A short story about love and loss.',
                year: '2016',
                issueId: 'issue-2',
            },
            {
                id: 'w2',
                title: 'LIYSF',
                category: 'Article Writing',
                panelType: 'Writing',
                image: '/files/Projects/w2_1.jpg',
                description: 'Ghost writing articles for the London International Youth Science Forum on behalf of GIT Infosys',
                year: '2021',
                issueId: 'issue-2',
                link: 'https://www.liysf.org.uk/blog',
                linkText: 'Check Out Their Blog!'
            },
            {
                id: 'w3',
                title: 'T.H.E. Podcast',
                category: 'Subtitling',
                panelType: 'Subtitle',
                image: '/files/Projects/w3_1.jpeg',
                description: 'Subtitles for The How-To Entrepreneur hosted by Dylan Menter',
                year: '2021',
                issueId: 'issue-2',
                link: 'https://open.spotify.com/show/761I1Mivx4PpjOiBpst5ZU',
                linkText: 'Listen To The Podast!'
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
                title: 'Personal Portfolio',
                category: 'Web Design',
                panelType: 'Web Design',
                image: '/files/Projects/dev1_1.png',
                description: 'Portfolio of my personal achievements',
                year: '2026',
                issueId: 'issue-3',
                link: 'https://www.jainiakhil.github.io',
                linkText: 'Check Out My Website!'
            },
            // {
            //     id: 'dev2',
            //     title: 'DevDash',
            //     category: 'Web Design',
            //     panelType: 'Web Design',
            //     image: 'https://picsum.photos/id/60/800/800',
            //     description: 'Dashboard UI kit for developers.',
            //     year: '2023',
            //     issueId: 'issue-3',
            // },
        ],
    },
];
