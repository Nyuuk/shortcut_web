<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Request as ModelsRequest;
use App\Services\Program\ProgramService;
use App\Services\Request\RequestService;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    //
    private $programService;
    private $requestService;
    public function __construct(ProgramService $pgS, RequestService $rqS)
    {
        $this->programService = $pgS;
        $this->requestService = $rqS;
    }
    public function layoutApi()
    {
        $user = auth()->user();
        $requestData = ModelsRequest::where('is_member', false)->select('nama', 'email', 'created_at', 'programs')->get();
        return response()->json([
            'user' => $user,
            'countNotif' => $requestData->count(),
            'data' => $requestData
        ], 200);
    }

    public function newProgram(Request $request)
    {
        // return redirect()->action([\App\Http\Controllers\ProgramsController::class, 'store']);
        $data = $this->programService->create($request->all());
        return response()->json($data, $data['code']);
    }
    public function getProgram(Request $rq)
    {
        // return redirect()->action([\App\Http\Controllers\ProgramsController::class, 'index']);
        //
        $query = $rq->query();

        if (!is_array($query)) {
            $data = $this->programService->index();
        } else {
            $data = $this->programService->index($query);
        }

        return response()->json($data, $data['code']);
    }
    public function deletePorgram($id)
    {
        $data = $this->programService->delete($id);
        return response()->json($data, $data['code']);
    }

    public function updateProgram(Request $rq)
    {
        $data = $this->programService->update($rq->all());
        return response()->json($data, $data['code']);
    }

    // REQUEST
    public function getRequests(Request $rq)
    {
        $data = $this->requestService->index($rq->all());
        return response()->json($data, $data['code']);
    }

    public function deleteRequest($id)
    {
        $data = $this->requestService->delete($id);
        return response()->json($data, $data['code']);
    }
}
