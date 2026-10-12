import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PortfolioLayout from './layout';
import HeroSection from './_sections/hero-section';
import ExecutiveSummarySection from './_sections/executive-summary-section';
import ProjectsSection from './_sections/projects-section';
import SkillsSection from './_sections/skills-section';
import GitHubSection from './_sections/github-section';
import ContactSection from './_sections/contact-section';
import { getPortfolioDataThunk } from './_redux/portfolio-thunk';

export default function PortfolioPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = 'Developer Portfolio';
        // If you want to fetch data from API instead of props
        // dispatch(getPortfolioDataThunk());
    }, []);

    return (
        <PortfolioLayout>
                <HeroSection />
                <ExecutiveSummarySection />
                <ProjectsSection />
                <SkillsSection />
                <GitHubSection />
                <ContactSection />
            </PortfolioLayout>
    );
}
