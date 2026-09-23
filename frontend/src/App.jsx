import React from 'react'
import PayForm from './components/PayForm'

export default function App(){
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow">
        <h1 className="text-2xl font-bold mb-4">PayNaija — Demo</h1>
        <PayForm />
      </div>
    </div>
  )
}
