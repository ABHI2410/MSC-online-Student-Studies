<?php

namespace App\Http\Controllers\Api\V1;
use App\Http\Controllers\Controller;
use App\Http\Resources\V1\AssignmentResource;
use Carbon\Carbon;
use App\Models\assignment;
use Illuminate\Http\Request;
use App\Http\Requests\StoreassignmentRequest;
use App\Http\Requests\UpdateassignmentRequest;
use App\Filter\V1\AssignmentQuery;
use App\Http\Resources\V1\AssignmentCollection;

class AssignmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = new AssignmentQuery();
        $queryItems = $filter->transform($request);
        $assignments = assignment::where($queryItems);
        $assignments = $assignments->with('course')->get();
        return $assignments;
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
            if ($key === 'availableFrom' || $key === 'availableUntill' || $key === 'dueDate') {
                // Check if the key contains 'date'
                $requestData[$key] = Carbon::parse($value);
            }
        }

        $file = $request->file('files');

        // Store the file in the specified location
        $fileName = strtolower($requestData['name']) . '_assignment.' . $file->getClientOriginalExtension();
        $filePath = $file->storeAs('file/' . strtolower($requestData['name']), $fileName);

        // Update the 'syllabus' field in the request data with the file path
        $requestData['files'] = $filePath;
        $assignment = new assignment($requestData);
        $assignment->save();

        return $assignment;

    }

    /**
     * Display the specified resource.
     */
    public function show(assignment $assignment)
    {
        return new AssignmentResource($assignment);
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
