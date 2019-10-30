<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Article;

class ArticleController extends Controller
{
    public function getArticles()
    {
        $articles = Article::select('id', 'title', 'details', 'userId')
            ->orderBy('created_at', 'DESC')
            ->paginate(5);
        // $articles = Article::all();
        return response($articles, 200);
    }

    public function addArticle(Request $request)
    {
        if($request->user['id'] == $request->article['userId']) {
            $article = new Article;

            $article->title = $request->article['title'];
            $article->details = $request->article['details'];
            $article->userId = $request->article['userId'];

            $article->save();
            return response($article, 200);
        }

        else {
            return response("Invalid User", 422);
        }
    }

    public function updateArticle(Request $request)
    {
        if($request->user['id'] == $request->article['userId']) {
            $article = Article::find($request->article['articleId']);

            $article->title = $request->article['title'];
            $article->details = $request->article['details'];
            $article->userId = $request->article['userId'];
            
            $article->save();
            return response($article, 200);
        }

        else {
            return response("Invalid User", 422);
        }
    }

    public function deleteArticle($id, Request $request)
    {
        $article = Article::find($id);
        if($article->userId == $request->user['id']) {
            Article::destroy($id);
            $response = 'Article deleted successfully';
            return response($response, 200);
        }
    }

    public function upload(Request $request)
    {
        return($request->all());
    }

    public function search(Request $request)
    {
        // return $request->input('value');
        $articles = Article::where('title', 'like', '%' . $request->input('value') . '%')->get();
        return response($articles, 200);
    }
}
