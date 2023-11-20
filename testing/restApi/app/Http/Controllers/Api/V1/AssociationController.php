<?php

namespace App\Http\Controllers\Api\V1;
use App\Http\Controllers\Controller;

use App\Models\association;
use App\Http\Requests\StoreassociationRequest;
use App\Http\Requests\UpdateassociationRequest;

class AssociationController extends Controller
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
    public function store(StoreassociationRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(association $association)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(association $association)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateassociationRequest $request, association $association)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(association $association)
    {
        //
    }
}
