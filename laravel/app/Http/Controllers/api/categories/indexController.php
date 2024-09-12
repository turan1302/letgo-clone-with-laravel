<?php

namespace App\Http\Controllers\api\categories;

use App\Http\Controllers\api\BaseController;
use App\Http\Controllers\Controller;
use App\Models\CategoriesModel;
use App\Models\ProductsModel;
use Illuminate\Http\Request;

class indexController extends BaseController
{
    public function index(Request $request)
    {
        $categories = CategoriesModel::all();
        return parent::success("Kategoriler Getirildi",$categories);
    }

    public function getCategoryProducts(Request $request)
    {
        $data = $request->except("_token");
        $category = CategoriesModel::where("ct_id",$data["ct_id"])->first();

        if (!$category){
            return parent::error("Kategori bulunamadı",404);
        }else{
            $products = ProductsModel::where("pd_category",$data['ct_id'])->get();
            return parent::success("Ürün Listesi Getirildi",$products);
        }
    }
}
