<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PortfolioController;
use Inertia\Inertia;

Route::get('/', [PortfolioController::class, 'index'])->name('portfolio.index');

Route::prefix('api')->group(function () {
    Route::get('/portfolio', [PortfolioController::class, 'getPortfolioData']);
    Route::get('/projects', [PortfolioController::class, 'getProjects']);
    Route::get('/skills', [PortfolioController::class, 'getSkills']);
    Route::get('/experiences', [PortfolioController::class, 'getExperiences']);
    Route::get('/github-activity', [PortfolioController::class, 'getGithubActivity']);
    Route::post('/contact', [PortfolioController::class, 'sendContactMessage']);
});
