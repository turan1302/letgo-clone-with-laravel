<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['prefix'=>'client','as'=>'client.'],function (){
    Route::post('login',[\App\Http\Controllers\api\auth\indexController::class,'login'])->name('login');
    Route::post('register',[\App\Http\Controllers\api\auth\indexController::class,'register'])->name('register');

    Route::group(['middleware'=>'auth:api_client'],function (){
        Route::get('profile',[\App\Http\Controllers\api\auth\indexController::class,'profile'])->name('profile');
        Route::post('update',[\App\Http\Controllers\api\auth\indexController::class,'update'])->name('update');
        Route::get('check',[\App\Http\Controllers\api\auth\indexController::class,'check'])->name('check');
        Route::get('logout',[\App\Http\Controllers\api\auth\indexController::class,'logout'])->name('logout');
    });
});

Route::group(['middleware'=>'auth:api_client','as'=>'categories.'],function (){
    Route::get('categories',[\App\Http\Controllers\api\categories\indexController::class,'index'])->name('index');
    Route::post('category-products',[\App\Http\Controllers\api\categories\indexController::class,'getCategoryProducts'])->name('getCategoryProducts');
});

Route::group(['middleware'=>'auth:api_client','as'=>'products.'],function (){
    Route::get("products",[\App\Http\Controllers\api\product\indexController::class,'index'])->name('index');
    Route::post("set-favourite-product",[\App\Http\Controllers\api\product\indexController::class,'set_favourite'])->name('set_favourite');
});

Route::group(['middleware'=>'auth:api_client','as'=>'products.'],function (){
    Route::get("posts",[\App\Http\Controllers\api\post\indexController::class,'index'])->name('index');
    Route::post("delete-post",[\App\Http\Controllers\api\post\indexController::class,'delete_post'])->name('delete_post');
});
