<?php

namespace App\Http\Controllers\Api\V1;
use App\Http\Controllers\Controller;

use App\Models\permissions;
use App\Http\Requests\StorepermissionsRequest;
use App\Http\Requests\UpdatepermissionsRequest;

class PermissionsController extends Controller
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
    public function store(StorepermissionsRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(permissions $permissions)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(permissions $permissions)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatepermissionsRequest $request, permissions $permissions)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(permissions $permissions)
    {
        //
    }
}
