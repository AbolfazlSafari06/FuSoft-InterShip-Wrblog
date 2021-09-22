import PoupulerArticle from './lastArticle/PoupulerArticle';
import articleService from '../../services/articleService';
import LastArticle from './lastArticle/LastArticle'



import React from 'react'
import { useState, useEffect } from 'react';

function MainPage() {
    const [articles, setArticles] = useState([])

    const getArticle = async () => {
        try {
            const articless = await articleService.getArtilcesView(5)
            if (Array.isArray(articless.data)) {
                setArticles(articless.data);
                console.log(articless.data);
            }
        } catch (error) {
            console.log(error);
            alert("مشکلی در ارتباط با سرور پیش آمده است")
        } 
    }

    useEffect(() => {
        getArticle()
    }, [])

    return (
        <div className="body overflow-auto" >
            <LastArticle articles={articles} />
            <br />
            <PoupulerArticle articles={articles} />
        </div>
    )
}

export default MainPage
