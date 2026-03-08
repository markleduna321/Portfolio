import axios from 'axios';

export async function getPortfolioDataService() {
    try {
        const response = await axios.get('/api/portfolio');
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function getProjectsService() {
    try {
        const response = await axios.get('/api/projects');
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function getSkillsService() {
    try {
        const response = await axios.get('/api/skills');
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function getExperiencesService() {
    try {
        const response = await axios.get('/api/experiences');
        return response.data;
    } catch (error) {
        throw error;
    }
}

export async function getGithubActivityService() {
    try {
        const response = await axios.get('/api/github-activity');
        return response.data;
    } catch (error) {
        throw error;
    }
}
