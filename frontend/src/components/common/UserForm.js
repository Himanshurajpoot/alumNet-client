import React from 'react';

function UserForm({ state, setState, loading, onSubmit, years, departments, isEdit = false }) {
    const handleChange = ({ target }) => {
        const { name, value } = target;
        setState((prevState) => ({ ...prevState, [name]: value }));
    };

    return (
        <form
            onSubmit={onSubmit}
            className="w-full max-w-4xl bg-white/80 backdrop-blur-lg p-6 md:p-8 rounded-2xl shadow-2xl flex flex-col gap-6 border border-blue-100"
        >
            <h2 className="text-2xl md:text-3xl font-bold text-blue-700 text-center mb-2">
                {isEdit ? "Edit Profile" : "Register"}
            </h2>
            {state?.error && <p className="text-red-500 text-center">{state.error}</p>}
            
            {/* Basic Information Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="font-medium text-gray-700">Name</label>
                    <input
                        value={state.name}
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Name"
                        onChange={handleChange}
                        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150 hover:border-blue-400"
                        required
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="font-medium text-gray-700">Email</label>
                    <input
                        value={state.email}
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        onChange={handleChange}
                        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150 hover:border-blue-400"
                        required
                        disabled={isEdit}
                    />
                </div>
            </div>

            {/* Password Row (only for registration) */}
            {!isEdit && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="font-medium text-gray-700">Password</label>
                        <input
                            value={state.password}
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            onChange={handleChange}
                            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150 hover:border-blue-400"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor='role' className="font-medium text-gray-700">Role</label>
                        <select
                            id='role'
                            name='role'
                            value={state.role}
                            onChange={handleChange}
                            disabled={isEdit}
                            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150 hover:border-blue-400"
                        >
                            <option value={"alumni"}>Alumni (ex student)</option>
                            <option value={"student"}>Student</option>
                        </select>
                    </div>
                </div>
            )}

            {/* Role Row (only for edit mode) */}
            {isEdit && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor='role' className="font-medium text-gray-700">Role</label>
                        <select
                            id='role'
                            name='role'
                            value={state.role}
                            onChange={handleChange}
                            disabled={isEdit}
                            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150 hover:border-blue-400"
                        >
                            <option value={"alumni"}>Alumni (ex student)</option>
                            <option value={"student"}>Student</option>
                        </select>
                    </div>
                    <div></div>
                </div>
            )}

            {/* Academic Information Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor='gyear' className="font-medium text-gray-700">Graduation Year</label>
                    <select
                        id='gyear'
                        name='graduationYear'
                        value={state.graduationYear}
                        onChange={handleChange}
                        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150 hover:border-blue-400"
                    >
                        <option value={""} disabled>Select year</option>
                        {years.map((year) => <option key={year} value={year}>{year}</option>)}
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor='department' className="font-medium text-gray-700">Department</label>
                    <select
                        id='department'
                        name='department'
                        value={state.department}
                        onChange={handleChange}
                        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150 hover:border-blue-400"
                    >
                        <option value={""} disabled>Select department</option>
                        {departments.map((department) => <option key={department} value={department}>{department}</option>)}
                    </select>
                </div>
            </div>
            {state.role === "alumni" && (
                <div className="mt-6 p-4 md:p-6 rounded-xl border-2 border-blue-500 bg-blue-50 shadow-inner">
                    <h3 className="text-lg md:text-xl font-semibold text-blue-700 mb-4 text-center">Alumni Profile</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor='batch' className="font-medium text-blue-700">Batch</label>
                            <select
                                id='batch'
                                name='batch'
                                value={state.batch}
                                onChange={handleChange}
                                className="border border-blue-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150 hover:border-blue-600 bg-white"
                            >
                                <option value={""} disabled>Select year</option>
                                {years.map((year) => <option key={year} value={year}>{year}</option>)}
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="course" className="font-medium text-blue-700">Course</label>
                            <input
                                value={state.course}
                                type="text"
                                name="course"
                                id="course"
                                placeholder="Course"
                                onChange={handleChange}
                                className="border border-blue-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150 hover:border-blue-600 bg-white"
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="currentJob" className="font-medium text-blue-700">Current Job</label>
                            <input
                                value={state.currentJob}
                                type="text"
                                name="currentJob"
                                id="currentJob"
                                placeholder="Current Job"
                                onChange={handleChange}
                                className="border border-blue-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150 hover:border-blue-600 bg-white"
                            />
                        </div>
                    </div>
                </div>
            )}
            <button
                type="submit"
                className="bg-blue-600 text-white py-2 rounded shadow-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50 mt-4"
                disabled={loading}
            >
                {loading ? (isEdit ? "Saving..." : "Registering...") : (isEdit ? "Save" : "Register")}
            </button>
        </form>
    );
}

export default UserForm;