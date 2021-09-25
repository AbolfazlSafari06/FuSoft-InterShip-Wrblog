import React, { memo, useState } from 'react';
import { useEffect } from 'react';

import categoryService from '../../services/CategoryService'
import CategotyViewList from './CategotyViewList';
import './style.scss'

function Categories() {
  const [Categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)

  const getCategories = async (perpage = 8) => {
    try {
      setLoading(true)
      const data = await categoryService.getCategoryViewList(perpage)
      if (Array.isArray(data.data)) {
        setCategories(data.data)
      }
      setLoading(false)
    } catch (error) {
      alert("مشکل در دریافت اطلاعات")
      console.log(error);
      setLoading(false)
    }
  }
  useEffect(() => {
    getCategories(8)
  }, [])

  return (
    <div className={"container-md "} >
      <h3 className=" w-100 text-center  mb-4">
        دسته بندی ها
        <hr id="hrD" className="style13" />
      </h3>
      <div className="category-container">
        {
          Categories.map(category => {
            return (
              <CategotyViewList category={category} />
            )
          })
        }
      </div>
    </div>
  );
}

export default memo(Categories);
