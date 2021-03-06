import React from 'react'
import { useEffect, useState } from "react";
import Alert from "../../../common/Alert/Alert";
import categoryServie from "../../../services/CategoryService";
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Pagination from '../../../common/Pagination';


function Categories() {
    const [Category, setCategory] = useState([])
    const [loading, setloading] = useState(false);
    const [message, setmessage] = useState("")
    const [Error, setError] = useState("");
    const [totalArticleAmount, settotalArticleAmount] = useState(0)
    const [Page, setPage] = useState(1)


    const { register, handleSubmit, reset, watch, getValues, formState: { errors } } = useForm();

    const getCategories = async (page, perpage) => {
        try {
            setloading(true);
            const category = await categoryServie.getAllCategories(page, 1);
            settotalArticleAmount(category.lenght)
            if (Array.isArray(category.data)) {
                setCategory(category.data);
            }
            setloading(false);
        }
        catch (error) {
            console.log("error => " + error);
            setloading(false);
        }
    };

    const onPageClick = (page) => {
        setPage(page)
        getCategories(page, 4);
    }

    useEffect(() => {
        getCategories(Page, 4);
    }, [Page]);


    const renderContent = () => {
        if (loading) {
            return (
                <div className="p-5 text-center">
                    Loading...
                </div>
            )
        }
        if (Category.length > 0) {
            return (
                <div className="overflow-auto">
                    <table className="table table-bordered table-striped table-hover text-nowrap">
                        <thead>
                            <tr>
                                <td className="text-center">#</td>
                                <td className="text-center">عنوان</td>
                                <td className="text-center">تعداد زیر دسته ها</td>
                                <td className="text-center">عملیات</td>
                            </tr>
                        </thead>
                        <tbody>
                            {Category.map((category) => {
                                return (
                                    <tr key={`category-${category.id}`}>
                                        <td>{Category.indexOf(category) + 1}</td>
                                        <td className="text-center">{category.title}</td>
                                        <td className="text-center">{category.children}</td>
                                        <td className=" h-100 text-center">
                                            <Link to={`/panel/categories/${category.id}/edit`} className={"btn btn-success mx-2 ms-2"}  >ویرایش</Link>
                                            <button onClick={() => onDeleteuser(category.id)} className={"btn btn-danger mx-2 ms-2"}  >حدف</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <div className="my-4">
                    </div>
                </div>
            )
        } else {
            return (
                <div className="text-center py-5 text-grey">
                    <i className="fa fa-info fa-4x mb-4" />
                    <p>هیچ کاربری وجود ندارد</p>
                </div>
            )
        }
    } 
    const onDeleteuser = async (id) => {
        try {
            setloading(true);
            if (window.confirm("آیا مطمئن هستید؟")) {
                await categoryServie.deleteCategories(id);
                await getCategories(Page, 4);
                setmessage("دسته بندی با موفقیت پاک شد.")
                setloading(false);
            }
            setloading(false);
        } catch (error) {
            setError("عملیات انجام نشد.")
            setloading(false);
        }
    }
    return (
        <div className="py-3 my-4 h-100"  >
            <div className="row mb-4">
                <div className="col-4 col-md-3 offset-md-7 offset-4">
                    <span className="fs-3  ">
                        مدیریت دسته بندی ها
                    </span>
                </div>
                <div className="col-2 col-md-2 text-center">
                    <Link to="/panel/categories/create" className="btn btn-primary">ایجاد دسته بندی جدید </Link>
                </div>
            </div>
            <Alert type="success" message={message} onClose={() => setmessage("")} ></Alert>
            <Alert type="danger" message={Error} onClose={() => setError("")} ></Alert>
            {renderContent()}
            <Pagination total={totalArticleAmount} currentPage={Page} perPage={1} onPageClick={onPageClick} />

        </div >
    );
}


export default Categories
