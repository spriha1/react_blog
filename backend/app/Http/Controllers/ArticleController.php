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
            ->paginate(10);
        // $articles = Article::all();
        return response($articles, 200);
    }

    public function getArticle($id) 
    {
        $article = Article::find($id);
        return response($article, 200);
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
        if($request->hasFile('upload')) {
            $originName = $request->file('upload')->getClientOriginalName();
            $fileName = pathinfo($originName, PATHINFO_FILENAME);
            $extension = $request->file('upload')->getClientOriginalExtension();
            $fileName = $fileName.'_'.time().'.'.$extension;
            $request->file('upload')->move(public_path('images'), $fileName);
            $url = json_encode(['default' => asset('images/'.$fileName)]);

            return json_encode(['urls' => ['default' => asset('images/'.$fileName)]]);
        }
    }

    public function search(Request $request)
    {
        $articles = Article::where('title', 'like', '%' . $request->input('value') . '%')->get();
        return response($articles, 200);
    }
}
