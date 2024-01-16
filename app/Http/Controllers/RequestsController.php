<?php

namespace App\Http\Controllers;

use App\Services\Request\RequestService;
use Illuminate\Http\Request;

class RequestsController extends Controller
{
    private $requestService;

    public function __construct(RequestService $rq)
    {
        $this->requestService = $rq;
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
            $data = $this->requestService->index();
        } else
        {
            $data = $this->requestService->index($query);
        }

        return response()->json($data, $data['code']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $data = $this->requestService->create($request->all());
        return response()->json($data, $data['code']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $data = $this->requestService->index($id);
        return response()->json($data, $data['code']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $data = $this->requestService->update($request->all(), $id);
        return response()->json($data, $data['code']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $data = $this->requestService->delete($id);
        return response()->json($data, $data['code']);
    }
}
