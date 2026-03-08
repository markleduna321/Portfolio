import { useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { useDispatch } from 'react-redux';
import PortfolioLayout from './layout';
import HeroSection from './_sections/hero-section';
import ProjectsSection from './_sections/projects-section';
import SkillsSection from './_sections/skills-section';
import ExperienceSection from './_sections/experience-section';
import GitHubSection from './_sections/github-section';
import ContactSection from './_sections/contact-section';
import { getPortfolioDataThunk } from './_redux/portfolio-thunk';

export default function PortfolioPage({ portfolioData }) {
    const dispatch = useDispatch();

    useEffect(() => {
        // If you want to fetch data from API instead of props
        // dispatch(getPortfolioDataThunk());
    }, []);

    return (
        <>
            <Head title="Developer Portfolio" />
            <PortfolioLayout>
                <HeroSection />
                <ProjectsSection />
                <SkillsSection />
                <ExperienceSection />
                <GitHubSection />
                <ContactSection />
            </PortfolioLayout>
        </>
    );
}
