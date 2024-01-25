<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;

class FileController extends Controller
{
    public function getFile($filePath)
    {   
        $filePath = Str::replaceFirst('..', '', $filePath);
        $fullPath = storage_path('\app\\'.$filePath);
        $fullPath = str_replace('/', '\\', $fullPath);

        if (File::exists($fullPath)) {
            $file = Storage::get($filePath);
            // return response()->json(['error' => 'File found', 'messgae' => $fullPath], 404);
            return response($file, 200);
        } else {
            return response()->json(['error' => 'File not found'], 404);
        }        
    }
}
