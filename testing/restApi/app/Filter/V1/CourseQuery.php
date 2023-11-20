<?php

namespace App\Filter\V1;

use Illuminate\Http\Request;
use App\Filter\Query;

class CourseQuery extends Query{
    protected $allowedParms = [
        'courseID'=> ['eq'],
        'name'=>['eq'],
        'day'=>['eq'],
        'timeStart'=>['eq','lt','gt','lte','gte','ne'],
        'timeEnd'=>['eq','lt','gt','lte','gte','ne'],
        'startDate'=>['eq','lt','gt','lte','gte','ne'], 
        'endDate'=>['eq','lt','gt','lte','gte','ne'],
        'location' => ['eq'],
        'mode'=>['eq'],
        'domain' => ['eq'],
        'credit' => ['eq'],
        'customer_id' => ['eq'],
    ];

    protected $columnMap = [
            
    ];
    
}