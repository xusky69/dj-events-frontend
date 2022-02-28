import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import { API_URL } from '@/config/index'
import Link from 'next/link'

export default function HomePage({ events }) {
  console.log(events)
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}


      {events.map(evt => (
        <EventItem key={evt.id} evt={evt} />
      ))}

    {events.length > 0 && (
      <Link href='/events'>
        <a className='btn-secondary'>View All Events</a>
      </Link>
    )}
    </Layout>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/api/events?_sort=date:ASC&_limit=3&populate=*`)
  const rawEvents = await res.json()
  const events = rawEvents.data.map(item => ({...item.attributes, id: item.id})) 

  return {
    props: { events: events, revalidate: 1},
  }

}