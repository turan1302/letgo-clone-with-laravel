<?php

namespace App\Http\Controllers\api\post;

use App\Http\Controllers\api\BaseController;
use App\Http\Controllers\Controller;
use App\Models\PostModel;
use App\Models\ProductImagesModel;
use App\Models\ProductsModel;
use Illuminate\Http\Request;

class indexController extends BaseController
{
    public function index(Request $request)
    {
        $user = $request->user();
        $posts = PostModel::leftJoin("products","posts.ps_product","=","products.pd_id")->where([
            ["posts.ps_user","=",$user->id]
        ])->get()->map(function ($item){
           $item["images"] = ProductImagesModel::where([
               ["pdi_product","=",$item->pd_id]
           ])->get();

           return $item;
        });

        return parent::success("İlanlar Getirildi",$posts);
    }

    public function delete_post(Request $request)
    {
        $user = $request->user();
        $data = $request->except("_token");

        $delete = PostModel::where([
            ["ps_id","=",$data["ps_id"]],
            ["ps_user","=",$user->id],
        ])->delete();

        if ($delete){
            return parent::success("İşlem Başarılı");
        }else{
            return parent::error("İşlem Başarısız");
        }
    }
}
