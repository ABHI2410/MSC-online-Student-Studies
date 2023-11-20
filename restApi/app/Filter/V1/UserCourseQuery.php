<?php

namespace App\Filter\V1;

use Illuminate\Http\Request;
use App\Filter\Query;

class UserCourseQuery extends Query{
    protected $allowedParms = [
        'id' => ['eq'],
        'courseId' => ['eq'],
        'customerId' => ['eq'],
    ];

    protected $columnMap = [
        'customerId' => 'customer_id',
        'courseId' => 'course_id'
    ];
    
}