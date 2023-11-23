<?php

namespace App\Filter\V1;

use Illuminate\Http\Request;
use App\Filter\Query;

class AssignmentQuery extends Query{
    protected $allowedParms = [
        'id' => ['eq'],
        'name' => ['eq'],
        'dueDate' => ['eq','gt','lt','gte','lte'],
        'gradePoint' => ['eq'],
        'availableFrom' => ['eq','gt','lt','gte','lte'],
        'availableUntill' => ['eq','gt','lt','gte','lte'],
        'maxScore' => ['eq','gt','lt','gte','lte'],
        'heightScore' => ['eq','gt','lt','gte','lte'],
        'meanScore' => ['eq','gt','lt','gte','lte'],
        'lowestScore' => ['eq','gt','lt','gte','lte'],
        'medianScore' => ['eq','gt','lt','gte','lte'],
        'uperQuantileScore' => ['eq','gt','lt','gte','lte'],
        'lowerQuantileScore' => ['eq','gt','lt','gte','lte'],
        'course_id' => ['eq']
    ];

    protected $columnMap = [
            
    ];
    
}