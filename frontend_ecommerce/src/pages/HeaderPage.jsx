import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Link, Route, Routes} from "react-router-dom";

export default function HeaderPage() {
    const jwtToken = localStorage.getItem("jwtToken");

    const react_icon = "/src/assets/logo.png";
    const location_icon = "/src/assets/location.svg";

    var item_cart = 3;
    var location = "H. Thanh Sơn, X. Yên Sơn, Phú Thọ";
    return (
        <header>
            <nav className="flex justify-between items-center bg-white my-2">
                <div className="text-blue-500">
                    <Link to="/">
                        <img src={react_icon} alt="Logo Icon" className="w-1/2 mb-1"/>
                        <p>Nhiệt tình như người nhà</p>
                    </Link>
                </div>
                <div className="w-1/2">
                    <form action="/search" method="GET">
                        <div className="relative">
                            <div
                                className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input type="search" id="default-search" name="search"
                                   className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="Muốn gì cũng có ?" required/>
                            <button type="button" className="absolute inset-y-0 end-28 flex items-center ps-3 pointer-events-none">
                                <svg className="w-6 h-6 text-gray-500 dark:text-white" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd"
                                          d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z"
                                          clipRule="evenodd"/>
                                </svg>
                            </button>
                            <button type="submit"
                                    className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Tìm kiếm
                            </button>
                        </div>
                    </form>
                    <div>
                        <ul>
                            <li className="flex justify-items-start space-x-2">
                                <Link to="#">điện gia dụng</Link>
                                <Link to="#"
                                      className="hover:text-blue-500 before:content-['|'] before:mb-1 before:me-2 before:text-gray-300">xe
                                    cộ</Link>
                                <Link to="#"
                                      className="hover:text-blue-500 before:content-['|'] before:mb-1 before:me-2 before:text-gray-300">mẹ
                                    và bé</Link>
                                <Link to="#"
                                      className="hover:text-blue-500 before:content-['|'] before:mb-1 before:me-2 before:text-gray-300">khỏe
                                    đẹp</Link>
                                <Link to="#"
                                      className="hover:text-blue-500 before:content-['|'] before:mb-1 before:me-2 before:text-gray-300">nhà
                                    cửa</Link>
                                <Link to="#"
                                      className="hover:text-blue-500 before:content-['|'] before:mb-1 before:me-2 before:text-gray-300">sách</Link>
                                <Link to="#"
                                      className="hover:text-blue-500 before:content-['|'] before:mb-1 before:me-2 before:text-gray-300">thể
                                    thao</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="">
                    <div className="flex mb-2">
                        <Link to="/">
                            <button type="button"
                                    className="text-blue-500 bg-gray-100 hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg className="w-6 h-6 text-blue-500 dark:text-white" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd"
                                          d="M11.3 3.3a1 1 0 0 1 1.4 0l6 6 2 2a1 1 0 0 1-1.4 1.4l-.3-.3V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3c0 .6-.4 1-1 1H7a2 2 0 0 1-2-2v-6.6l-.3.3a1 1 0 0 1-1.4-1.4l2-2 6-6Z"
                                          clipRule="evenodd"/>
                                </svg>
                                Trang chủ
                            </button>
                        </Link>
                        {jwtToken ?
                            <Link to="/account">
                                <button type="button"
                                        className="text-gray-500 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg className="me-1 w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd"
                                              d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm5.5 1a.5.5 0 0 0-1 0 5 5 0 0 0 1.6 3.4 5.5 5.5 0 0 0 7.8 0 5 5 0 0 0 1.6-3.4.5.5 0 0 0-1 0h-.2l-1 .3a18.9 18.9 0 0 1-7.8-.4ZM9 8a1 1 0 0 0 0 2 1 1 0 1 0 0-2Zm6 0a1 1 0 1 0 0 2 1 1 0 1 0 0-2Z"
                                              clipRule="evenodd"/>
                                    </svg>
                                    Tài khoản
                                </button>
                            </Link> :
                            <Link to="/login">
                                <button type="button"
                                        className="text-gray-500 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg className="me-1 w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                              strokeWidth="2"
                                              d="M15 9h0M9 9h0m12 3a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM7 13c0 1 .5 2.4 1.5 3.2a5.5 5.5 0 0 0 7 0c1-.8 1.5-2.2 1.5-3.2 0 0-2 1-5 1s-5-1-5-1Z"/>
                                    </svg>
                                    Đăng nhập
                                </button>
                            </Link>}
                        <Link to="#"
                              className="flex items-center before:content-['|'] before:mb-1 before:me-2 before:text-gray-300">
                            <button type="button"
                                    className="relative text-gray-500 hover:bg-gray-200 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-500 dark:hover:bg-blue-700">
                                {item_cart !== 0 &&
                                    <div className="absolute top-0 right-0">
                                        {item_cart !== 0 &&
                                            <div
                                                className="flex items-center justify-center w-5 h-5 rounded-full bg-red-400 text-xs text-white">
                                                {item_cart}
                                            </div>}
                                    </div>}
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.3L19 7H7.3"/>
                                </svg>
                            </button>
                        </Link>
                    </div>
                    <div className="flex text-sm">
                        <img className="w-5" src={location_icon} alt="Cart Shop"/>
                        <h4 className="title me-2 text-gray-400">Giao đến:</h4>
                        <a className="address hover:text-blue-500"
                           href={'https://www.google.com/maps/search/' + location} target="_blank"
                           rel="noopener noreferrer">{location}</a>
                    </div>
                </div>
            </nav>
        </header>
    );
}