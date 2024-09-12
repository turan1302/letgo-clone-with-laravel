<?php

namespace App\Http\Controllers\api\product;

use App\Http\Controllers\api\BaseController;
use App\Http\Controllers\Controller;
use App\Models\FavouriteProductsModel;
use App\Models\ProductsModel;
use Illuminate\Http\Request;

class indexController extends BaseController
{
    public function index(Request $request)
    {
        $user = $request->user();
        $products = ProductsModel::with("images")->get()->map(function ($item) use ($user){
            $item['isFavourite'] = FavouriteProductsModel::where([
                ["fw_product","=",$item->pd_id],
                ["fw_user","=",$user->id]
            ])->count();

            return $item;
        });
        return parent::success("Ürünler Getirildi",$products);
    }

    public function set_favourite(Request $request)
    {
        $client = $request->user();
        $data = $request->except("_token");

        $control = FavouriteProductsModel::where([
            ["fw_user","=",$client->id],
            ["fw_product","=",$data['fw_product']],
        ])->first();

        if ($control){
           $result = FavouriteProductsModel::where([
                ["fw_user","=",$client->id],
                ["fw_product","=",$data['fw_product']],
            ])->delete();

           if ($result){
               return parent::success("İşlem Başarılı");
           }else{
               return parent::error("İşlem Başarısız");
           }
        }else{
            $result=FavouriteProductsModel::create([
                "fw_user" => $client->id,
                "fw_product" => $data['fw_product']
            ]);

            if ($result){
                return parent::success("İşlem Başarılı");
            }else{
                return parent::error("İşlem Başarısız");
            }
        }
    }
}
