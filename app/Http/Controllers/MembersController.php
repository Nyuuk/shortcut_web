<?php

namespace App\Http\Controllers;

use App\Services\Member\MemberService;
use Illuminate\Http\Request;

class MembersController extends Controller
{
    private $memberService;

    public function __construct(MemberService $ms)
    {
        $this->memberService = $ms;
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
            $data = $this->memberService->index();
        } else
        {
            $data = $this->memberService->index($query);
        }

        return response()->json($data, $data['code']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $data = $this->memberService->create($request->all());
        return response()->json($data, $data['code']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $data = $this->memberService->index($id);
        return response()->json($data, $data['code']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $data = $this->memberService->update($request->all(), $id);
        return response()->json($data, $data['code']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $data = $this->memberService->delete($id);
    }
}
