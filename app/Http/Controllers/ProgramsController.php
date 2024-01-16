<?php

namespace App\Http\Controllers;

use App\Services\Program\ProgramService;
use Illuminate\Http\Request;

class ProgramsController extends Controller
{
    private $programService;
    public function __construct(ProgramService $pgS)
    {
        $this->programService = $pgS;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $rq)
    {
        //
        $query = $rq->query();

        if (!is_array($query))
        {
            $data = $this->programService->index();
        } else
        {
            $data = $this->programService->index($query);
        }

        return response()->json($data, $data['code']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $data = $this->programService->create($request->all());
        return response()->json($data, $data['code']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $data = $this->programService->index($id);
        return response()->json($data, $data['code']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $data = $this->programService->update($request->all(), $id);
        return response()->json($data, $data['code']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $data = $this->programService->delete($id);
        return response()->json($data, $data['code']);
    }
}
