import axios from 'axios';
import React, { useState } from 'react';
import { emplyeRegistration } from '../../constants';

export const Register = () => {
    const [form, setForm] = useState({
        name: '',
        password: '',
        confirmPassword: '',
        employeeId: '',
        state: '',
        language: '',
        grade: '',
        teamName: ''
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
          ...form,
          [name]: value
        });
      };
    
      const handleSubmit =async (e) => {


        e.preventDefault();
        if (form.password !== form.confirmPassword) {
          console.log("passwords do not match")
          return;
        }


        try {
          
          const res = await axios.post(`${emplyeRegistration}`, form)

          console.log('registered user', res)
          
        } catch (error) {
          
          console.log("an error occured during regstering a user" ,error)
        }
       
        // console.log('Form submitted', form);
      };
    
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
          <div className="w-full max-w-md m-10">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <h2 className="text-2xl font-bold mb-4">Register</h2>
              {[
                { label: 'Name', name: 'name', type: 'text' },
                { label: 'Password', name: 'password', type: 'password' },
                { label: 'Confirm Password', name: 'confirmPassword', type: 'password' },
                { label: 'Employee Id', name: 'employeeId', type: 'text' },
                { label: 'State', name: 'state', type: 'text' },
                { label: 'Language', name: 'language', type: 'text' },
                { label: 'Grade', name: 'grade', type: 'text' },
                { label: 'Team Name', name: 'teamName', type: 'text' },
              ].map((field, index) => (
                <div className="mb-4" key={index}>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field.name}>
                    {field.label}
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id={field.name}
                    type={field.type}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      );
}
