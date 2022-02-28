import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import styles from '@/styles/Event.module.css'
import Link from 'next/link'
import Image from 'next/image'
import CheckImage from 'common'

export default function EventPage({ evt }) {

  const deleteEvent = (e) => {
    console.log('delete')
  }

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a> <FaPencilAlt /> Edit Event</a>
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>
        <span>
          {new Date(evt.date).toLocaleDateString('en-US')} at {evt.time}
        </span>
        <h1>{evt.name}</h1>
        {evt.image && (
          <div className={styles.image}>
            <Image src={CheckImage(evt)} width={960} height={600} />
          </div>
        )}
        <h3>Performers:</h3>
        <p>{evt.performers}</p>
        <h3>Description:</h3>
        <p>{evt.descriptipn}</p>
        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>

          <Link href='/events'>
            <a className={styles.back}> 
              {'<'}Go Back
            </a>
          </Link>

      </div>
    </Layout>
  )
}

export async function getStaticPaths() {

  const res = await fetch(`${API_URL}/api/events?&populate=*`)
  const rawEvents = await res.json()
  const events = rawEvents.data.map(item => ({...item.attributes, id: item.id})) 

  const paths = events.map(evt => ({
    params: { slug: evt.slug }
  }))

  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({ params: { slug } }) {

  const res = await fetch(`${API_URL}/api/events?filters[slug][$eq]=${slug}&populate=*`)
  const rawEvents = await res.json()
  
  const events = rawEvents.data.map(item => ({...item.attributes, id: item.id})) 

  return {
    props: {
      evt: events[0]
    },
    revalidate: 1
  }
}

// export async function getServerSideProps() {
//   const res = await fetch(`${API_URL}/api/events?_sort=date:ASC&_limit=3&populate=*`)
//   const rawEvents = await res.json()
//   const events = rawEvents.data.map(item => ({...item.attributes, id: item.id})) 
//   console.log(events[0].image.data)
//   return {
//     props: { events: events, revalidate: 1},
//   }

// }