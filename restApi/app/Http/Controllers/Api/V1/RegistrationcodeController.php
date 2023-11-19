<?php

namespace App\Http\Controllers\Api\V1;
use App\Http\Controllers\Controller;

use App\Models\registrationcode;
use App\Http\Requests\StoreregistrationcodeRequest;
use App\Http\Requests\UpdateregistrationcodeRequest;
use App\Http\Resources\V1\RegistrationCodeCollection;
use App\Filter\V1\RegistrationCodeQuery;
use App\Models\program;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
class RegistrationcodeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $registrationCode = registrationcode::join('programs', 'registrationcodes.program_id', '=', 'programs.id')
                                    ->select('registrationcodes.id','registrationcodes.code','registrationcodes.role','registrationcodes.validUntill'
                                                ,'registrationcodes.validFrom', 'programs.name','programs.type',)
                                    ->where('registrationcodes.deleted', 0)
                                    ->get();

        
        return $registrationCode;

        
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
    public function store(StoreregistrationcodeRequest $request)
    {
        registrationcode::query()->update(['deleted' => 1]);
        $programs = program::where('deleted', 0)->get();
        $roles = ['Student', 'Instructor', 'QA', 'Program Coordinator', 'Admin'];
        foreach ($roles as $role) {
            // Generate a unique code (you can implement your logic here)
            
    
            // Create a registration code for the current program, role, and code
            foreach ($programs as $p){
                $code = Str::random(10);
                RegistrationCode::create([
                    'program_id' => $p->id,
                    'role' => $role,
                    'code' => $code,
                    'validFrom' => now(),
                    'validUntill' => now()->addDays(120),
                ]);
            }
            
        }
        $filter = new RegistrationCodeQuery();
        $filterItems = $filter->transform($request);
        $registrationCode = registrationcode::join('programs', 'registrationcodes.program_id', '=', 'programs.id')
                                    ->select('registrationcodes.id','registrationcodes.code','registrationcodes.role','registrationcodes.validUntill'
                                                ,'registrationcodes.validFrom', 'programs.name','programs.type',)
                                    ->where($filterItems)
                                    ->where('registrationcodes.deleted', 0)
                                    ->get();

        
        return $registrationCode;
    }

    /**
     * Display the specified resource.
     */
    public function show(registrationcode $registrationcode)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(registrationcode $registrationcode)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateregistrationcodeRequest $request, registrationcode $registrationcode)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(registrationcode $registrationcode)
    {
        //
    }
}
