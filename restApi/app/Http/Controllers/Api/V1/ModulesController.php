<?php

namespace App\Http\Controllers\Api\V1;
use App\Http\Controllers\Controller;

use App\Http\Resources\V1\ModuleResource;
use App\Models\modules;
use App\Http\Requests\StoremodulesRequest;
use App\Http\Requests\UpdatemodulesRequest;
use App\Http\Resources\V1\ModuleCollection;
use App\Filter\V1\ModuleQuery;
use Illuminate\Http\Request;

class ModulesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = new ModuleQuery();
        $queryItems = $filter->transform($request);
        if (count($queryItems) == 0){
            return new ModuleCollection(modules::get());
        } else {
            return new ModuleCollection(modules::where($queryItems)->get());
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
    public function store(StoremodulesRequest $request)
    {
        $requestData = $request->all();
        $file = $request->file('location');

        // Store the file in the specified location
        $fileName = strtolower($requestData['name']) . '_chapter.' . $file->getClientOriginalExtension();
        $filePath = $file->storeAs('file/' . strtolower($request->input('name')), $fileName);

        // Update the 'syllabus' field in the request data with the file path
        $requestData['location'] = $filePath;
        $module = new modules($requestData);
        $module->save();
        return new ModuleResource($module);
    }

    /**
     * Display the specified resource.
     */
    public function show(modules $modules)
    {
        return new ModuleResource($modules);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(modules $modules)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatemodulesRequest $request, modules $modules)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(modules $modules)
    {
        
    }
}
