import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../utils/constant';
import { useAuth } from '../utils/auth';

function Login() {
    const [state, setState] = useState({
        email: 'user555@college.edu',
        password: '123456',
        error: ''
    });
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const auth = useAuth();

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setState(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
       
       state.error==="" ? setLoading(true): setLoading(false);
        loginUser(state, navigate, setState,setLoading,auth);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto mt-10 bg-white p-8 rounded shadow flex flex-col gap-4"
        >
            <h2 className="text-3xl font-bold text-center mb-4 text-blue-700">Login</h2>
                  {state.error && <p className="text-red-500 text-center">{state.error}</p>}
            <input
                value={state.email}
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
            <input
                value={state.password}
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
            <button
                type="submit"
                className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
                {loading ? 'Logging in...' : 'Login'}
            </button>
        </form>
    );
}

export default Login;