import { useQuery, gql } from '@apollo/client'
import { useState } from 'react'

const NEARBY_WASHERS = gql`
  query NearbyWashers($location: CoordinatesInput!, $radiusKm: Float!) {
    nearbyWashers(location: $location, radiusKm: $radiusKm) {
      id
      name
      rating
      isAvailable
    }
  }
`

const services = [
  {
    id: 'basic',
    title: 'Basic Wash',
    description: 'Exterior wash and hand dry',
    price: 25,
    duration: '30 min',
    icon: 'droplet',
    popular: false,
  },
  {
    id: 'full',
    title: 'Full Wash',
    description: 'Exterior + interior vacuum & wipe',
    price: 45,
    duration: '45 min',
    icon: 'sparkles',
    popular: true,
  },
  {
    id: 'interior',
    title: 'Interior Detail',
    description: 'Deep clean, leather care, sanitize',
    price: 75,
    duration: '1.5 hrs',
    icon: 'seat',
    popular: false,
  },
  {
    id: 'exterior',
    title: 'Exterior Detail',
    description: 'Clay bar, polish, and wax',
    price: 85,
    duration: '2 hrs',
    icon: 'shine',
    popular: false,
  },
  {
    id: 'premium',
    title: 'Premium Detail',
    description: 'Complete interior & exterior treatment',
    price: 150,
    duration: '3 hrs',
    icon: 'crown',
    popular: false,
  },
]

export function Home() {
  const [selectedService, setSelectedService] = useState<string | null>(null)

  const { data, loading } = useQuery(NEARBY_WASHERS, {
    variables: {
      location: { latitude: 37.7749, longitude: -122.4194 },
      radiusKm: 10,
    },
  })

  const washerCount = data?.nearbyWashers?.length || 0

  return (
    <div className="py-6 space-y-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-6 text-white">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-400/20 rounded-full blur-xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur rounded-full text-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>
                {loading ? 'Finding washers...' : `${washerCount} washers nearby`}
              </span>
            </div>
          </div>

          <h1 className="text-2xl font-bold mb-2">
            Get your car sparkling clean
          </h1>
          <p className="text-blue-100 text-sm mb-5">
            Professional car wash at your doorstep. Book in seconds.
          </p>

          <button
            type="button"
            className="w-full py-3.5 bg-white text-blue-700 font-semibold rounded-2xl shadow-lg shadow-blue-900/30 active:scale-[0.98] transition-transform"
          >
            Book Now
          </button>
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <div className="grid grid-cols-4 gap-3">
          <QuickAction icon="location" label="My Location" />
          <QuickAction icon="clock" label="Schedule" />
          <QuickAction icon="car" label="My Cars" />
          <QuickAction icon="card" label="Payment" />
        </div>
      </section>

      {/* Services Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Our Services</h2>
          <button type="button" className="text-sm text-blue-600 dark:text-blue-400 font-medium">
            View all
          </button>
        </div>

        <div className="space-y-3">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              selected={selectedService === service.id}
              onSelect={() => setSelectedService(service.id)}
            />
          ))}
        </div>
      </section>

      {/* CTA Button - Fixed at bottom when service selected */}
      {selectedService && (
        <div className="fixed bottom-24 left-0 right-0 px-5 z-40">
          <div className="max-w-lg mx-auto">
            <button
              type="button"
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-2xl shadow-xl shadow-blue-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>Continue</span>
              <span className="text-blue-200">
                ${services.find(s => s.id === selectedService)?.price}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function QuickAction({ icon, label }: { icon: string; label: string }) {
  return (
    <button
      type="button"
      className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md hover:border-gray-200 dark:hover:border-slate-600 active:scale-95 transition-all"
    >
      <div className="w-6 h-6 text-gray-600 dark:text-gray-400">
        <QuickActionIcon name={icon} />
      </div>
      <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">{label}</span>
    </button>
  )
}

function QuickActionIcon({ name }: { name: string }) {
  switch (name) {
    case 'location':
      return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      )
    case 'clock':
      return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    case 'car':
      return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
        </svg>
      )
    case 'card':
      return (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
        </svg>
      )
    default:
      return null
  }
}

function ServiceCard({
  service,
  selected,
  onSelect,
}: {
  service: typeof services[0]
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full p-4 rounded-2xl text-left transition-all duration-300 ${
        selected
          ? 'bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-500 shadow-lg shadow-blue-500/10'
          : 'bg-white dark:bg-slate-800 border-2 border-transparent shadow-sm hover:shadow-md'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
          selected
            ? 'bg-blue-100 dark:bg-blue-800/50 text-blue-600 dark:text-blue-400'
            : 'bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-400'
        }`}>
          <ServiceIcon name={service.icon} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900 dark:text-white">{service.title}</h3>
            {service.popular && (
              <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 text-[10px] font-bold rounded-full uppercase">
                Popular
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{service.description}</p>
          <div className="flex items-center gap-1 text-sm text-gray-400 dark:text-gray-500">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{service.duration}</span>
          </div>
        </div>

        <div className="text-right">
          <p className="text-xl font-bold text-gray-900 dark:text-white">${service.price}</p>
          <div className={`w-6 h-6 mt-2 rounded-full border-2 flex items-center justify-center ml-auto transition-all ${
            selected
              ? 'bg-blue-600 border-blue-600'
              : 'border-gray-300 dark:border-slate-600'
          }`}>
            {selected && (
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
        </div>
      </div>
    </button>
  )
}

function ServiceIcon({ name }: { name: string }) {
  const className = "w-6 h-6"

  switch (name) {
    case 'droplet':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 009-9c0-4.97-9-12-9-12S3 7.03 3 12a9 9 0 009 9z" />
        </svg>
      )
    case 'sparkles':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
        </svg>
      )
    case 'seat':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 20v-2a4 4 0 014-4h0a4 4 0 014 4v2M6 20h8M8 10V6a2 2 0 012-2h0a2 2 0 012 2v4M8 10h4M8 10a2 2 0 01-2 2M12 10a2 2 0 002 2" />
        </svg>
      )
    case 'shine':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
      )
    case 'crown':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 19h16M4 15l3-9 5 4 5-4 3 9H4z" />
        </svg>
      )
    default:
      return null
  }
}
