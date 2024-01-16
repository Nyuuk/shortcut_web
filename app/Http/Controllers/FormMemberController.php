<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class FormMemberController extends Controller
{
    public function index(\App\Services\Program\ProgramServiceImpl $programsService)
    {
        $data = $programsService->index(null, true);
        return Inertia::render('FormMember', ['programs' => $data['data']]);
    }
}
