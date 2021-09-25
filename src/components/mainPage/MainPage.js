import PoupulerArticle from './lastArticle/PoupulerArticle';
import articleService from '../../services/articleService';
import LastArticle from './lastArticle/LastArticle'
import './style.scss';



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
        <div>
            <div className="container-md  overflow-auto" >
                <LastArticle articles={articles} />
            </div>
            <div>
                <div style={{ height: "150px", overflow: "hidden" }} ><svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ height: "100%", width: "100%" }}><path d="M0.00,49.99 C109.70,5.24 375.50,132.53 500.00,49.99 L500.00,150.00 L0.00,150.00 Z" style={{ stroke: "none", fill: "#08f" }}></path></svg></div>
                <div className="text-center fs-5 fw-bold" style={{ backgroundColor: "#08f" }}>
                    <span>  FuSoft</span>
                </div>
                <div style={{ height: "150px", overflow: "hidden" }} ><svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ height: "100%", width: "100%" }}><path d="M0.00,49.99 C29.57,213.45 347.29,39.76 500.00,49.99 L500.00,0.00 L0.00,0.00 Z" style={{ stroke: "none", fill: "#08f" }}></path></svg></div>
            </div>
            <div className="container-md  overflow-auto" >
                <PoupulerArticle articles={articles} />
            </div>
        </div>

    )
}

export default MainPage
