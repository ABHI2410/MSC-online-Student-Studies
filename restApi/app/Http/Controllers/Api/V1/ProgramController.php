<?php

namespace App\Http\Controllers\Api\V1;
use App\Http\Controllers\Controller;

use App\Models\program;
use App\Http\Requests\StoreprogramRequest;
use App\Http\Requests\UpdateprogramRequest;

class ProgramController extends Controller
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
    public function store(StoreprogramRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(program $program)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(program $program)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateprogramRequest $request, program $program)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(program $program)
    {
        //
    }
}
