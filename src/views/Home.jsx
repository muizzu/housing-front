import {
  MagnifyingGlassIcon,
  ArrowDownIcon
} from '@heroicons/react/20/solid';
import jwt_decode from "jwt-decode";
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import { format,parseISO } from 'date-fns'






export default function Home() {
  let navigate = useNavigate();
  const [idCardNo, setIdCardNo] = useState("");
  const [error, setError] = useState(null);
  const [employments, setEmployments] = useState([])

  React.useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      try {
        navigate("/login");
      } catch (error) {
        console.log(`🚀 ~ signIn error`, error);
      }
    } else {
      var decoded = jwt_decode(token);
      if (Date.now() >= decoded.exp * 1000) {
        try {
          navigate("/login");
        } catch (error) {
          console.log(`🚀 ~ signIn error`, error);
        }
      }
    }
  }, [])

  const onClickSearch = async (e) => {
    e.preventDefault();
    setError("");
    const token = localStorage.getItem("token");
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const response = await fetch(`https://housing-api.stag.mpao.mv/employments/${idCardNo}/10`, options);
    console.log(response.status);
    if (response.ok) {
      const result = await response.json();
      setEmployments(result);
    } else {
      if (response.status === 401) {
        try {
          navigate("/login");
        } catch (error) {
          console.log(`🚀 ~error`, error);
        }
      } else {
        const result = await response.json();
        setError(`Error! status: ${response.status} message: ${result.message} `);
      }
    }
  };

  const onClickLogOut = async (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    try {
      navigate("/login");
    } catch (error) {
      console.log(`🚀 ~error`, error);
    }
  };

  return (
    <>
      <div className="min-h-full p-2 sm:p-12 overflow-scroll">
        <div className="flex flex-col">
          <main className="flex-1">
            <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
              <div className="min-w-0 flex-1">
                <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">Employments</h1>
                <p className="mt-2 text-sm text-gray-700">
                  A list of all employments for the individual including their name, employer, start and end date.
                </p>
              </div>
              <div className="mt-4 flex sm:mt-0 sm:ml-4">
                <button
                  type="button"
                  onClick={(e) => {
                    onClickLogOut(e);
                  }}
                  className="sm:order-0 order-1 ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:ml-0"
                >
                  Log out
                </button>

              </div>
            </div>


            {/* Employment Search */}
            <div className="my-4">
              <div className="px-4 sm:px-6 sm:w-1/2 py-2">

                <form className="mt-6 flex space-x-4">
                  <div className="min-w-0 flex-1">
                    <label htmlFor="search" className="sr-only">
                      Search
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                      <input
                        type="search"
                        name="search"
                        id="search"
                        onChange={(e) => {
                          e.preventDefault();
                          setIdCardNo(e.target.value);
                        }}
                        className="block w-full rounded-md border-gray-300 pl-10 focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                        placeholder="Search"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    onClick={(e) => {
                      onClickSearch(e);
                    }}
                    className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                  >
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    <span className="sr-only">Search</span>
                  </button>

                  {employments.length !== 0 ? <CSVLink data={employments} className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                    filename={"employments.csv"}>
                    <ArrowDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    <span className="sr-only">Search</span>

                  </CSVLink> : <div></div>}
                </form>
              </div>


            </div>

            {/* Error Message */}
            <div>
              <p className="mt-2 px-6 text-sm text-gray-700">
                {error}
              </p>
            </div>

            {/* Employments table (small breakpoint and up) */}
            <div className="mt-8 py-2 px-4 flex flex-col">
              <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                            id
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Full Name
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Employer Name
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Start Date
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            End Date
                          </th>

                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {employments?.map((person) => (
                          <tr key={person.id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              {person.id}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.member_name}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.employer_name}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{format(parseISO(person.start_date), 'dd-MM-yyyy')}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{format(parseISO(person.end_date), 'dd-MM-yyyy')}</td>

                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

          </main>
        </div>
      </div>
    </>
  )
}
