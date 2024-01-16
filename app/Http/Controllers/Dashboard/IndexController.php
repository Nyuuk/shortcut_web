<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Request as ModelsRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IndexController extends Controller
{
    //
    public function dashboard()
    {
        return Inertia::render('Dashboard/Dashboard');
    }

    public function newMembers(Request $request, \App\Services\Request\RequestServiceImpl $requestService)
    {
        // get Data first with querry param perPage
        // $perPage = $request->query('perPage', 10);
        // $dataWillReturn = ModelsRequest::where('is_member', false)->orderBy('id', 'desc')->paginate($perPage);

        $dataWillReturn = $requestService->index($request->all());
        // logic when it json or no
        if ($request->header('Accept') == 'application/json') {
            return response()->json([
                'data' => $dataWillReturn
            ], 200);
        }

        // this is for web
        return Inertia::render('Dashboard/NewMember', [
            'datas' => $dataWillReturn
        ]);
    }

    public function programs()
    {
        return Inertia::render('Dashboard/Programs');
    }
}
