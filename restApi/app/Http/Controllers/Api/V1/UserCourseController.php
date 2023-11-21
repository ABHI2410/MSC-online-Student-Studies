<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\user_course;
use App\Http\Requests\Storeuser_courseRequest;
use App\Http\Requests\Updateuser_courseRequest;
use App\Filter\V1\UserCourseQuery;
use App\Http\Resources\V1\CustomerResource;
use App\Http\Resources\V1\CourseResource;
use App\Http\Resources\V1\UserCourseResource;

class UserCourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = new UserCourseQuery();
        $queryItems = $filter->transform($request);
        $courseList  = user_course::where($queryItems)->where('deleted',0)->get();
        $courseList->map(function ($userCourse) {
            $userCourse->customer = new CustomerResource($userCourse->customer); // Replace 'customer_id' with related 'customer' data
            $userCourse->course = new CourseResource ($userCourse->course);     // Replace 'course_id' with related 'course' data
            
        });
        return $courseList;
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
