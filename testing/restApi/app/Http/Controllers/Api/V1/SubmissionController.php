<?php

namespace App\Http\Controllers\Api\V1;
use App\Http\Controllers\Controller;

use App\Models\submission;
use App\Http\Requests\StoresubmissionRequest;
use App\Http\Requests\UpdatesubmissionRequest;

class SubmissionController extends Controller
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
    public function store(StoresubmissionRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(submission $submission)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(submission $submission)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatesubmissionRequest $request, submission $submission)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(submission $submission)
    {
        //
    }
}
