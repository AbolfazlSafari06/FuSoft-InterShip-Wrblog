import React, { useState } from 'react';
import usersService from "../../services/usersService";


function Updateuser({ id }) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const Updat = async (e) => {
        if (name === "" || email === "") {
            alert("لطفا اطلاعات را کامل وارد کنید.")
            throw new Error();
        }
        try { 
            console.log(id);
            var data = await usersService.upDateUser(id, name, email);
            console.log(data);
        } catch (error) {
            console.log("error => " + error);
        }
    };

    return (
        <div>
            <form onSubmit={Updat}>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">امیل جدید</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className={"form-control"} id="exampleFormControlInput1" placeholder="name@example.com" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">نام جدید</label>
                    <input value={name} onChange={(e) => { setName(e.target.value) }} type="text" className={"form-control"} id="exampleFormControlInput1" placeholder="نام کامل" />
                </div>
                <input value="انجام" type="submit" className="btn btn-warning"></input>
            </form>
        </div >
    )
}

export default Updateuser;
