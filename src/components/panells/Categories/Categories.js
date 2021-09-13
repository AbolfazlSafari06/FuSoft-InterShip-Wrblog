import React from 'react'
import { useEffect, useState } from "react";
import Alert from "../../../common/Alert/Alert";
import categoryServie from "../../../services/CategoryService";
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Pagination from '../../../common/Pagination';


function Category() {
    const [Category, setCategory] = useState([])
    const [loading, setloading] = useState(false);
    const [message, setmessage] = useState("")
    const [Error, setError] = useState("")


    const { register, handleSubmit, reset, watch, getValues, formState: { errors } } = useForm();

    const getCategories = async () => {
        try {
            setloading(true);
            const category = await categoryServie.getAllCategories();
            // console.log("category ", category); 
            setCategory(category.data);
            setloading(false);
        }
        catch (error) {
            console.log("error => " + error);
            setloading(false);
        }
    };
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
                <table className="table table-bordered table-striped table-hover text-nowrap">
                    <thead>
                        <tr>
                            <td>#</td>
                            <td>نام کاربر</td>
                            <td>ایمیل کاربر</td>
                            <td>عملیات</td>
                        </tr>
                    </thead>
                    <tbody>
                        {Category.map((category) => {
                            return (
                                <tr key={`user-${category.id}`}>
                                    <td>{Category.indexOf(category) + 1}</td>
                                    <td>{category.name}</td>
                                    <td>{category.email}</td>
                                    <td>
                                        <Link to={`/panel/Category/${category.id}/edit`} className={"btn btn-success mx-2 ms-2"}  >ویرایش</Link>
                                        <button onClick={() => onDeleteuser(category.id)} className={"btn btn-danger mx-2 ms-2"}  >حدف</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
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

    console.log(" math ", Math.floor(totalUesrs / 15));

    useEffect(() => {
        getCategories();
    }, []);

    const onDeleteuser = async (id) => {
        try {
            setloading(true);
            if (window.confirm("آیا مطمئن هستید؟")) {
                await categoryServie.deleteCategories(id);
                await getCategories();
                setmessage("کاربر با موفقیت پاک شد.")
                setloading(false);
            }
        } catch (error) {
            setError("عملیات با موفقیت انجام نشد.")
            setloading(false);
        }
    }

    const onPageClick = (page) => {
        console.log("pageclick is clicked");
        setPage(page)
        getUsers(getValues("query"), getValues("sort"), page);
    }
    return (
        <div className="container py-3 my-4 h-100" style={{ width: "100%" }}>
            <Alert type="success" message={message} onClose={() => setmessage("")} ></Alert>
            <Alert type="danger" message={Error} onClose={() => setError("")} ></Alert>
            {renderContent()}
            <Pagination total={totalUesrs} currentPage={page} perPage={15} onPageClick={onPageClick}></Pagination>
        </div >
    );
}


export default User
