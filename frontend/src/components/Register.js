import { useState } from 'react';
import { registerUser } from '../utils/constant';
import { useNavigate } from 'react-router-dom';
import UserForm from './common/UserForm';

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

    const departments = [
        "Department of Basic Sciences",
        "Department of Agriculture",
        "Department of Civil Engineering",
        "Department of Electrical, Electronics & Communication Engineering",
        "Department of Mechanical Engineering",
        "Department of Computer Science & Engineering",
        "Department of Computer Applications & Technology",
        "Department of Artificial Intelligence",
        "Department of Defence Technology",
        "Department of Design",
        "Department of Finance & Commerce",
        "Department of Hospitality & Toursim",
        "Department of legal Studies",
        "Department of Mass Communication",
        "Department of Humanities",
        "Department of Languages",
        "Department of Pharmacy",
        "Department of Allied Health Sciences",
        "Department of Nursing",
        "Department of Education",
        "Department of Biotechnology & Bioengineering",
        "Department of Life Sciences",
        "Department of Food Technology",
        "Department of Biomedical Sciences",
        "Department of Forensic Sciences",
        "Department of Management",
        "Department of Aviation, Logistics & Tourism Management",
        "Department of Finance and Commerce",
        "Department of Vocational Education"
    ];




    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        registerUser(state, setState, setLoading, navigate);
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-white to-blue-400">
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