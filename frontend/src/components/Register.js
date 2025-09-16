import { useState } from 'react';
import { registerUser } from '../utils/constant';
import { useNavigate } from 'react-router-dom';
import UserForm from './common/UserForm';
import departmentsData from '../data/departments.json';

function Register() {
    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
        role: 'student',
        graduationYear: '',
        department: '',
        verified: true,
        isActive: true,
        avatarUrl: "https://imgs.search.brave.com/UCLK8e9kMkUTSrc6JLNm-VdkEQueaJlzm0XZe3mbDdU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9h/bmRyb2d5bm91cy1h/dmF0YXItbm9uLWJp/bmFyeS1xdWVlci1w/ZXJzb25fMjMtMjE1/MTEwMDIyMS5qcGc_/c2VtdD1haXNfaHli/cmlkJnc9NzQwJnE9/ODA",
        batch: '',
        course: '',
        currentJob: '',
        error: ''
    });
    const [loading, setLoading] = useState(false);

    const currentyear = new Date().getFullYear();
    const years = [];
    for (let i = 1990; i <= currentyear; i++) {
        years.push(i);
    }

    const departments = departmentsData.departments;




    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        registerUser(state, setState, setLoading, navigate);
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-white to-blue-400 p-4">
            <UserForm
                state={state}
                setState={setState}
                loading={loading}
                onSubmit={handleRegister}
                years={years}
                departments={departments}
                isEdit={false}
            />
        </div>
    );

}


export default Register;