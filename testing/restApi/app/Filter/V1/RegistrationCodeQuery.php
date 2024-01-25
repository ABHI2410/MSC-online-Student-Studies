<?php

namespace App\Filter\V1;

use Illuminate\Http\Request;
use App\Filter\Query;

class RegistrationCodeQuery extends Query{
    protected $allowedParms = [
        'role'=> ['eq'],
        'validFrom'=> ['eq','lt','gt','lte','gte','ne'],
        'validUntill'=> ['eq','lt','gt','lte','gte','ne'],
        'program_id' => ['eq']
    ];

    protected $columnMap = [
            
    ];
    
}