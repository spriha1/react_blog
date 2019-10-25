<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;
use Str;

class Article extends Model
{
    protected $appends = ['excerpt'];
     /**
     * Get the post that owns the comment.
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function getExcerptAttribute()
    {
        return Str::words(strip_tags($this->details), 3);
    }
}
