<?php

namespace App\Http\Controllers\Api\V1;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use App\Models\assignment;
use App\Http\Requests\StoreassignmentRequest;
use App\Http\Requests\UpdateassignmentRequest;
use App\Filter\V1\AssignmentQuery;
use App\Http\Resources\V1\AssignmentCollection;

class AssignmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $filter = new AssignmentQuery();
        $queryItems = $filter->transform($request);
        if (count($queryItems) == 0){
            return new AssignmentCollection(assignment::get());
        } else {
            return new AssignmentCollection(assignment::where($queryItems)->get());
        }
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
    public function store(StoreassignmentRequest $request)
    {
        $requestData = $request->all();

        
        $requestData['customer_id'] = $request->customer_id;

        foreach ($requestData as $key => $value) {
            if ($key === 'availableFrom' || $key === 'availableUntill') {
                // Check if the key contains 'date'
                $requestData[$key] = Carbon::parse($value);
            }
        }

        $file = $request->file('files');

        // Store the file in the specified location
        $fileName = strtolower($request->input('name')) . '_assignment.' . $file->getClientOriginalExtension();
        $filePath = $file->storeAs('file/' . strtolower($request->input('name')), $fileName);

        // Update the 'syllabus' field in the request data with the file path
        $requestData['files'] = $filePath;
        $course = new assignment($requestData);
        // $course->save();

        return $course;

    }

    /**
     * Display the specified resource.
     */
    public function show(assignment $assignment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(assignment $assignment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateassignmentRequest $request, assignment $assignment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(assignment $assignment)
    {
        //
    }
}
