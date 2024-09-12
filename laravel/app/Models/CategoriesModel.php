<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CategoriesModel extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = "categories";
    protected $guarded = [];

    public const CREATED_AT = "ct_created_at";
    public const UPDATED_AT = "ct_updated_at";
}
