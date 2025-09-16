import axios from "axios";
const ROOT_URL = 'http://localhost:4000/api/';

const registerURL = ROOT_URL + 'auth/register';
const loginURL = ROOT_URL + 'auth/login';
const profileURL = ROOT_URL + 'profile/me/';
const createPostURL = ROOT_URL + 'posts'

const registerUser = async (state, setState, setLoading, navigate) => {
    const { name, password, email, role, bio, graduationYear, department, batch, course, currentJob } = state;


    try {
        const res = await fetch(registerURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, password, email, role, bio, graduationYear, department, batch, course, currentJob }),
        })

        const data = await res.json();
        if (!res.ok) {
            const errorMsg = (data.errors && data.errors[0]?.msg) || data.message || 'Something went wrong';
            throw new Error(errorMsg);
        }

        if (data && data.user) {
            navigate("/login", { replace: true });
        } else {
            throw new Error(data.message || 'Something went wrong');
        }

    } catch (error) {
        console.dir(
            error
        );
        setState((prev) => ({
            ...prev,
            error: error.message
        }))
        return

    } finally {
        setLoading(false);
    }

}

const loginUser = async (state, navigate, setState, setLoading, auth) => {
    setLoading(true);
    const { email, password } = state;
    try {
        const res = await fetch(loginURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (!res.ok) {
            console.log(data,'error');
            
            const errorMsg = (data.errors && data.errors[0]?.msg) || data.message || 'Something went wrong';
            throw new Error(errorMsg);
        }

        if (data && data.user) {
            console.log('login');
            
           console.log(data.user);
           
            auth.login(data)
            navigate("/profile", { replace: true });
        } else {
            throw new Error(data.message || 'Something went wrong');
        }
    } catch (error) {
        console.error(
            error
        );
        setState((prev) => ({
            ...prev,
            error: error.message
        }))
        return

    } finally {
        setLoading(false);
    }
}

export { ROOT_URL, registerUser, loginUser, profileURL ,createPostURL};    
