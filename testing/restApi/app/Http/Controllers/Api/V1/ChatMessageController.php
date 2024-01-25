<?php

namespace App\Http\Controllers\Api\V1;
use App\Http\Controllers\Controller;

use App\Models\chatMessage;
use App\Http\Requests\StorechatMessageRequest;
use App\Http\Requests\UpdatechatMessageRequest;

class ChatMessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(StorechatMessageRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(chatMessage $chatMessage)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(chatMessage $chatMessage)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatechatMessageRequest $request, chatMessage $chatMessage)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(chatMessage $chatMessage)
    {
        //
    }
}
