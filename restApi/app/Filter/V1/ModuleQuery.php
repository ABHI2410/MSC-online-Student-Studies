<?php

namespace App\Filter\V1;

use Illuminate\Http\Request;
use App\Filter\Query;

class ModuleQuery extends Query{
    protected $allowedParms = [
        'course_id'=> ['eq'],
        'name'=>['eq'],
        'id' => ['eq'],

    ];

    protected $columnMap = [
            
    ];
    
}