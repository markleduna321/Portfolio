import {
    getPortfolioDataService,
    getProjectsService,
    getSkillsService,
    getExperiencesService,
    getGithubActivityService,
} from '@/app/services/portfolio-service';

import { portfolioSlice } from './portfolio-slice';

export function getPortfolioDataThunk() {
    return async function (dispatch) {
        try {
            dispatch(portfolioSlice.actions.setLoading(true));
            const result = await getPortfolioDataService();
            dispatch(portfolioSlice.actions.setProjects(result.projects));
            dispatch(portfolioSlice.actions.setSkills(result.skills));
            dispatch(portfolioSlice.actions.setExperiences(result.experiences));
            dispatch(portfolioSlice.actions.setGithubActivity(result.githubActivity));
            dispatch(portfolioSlice.actions.setLoading(false));
        } catch (error) {
            console.error('Error fetching portfolio data:', error);
            dispatch(portfolioSlice.actions.setError(error.message));
            dispatch(portfolioSlice.actions.setLoading(false));
        }
    };
}

export function getProjectsThunk() {
    return async function (dispatch) {
        try {
            const result = await getProjectsService();
            dispatch(portfolioSlice.actions.setProjects(result));
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };
}

export function getSkillsThunk() {
    return async function (dispatch) {
        try {
            const result = await getSkillsService();
            dispatch(portfolioSlice.actions.setSkills(result));
        } catch (error) {
            console.error('Error fetching skills:', error);
        }
    };
}

export function getExperiencesThunk() {
    return async function (dispatch) {
        try {
            const result = await getExperiencesService();
            dispatch(portfolioSlice.actions.setExperiences(result));
        } catch (error) {
            console.error('Error fetching experiences:', error);
        }
    };
}

export function getGithubActivityThunk() {
    return async function (dispatch) {
        try {
            const result = await getGithubActivityService();
            dispatch(portfolioSlice.actions.setGithubActivity(result));
        } catch (error) {
            console.error('Error fetching GitHub activity:', error);
        }
    };
}
