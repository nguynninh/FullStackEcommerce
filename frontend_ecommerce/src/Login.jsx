import {useState} from "react";
import axios from "axios";

export default function Login() {
    // ==== UX ====
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            email,
            password
        };

        try {
            const response
                = await axios.post("http://localhost:8081/authenticate", data);

            if (response.status === 200)
                localStorage.setItem("jwtToken", response.data);
            else
                console.error("Authentication failed");
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // ==== UI ====
    const [passwordVisible, setPasswordVisible] = useState(true);

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <div className="relative mb-6">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                    <path
                                        d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                                    <path
                                        d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                                </svg>
                            </div>
                            <input value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   type="text"
                                   id="email"
                                   name="email"
                                   autoComplete="email"
                                   alt="Input Email"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="your_email@maill.com"
                                   required/>
                        </div>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                        <div className="relative mb-6">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                                <svg className="w-6 h-6 text-gray-500 dark:text-white" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd"
                                          d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7c0-1.1.9-2 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6c.6 0 1 .4 1 1v3a1 1 0 1 1-2 0v-3c0-.6.4-1 1-1Z"
                                          clipRule="evenodd"/>
                                </svg>
                            </div>
                            <input value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                                   type={passwordVisible ? "password" : "text"}
                                   id="password"
                                   name="password"
                                   autoComplete="current-password"
                                   alt="Input Password"
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="Your password"
                                   required/>
                            {passwordVisible ?
                                (<div onClick={() => setPasswordVisible(!passwordVisible)}
                                      className="absolute inset-y-0 right-0 flex items-center pr-3.5 cursor-pointer">
                                    <svg className="w-6 h-6 text-gray-500 dark:text-white" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"
                                         onClick={() => setPasswordVisible(!passwordVisible)}>
                                        <path fillRule="evenodd"
                                              d="M5 7.8C6.7 6.3 9.2 5 12 5s5.3 1.3 7 2.8a12.7 12.7 0 0 1 2.7 3.2c.2.2.3.6.3 1s-.1.8-.3 1a2 2 0 0 1-.6 1 12.7 12.7 0 0 1-9.1 5c-2.8 0-5.3-1.3-7-2.8A12.7 12.7 0 0 1 2.3 13c-.2-.2-.3-.6-.3-1s.1-.8.3-1c.1-.4.3-.7.6-1 .5-.7 1.2-1.5 2.1-2.2Zm7 7.2a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                                              clipRule="evenodd"/>
                                    </svg>
                                </div>) :
                                (<div onClick={() => setPasswordVisible(!passwordVisible)}
                                      className="absolute inset-y-0 right-0 flex items-center pr-3.5 cursor-pointer">
                                    <svg className="w-6 h-6 text-gray-500 dark:text-white" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="m4 15.6 3-3V12a5 5 0 0 1 5-5h.5l1.8-1.7A9 9 0 0 0 12 5C6.6 5 2 10.3 2 12c.3 1.4 1 2.7 2 3.6Z"/>
                                        <path
                                            d="m14.7 10.7 5-5a1 1 0 1 0-1.4-1.4l-5 5A3 3 0 0 0 9 12.7l.2.6-5 5a1 1 0 1 0 1.4 1.4l5-5 .6.2a3 3 0 0 0 3.6-3.6 3 3 0 0 0-.2-.6Z"/>
                                        <path
                                            d="M19.8 8.6 17 11.5a5 5 0 0 1-5.6 5.5l-1.7 1.8 2.3.2c6.5 0 10-5.2 10-7 0-1.2-1.6-2.9-2.2-3.4Z"/>
                                    </svg>
                                </div>)}
                        </div>
                    </div>
                    <div className="flex justify-between mb-6">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="remember"
                                       type="checkbox"
                                       className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"/>
                            </div>
                            <label htmlFor="remember"
                                   className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Lưu tài
                                khoản </label>
                        </div>
                        <div>
                            <a href="/forgot-password" className="text-blue-600 hover:underline dark:text-blue-500">Quên
                                mật khẩu</a>
                        </div>
                    </div>
                    <div className="flex justify-center mb-6">
                        <button type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Đăng nhập
                        </button>
                    </div>
                </form>
            </div>
            <div>
                <div className="flex justify-center items-center mb-6">
                    <span className="w-24 border-b border-gray-300 dark:border-white"></span>
                    <span className="mx-2 text-sm font-medium text-gray-900 dark:text-white">Hoặc</span>
                    <span className="w-24 border-b border-gray-300 dark:border-white"></span>
                </div>

                <div className="flex justify-center space-x-5">
                    <button type="button"
                            className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2">
                        <svg className="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd"
                                  d="M13.1 6H15V3h-1.9A4.1 4.1 0 0 0 9 7.1V9H7v3h2v10h3V12h2l.6-3H12V6.6a.6.6 0 0 1 .6-.6h.5Z"
                                  clipRule="evenodd"/>
                        </svg>
                        Đăng nhập với Facebook
                    </button>
                    <button type="button"
                            className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2">
                        <svg className="nz sb me-2" aria-hidden="true" viewBox="0 0 24 24" width="18" height="18">
                            <path
                                d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                                fill="#EA4335"></path>
                            <path
                                d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                                fill="#4285F4"></path>
                            <path
                                d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                                fill="#FBBC05"></path>
                            <path
                                d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                                fill="#34A853"></path>
                        </svg>
                        Đăng nhập với Google
                    </button>
                </div>
            </div>
        </div>
    );
}