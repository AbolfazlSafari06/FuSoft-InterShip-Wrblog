import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import categoryService from '../services/CategoryService'

function CategoryView() {
    const { id } = useParams("id")

    const [category, setCategory] = useState()

    const getCategory = async () => {
        try {
            console.log(id);
            const category = await categoryService.getCategory(id);
            console.log(category);
            setCategory(category)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCategory(id)
    }, [])
    return (
        <div className=" d-flex align-content-center justify-content-center">
            <div>
                <h1>
                    {category?.title}
                </h1>
            </div>
        </div>
    )
}

export default CategoryView
