import { useState } from 'react'

export function Home() {
  const [isAvailable, setIsAvailable] = useState(false)

  return (
    <div className="pb-20">
      {/* Availability Toggle */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-semibold text-gray-900">Availability</h2>
            <p className="text-sm text-gray-500">
              {isAvailable ? 'You are visible to customers' : 'Go online to receive jobs'}
            </p>
          </div>
          <button
            onClick={() => setIsAvailable(!isAvailable)}
            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
              isAvailable ? 'bg-primary-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition-transform ${
                isAvailable ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Available Jobs Section */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Available Jobs Nearby
        </h2>

        {isAvailable ? (
          <div className="space-y-4">
            <JobCard
              customerName="John D."
              service="Full Wash"
              distance="0.8 mi"
              price={45}
              vehicle="2022 Tesla Model 3 - White"
            />
            <JobCard
              customerName="Sarah M."
              service="Basic Wash"
              distance="1.2 mi"
              price={25}
              vehicle="2021 Honda Accord - Blue"
            />
            <JobCard
              customerName="Mike R."
              service="Full Detail"
              distance="2.1 mi"
              price={150}
              vehicle="2023 BMW X5 - Black"
            />
          </div>
        ) : (
          <div className="bg-gray-100 rounded-xl p-8 text-center">
            <svg
              className="w-12 h-12 mx-auto text-gray-400 mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a5 5 0 01-7.072-7.072m0 0L5.636 5.636m2.829 2.829L5.636 5.636"
              />
            </svg>
            <p className="text-gray-500">Go online to see available jobs</p>
          </div>
        )}
      </section>

      {/* Today's Stats */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Today</h2>
        <div className="grid grid-cols-3 gap-4">
          <StatCard label="Jobs" value="3" />
          <StatCard label="Earnings" value="$120" />
          <StatCard label="Rating" value="4.9" />
        </div>
      </section>
    </div>
  )
}

function JobCard({
  customerName,
  service,
  distance,
  price,
  vehicle,
}: {
  customerName: string
  service: string
  distance: string
  price: number
  vehicle: string
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">{customerName}</h3>
          <p className="text-sm text-gray-500">{vehicle}</p>
        </div>
        <span className="text-sm text-gray-500">{distance}</span>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <span className="inline-block px-2 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded">
            {service}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold text-gray-900">${price}</span>
          <button className="px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors">
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  )
}
