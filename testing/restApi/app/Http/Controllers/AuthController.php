<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\customer;
class AuthController extends Controller
{
    //
    public function login(Request $request){

        $credentialsRecived = $request->only('EmailID', 'Password');
        $credentials = [
            'email' => $credentialsRecived['EmailID'],
            'password' => $credentialsRecived['Password']
        ];
        $message = "Pending Authentication";
        if (Auth::attempt($credentials)) {
            // Authentication passed...
            $user = Auth::user();
            $token = $user->createToken('authToken',['create','update'])->plainTextToken;
            $message = "Authentication Successfull";
            $customer = customer::where('user_id',$user->id)->first();
            return response()->json(['token' => $token, 'id' => $customer->id, 'name'=>$user->name], 200);
        }else{
            $message = "invalid email or password";
        }

        return response()->json(['error' => 'Unauthorized','message'=>$credentials], 401);
    }
}
