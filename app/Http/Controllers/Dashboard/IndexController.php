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
    public function editMember($id, \App\Repositories\Request\RequestRepositorieImpl $repo)
    {
        $data = $repo->find($id);

        if ($data) {
            $programs = \App\Models\Program::whereIn('id', $data->programs)->get();
            $programNames = $programs->pluck('username')->toArray();

            if (!is_null($data->programs_acc) && count($data->programs_acc) > 0) {
                $programs_acc = \App\Models\Program::whereIn('id', $data->programs_acc)->get();
                $data->programs_acc_name = $programs_acc->pluck('username')->toArray();
            }

            $data->programs_id = $data->programs;
            $data->programs = $programNames;
            $data['invoice'] = \App\Models\Invoice::where('request_id', $id)->with('paymentMethod')->first();

            return Inertia::render('Dashboard/EditMember', [
                'data' => $data
            ]);
        }
        abort(404);
    }
}
