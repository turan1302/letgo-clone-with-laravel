<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductImagesModel extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = "product_images";
    protected $guarded = [];

    protected $primaryKey = "pdi_id";

    public const CREATED_AT = "pdi_created_at";
    public const UPDATED_AT = "pdi_updated_at";

    public function products()
    {
        return $this->belongsTo(ProductsModel::class,"pdi_product","pd_id");
    }
}
