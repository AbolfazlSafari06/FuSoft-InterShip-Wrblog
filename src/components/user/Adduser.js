import { useEffect, useState } from 'react';
import usersService from "../../services/usersService";


function Adduser() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const Submit = async (e) => {
        if (name === "" || email === "") {
            alert("لطفا اطلاعات را کامل وارد کنید.")
            throw new Error();
        }
        try {
            console.log(name, email);
            e.preventDefault();
            var data = await usersService.createNewUser(name, email);
            setName("");
            setEmail("");
        } catch (error) {
            console.log("error => " + error);
        }
    }

    return (
        <div>
            <form onSubmit={Submit}>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">ایمیل</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className={"form-control"} id="exampleFormControlInput1" placeholder="name@example.com" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">نام</label>
                    <input value={name} onChange={(e) => { setName(e.target.value) }} type="text" className={"form-control"} id="exampleFormControlInput1" placeholder="نام کامل" />
                </div>
                <input value="انجام" type="submit" className="btn btn-warning"></input>
            </form>
        </div>
    )
}
export default Adduser;