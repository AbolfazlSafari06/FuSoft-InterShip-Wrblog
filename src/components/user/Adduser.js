import { useEffect, useState } from 'react';
import usersService from "../../services/usersService";


function Adduser() {


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const Submit = (e) => {
        const addTask = async () => {
            const result = await fetch('http://localhost:5000/users/cre', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: {"name":``, "lastName":"Doe"},
            });
    
            const data = await result.json();
            console.log(data);
        };
    }

    return (
        <div>
            <form onSubmit={Submit}>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">ایمیل</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className={"form-control"} id="exampleFormControlInput1" placeholder="name@example.com" />
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">نام</label>
                    <input value={name} onChange={(e) => { console.log(name); setName(e.target.value) }} type="text" className={"form-control"} id="exampleFormControlInput1" placeholder="نام کامل" />
                </div>
                <input type="انجام" type="submit" className="btn btn-warning" onClick={() => Adduser(name, email)}></input>
            </form>
        </div>
    )
}
export default Adduser;