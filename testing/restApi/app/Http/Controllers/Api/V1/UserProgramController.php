<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\user_program;
use App\Http\Requests\Storeuser_programRequest;
use App\Http\Requests\Updateuser_programRequest;

class UserProgramController extends Controller
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
    public function store(Storeuser_programRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(user_program $user_program)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(user_program $user_program)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Updateuser_programRequest $request, user_program $user_program)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(user_program $user_program)
    {
        //
    }
}
