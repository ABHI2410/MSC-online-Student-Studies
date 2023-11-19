<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\user_course;
use App\Http\Requests\Storeuser_courseRequest;
use App\Http\Requests\Updateuser_courseRequest;

class UserCourseController extends Controller
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
    public function store(Storeuser_courseRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(user_course $user_course)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(user_course $user_course)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Updateuser_courseRequest $request, user_course $user_course)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(user_course $user_course)
    {
        //
    }
}
