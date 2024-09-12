<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PostModel extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = "posts";
    protected $guarded = [];

    protected $primaryKey = "ps_id";

    public const CREATED_AT = "ps_created_at";
    public const UPDATED_AT = "ps_updated_at";

    public function products(){
        return $this->belongsTo(ProductsModel::class,"ps_product","pd_id");
    }
}
