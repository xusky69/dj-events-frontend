import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import { API_URL } from '@/config/index'

export default function EventsPage({ events }) {
  console.log(events)
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}


      {events.map(evt => (
        <EventItem key={evt.id} evt={evt} />
      ))}

    </Layout>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/api/events?_sort=date:ASC&populate=*`)
  const rawEvents = await res.json()
  const events = rawEvents.data.map(item => ({...item.attributes, id: item.id})) 
  
  return {
    props: { events: events, revalidate: 1},
  }

}