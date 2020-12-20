import React, {useState} from "react";
import { authService } from "../firebase";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);

    const onChange = (e) => {
        const {target: {name, value}} = e;
        if (name === "email") {
            setEmail(e.currentTarget.value);
        } else if (name === "password") {
            setPassword(e.currentTarget.value);
        }
    }
    const onSubmit = async(e) => {
        e.preventDefault();
        let data;
        try {
            if (newAccount) {
                data = await authService.createUserWithEmailAndPassword(email, password);
            } else {
                data = await authService.signInWithEmailAndPassword(email, password);
            }
            console.log(data);
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name="email" type="text" placeholder="Email" required value={email} onChange={onChange}/>
                <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange}/>
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
            </form>
            <div>
                <button>Continue with Google</button>
                <button>Continue with Github</button>
            </div>
        </div>   
    )
}

export default Auth;