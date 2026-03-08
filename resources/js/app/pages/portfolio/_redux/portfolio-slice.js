import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    projects: [],
    skills: [],
    experiences: [],
    githubActivity: [],
    selectedProject: null,
    loading: false,
    error: null,
};

export const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState,
    reducers: {
        setProjects: (state, action) => {
            state.projects = action.payload;
        },
        setSkills: (state, action) => {
            state.skills = action.payload;
        },
        setExperiences: (state, action) => {
            state.experiences = action.payload;
        },
        setGithubActivity: (state, action) => {
            state.githubActivity = action.payload;
        },
        setSelectedProject: (state, action) => {
            state.selectedProject = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const {
    setProjects,
    setSkills,
    setExperiences,
    setGithubActivity,
    setSelectedProject,
    setLoading,
    setError,
} = portfolioSlice.actions;

export default portfolioSlice.reducer;
