<?php

namespace App\Http\Controllers\Api\V1;
use App\Http\Controllers\Controller;

use App\Models\program;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Http\Requests\StoreprogramRequest;
use App\Http\Requests\UpdateprogramRequest;
use App\Http\Resources\V1\ProgramResource;
use App\Http\Resources\V1\ProgramCollection;
use App\Filter\V1\ProgramQuery;

class ProgramController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = new ProgramQuery();
        $queryItems = $filter->transform($request);

        if (count($queryItems) == 0){
            return new ProgramCollection(program::paginate());
        } else {
            return new ProgramCollection(program::where($queryItems)->paginate());
        }
        

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreprogramRequest $request)
    {
        //
        $requestWithoutField = $request->except('startDate');
        $startDate = Carbon::parse($request->startDate);
        $request->merge(['startDate' => $startDate]);
        return new ProgramResource(program::create($request->all()));
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
