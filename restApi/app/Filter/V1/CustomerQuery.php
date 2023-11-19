<?php

namespace App\Filter\V1;

use Illuminate\Http\Request;
use App\Filter\Query;

class CustomerQuery extends Query{
    protected $allowedParms = [
        'userID' => ['eq'],
        'firstName' => ['eq','in','like'],
        'lastName' => ['eq','in','like'],
        'role' => ['eq','in','like'],
        'dateOfBirth' => ['eq','gt','lt','gte','lte'],
        'age' => ['eq','gt','lt','gte','lte'],
        'term' => ['eq'],
        'enrollYear' => ['eq','gt','lt','gte','lte'],
        'phoneNo' => ['eq','like','in'],
        'address' => ['eq','like','in'],
        'emailID' => ['eq','like','in'],
    ];

    protected $columnMap = [
            'Email ID' => 'emailID',
    ];
    
}