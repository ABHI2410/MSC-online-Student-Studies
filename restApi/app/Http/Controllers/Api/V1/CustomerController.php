<?php

namespace App\Http\Controllers\Api\V1;
use App\Http\Controllers\Controller;
use App\Models\customer;
use App\Http\Resources\V1\CustomerResource;
use App\Http\Resources\V1\CustomerCollection;
use App\Models\user_program;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use App\Http\Requests\StorecustomerRequest;
use App\Http\Requests\UpdatecustomerRequest;
use App\Filter\V1\CustomerQuery;
use App\Models\registrationcode;
use App\Models\User;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = new CustomerQuery();
        $queryItems = $filter->transform($request);

        if (count($queryItems) == 0){
            return new CustomerCollection(customer::paginate());
        } else {
            return new CustomerCollection(customer::where($queryItems)->paginate());
        }
        
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
    public function store(StorecustomerRequest $request)
    {
        // Calculate age from birthdate
        $birthdate = Carbon::parse($request->dateOfBirth);
        $age = now()->diff($birthdate)->y;

        // Generate unique customer_id
        $len = customer::whereYear('created_at', now()->year)->count() + 1;
        $currentMonth = now()->month;

        if ($currentMonth >= 1 && $currentMonth <= 4) {
            $term = 'Spring';
            $val = 1;
        } elseif ($currentMonth >= 5 && $currentMonth <= 7) {
            $term = 'Summer';
            $val = 2;
        } elseif ($currentMonth >= 8 && $currentMonth <= 12) {
            $term = 'Fall';
            $val = 3;
        } else {
            $term = 'Other';
        }

        $customer_id = substr(now()->year, -2) . str_pad(strval($val), 2, '0', STR_PAD_LEFT) . str_pad(strval($len), 4, '0', STR_PAD_LEFT);
        $user = User::create([
            'name' => $request->firstName.' '.$request->lastName,
            'email' => $request->emailID,
            'password' => Hash::make($request->Password),
        ]);

        

        $customer = new Customer([
            'userID' => $customer_id,
            'emailID' => $request->emailID,
            'firstName' => $request->firstName,
            'lastName' => $request->lastName,
            'role' => $request->role,
            'dateOfBirth' => $birthdate,
            'age' => $age,
            'term' => $term,
            'enrollYear' => now()->year,
            'phoneNo' => $request->phoneNo,
        ]);

        $user->customer()->save($customer);
    
        $customer = customer::where('userID', $customer_id)->first();
        if ($request->role != 'Admin' && $request->role != 'QA' && $request->role != 'Program Coordinator'){
            $registrationcode = registrationcode::where('code', $request->registrationCode)->first();

            $user_program = new user_program([
                'program_id' => $registrationcode->program_id, 
                'customer_id' => $customer->id,
        ]);
        // Save the user_program entry
        $user_program->save();
        }

        return $user;
    }

    /**
     * Display the specified resource.
     */
    public function show(customer $customer)
    {
        return new CustomerResource($customer);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(customer $customer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatecustomerRequest $request, customer $customer)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(customer $customer)
    {
        //
    }
}
