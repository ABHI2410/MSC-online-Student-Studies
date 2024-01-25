<?php

namespace App\Http\Controllers\Api\V1;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use App\Models\course;
use App\Models\customer;
use App\Http\Requests\StorecourseRequest;
use App\Http\Requests\UpdatecourseRequest;
use App\Filter\V1\CourseQuery;
use App\Http\Resources\V1\CourseResource;
use App\Http\Resources\V1\CourseCollection;
use App\Http\Resources\V1\CustomerResource;
use App\Models\user_course;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\V1\UserCourseResource;
class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = new CourseQuery();
        $queryItems = $filter->transform($request);
        $courseList  = user_course::where($queryItems)->where('deleted',0)->get();
        $courseList->map(function ($userCourse) {
            $userCourse->customer = new CustomerResource($userCourse->customer); // Replace 'customer_id' with related 'customer' data
            $userCourse->course = new CourseResource ($userCourse->course);     // Replace 'course_id' with related 'course' data
            
        });
        return $courseList;
        // if (count($queryItems) == 0){
        //     return new CourseCollection(course::paginate());
        // } else {
        //     return new CourseCollection(course::where($queryItems)->paginate());
        // }
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
    public function store(StorecourseRequest $request)
    {
        $requestData = $request->all();

        
        $requestData['customer_id'] = $request->customer_id;

        $len = course::whereYear('created_at', now()->year)->count() + 1;
        $courseID = 'C' . $requestData['credit'] . str_pad(strval($len), 4, '0', STR_PAD_LEFT);
        $requestData['courseID'] = $courseID;

        foreach ($requestData as $key => $value) {
            if ($key === 'startDate' || $key === 'endDate') {
                // Check if the key contains 'date'
                $requestData[$key] = Carbon::parse($value);
            } elseif ($key === 'timeStart' || $key === 'timeEnd') {
                // Check if the key contains 'time'
                $requestData[$key] = Carbon::parse($value)->format('H:i:s');
            }
        }

        if (isset($requestData['day']) && is_array($requestData['day'])) {
            $requestData['day'] = implode(',', $requestData['day']);
        }

        $file = $request->file('syllabus');

        // Store the file in the specified location
        $fileName = $request->input('name') . '_syllabus.' . $file->getClientOriginalExtension();
        $filePath = $file->storeAs('file/' . $request->input('name'), $fileName);

        // Update the 'syllabus' field in the request data with the file path
        $requestData['syllabus'] = $filePath;
        $course = new course($requestData);
        $course->save();

        $user_course = new user_course([
            'erolled_type' => 'Teacher',
            'customer_id' => $requestData['customer_id'],
            'course_id' => $course->id,
        ]);
        $user_course->save();

        return new CourseResource($course);

    }

    /**
     * Display the specified resource.
     */
    public function show(course $course)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(course $course)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatecourseRequest $request, course $course)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(course $course)
    {
        //
    }
}
