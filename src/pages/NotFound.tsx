import { Link } from "react-router";

export default function NotFound() {
	return (
		<div className="min-h-screen flex flex-col bg-gray-50 py-12 sm:px-6 lg:px-8">
			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
					<h2 className="text-3xl font-extrabold text-gray-900 mb-4">
					404 - Page Not Found
					</h2>
					<p className="text-gray-600 mb-6">
					The page you are looking for might have been removed, had its name
					changed, or is temporarily unavailable.
					</p>
					<div className="flex flex-col space-y-3">
						<Link
							to="/"
							className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
						>
							메인 페이지
						</Link>
						<Link
							to="/dashboard"
							className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
						>
							이전 페이지
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
