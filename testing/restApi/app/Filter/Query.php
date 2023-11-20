<?php

namespace App\Filter;

use Illuminate\Http\Request;

class Query{
    protected $allowedParms = [];

    protected $columnMap = [];
    public $operatorMap = [
        'eq' => '=',
        'lt' => '<',
        'gt' => '>',
        'lte' => '<=',
        'gte' => '>=',
        'ne' => '!=',
        'like' => 'LIKE',
        'in' => 'IN',
        'notIn' => 'NOT IN',
        'between' => 'BETWEEN',
        'notBetween' => 'NOT BETWEEN',
        'isNull' => 'IS NULL',
        'isNotNull' => 'IS NOT NULL',
        'exists' => 'EXISTS',
        'notExists' => 'NOT EXISTS',

    ];

    public function transform(Request $request){
        $eloQuery = [];

        foreach ($this->allowedParms as $param=>$operators){
            $query = $request->query($param);

            if(!isset($query)){
                continue;
            }
            $column = $this->columnMap[$param] ?? $param;
            foreach ($operators as $operator){
                if (isset($query[$operator])){
                    $eloQuery[] = [$column,$this->operatorMap[$operator],$query[$operator]];
                }
            }
        }

        return $eloQuery;
    }
}