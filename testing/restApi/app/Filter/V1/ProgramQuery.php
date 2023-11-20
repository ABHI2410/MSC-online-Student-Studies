<?php

namespace App\Filter\V1;

use Illuminate\Http\Request;
use App\Filter\Query;

class ProgramQuery extends Query{
    protected $allowedParms = [
        'name'=> ['eq'],
        'startDate'=> ['eq','lt','gt','lte','gte','ne'],
        'duration'=> ['eq','lt','gt','lte','gte','ne'],
        'department'=> ['eq'],
        'type'=> ['eq'],
        'creditsRequired'=> ['eq','lt','gt','lte','gte','ne'],
        'location'=> ['eq'],
    ];

    protected $columnMap = [
            
    ];
    
}