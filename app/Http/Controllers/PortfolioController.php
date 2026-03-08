<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Mail;

class PortfolioController extends Controller
{
    public function index()
    {
        return Inertia::render('portfolio/page', [
            'portfolioData' => $this->getPortfolioData(),
        ]);
    }

    public function getPortfolioData()
    {
        return response()->json([
            'projects' => $this->getProjectsData(),
            'skills' => $this->getSkillsData(),
            'experiences' => $this->getExperiencesData(),
            'githubActivity' => $this->getGithubActivityData(),
        ]);
    }

    public function getProjects()
    {
        return response()->json($this->getProjectsData());
    }

    public function getSkills()
    {
        return response()->json($this->getSkillsData());
    }

    public function getExperiences()
    {
        return response()->json($this->getExperiencesData());
    }

    public function getGithubActivity()
    {
        return response()->json($this->getGithubActivityData());
    }

    public function sendContactMessage(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        // TODO: Send email notification
        // Mail::to('your.email@example.com')->send(new ContactMessage($validated));

        return response()->json([
            'message' => 'Thank you for your message! I will get back to you soon.',
            'success' => true,
        ]);
    }

    // Private helper methods for mock data
    private function getProjectsData()
    {
        // This would typically fetch from database
        // For now, returning empty array - frontend has mock data
        return [];
    }

    private function getSkillsData()
    {
        return [];
    }

    private function getExperiencesData()
    {
        return [];
    }

    private function getGithubActivityData()
    {
        // You could integrate with GitHub API here
        // https://api.github.com/users/{username}/events
        return [];
    }
}
