<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class FavouriteProductsModel extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = "favourite_products";
    protected $guarded = [];
    protected $primaryKey = "fw_id";
    public const CREATED_AT = "fw_created_at";
    public const UPDATED_AT = "fw_updated_at";

}
