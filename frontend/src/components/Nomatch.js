import { useNavigate } from 'react-router-dom';
function NoMatch() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-gray-300 mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
                <p className="text-gray-500 mb-8">The page you're looking for doesn't exist.</p>
                <button 
                    onClick={() => navigate('/')}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                >
                    Go Back to Home
                </button>
            </div>
        </div>
    )
}

export default NoMatch