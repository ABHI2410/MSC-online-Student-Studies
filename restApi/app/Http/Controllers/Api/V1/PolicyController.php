<?php

namespace App\Http\Controllers\Api\V1;
use App\Http\Controllers\Controller;

use App\Models\policy;
use App\Http\Requests\StorepolicyRequest;
use App\Http\Requests\UpdatepolicyRequest;

class PolicyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorepolicyRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(policy $policy)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(policy $policy)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatepolicyRequest $request, policy $policy)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(policy $policy)
    {
        //
    }
}
