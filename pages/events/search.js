import qs from 'qs'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import { API_URL } from '@/config/index'

export default function SearchPage({ events }) {
    const router = useRouter()
    return (
        <Layout title='Search Results'>
            <Link href='/events'>Go back</Link>
            <h1>Seach Results for {router.query.term}</h1>
            {events.length === 0 && <h3>No events to show</h3>}


            {events.map(evt => (
                <EventItem key={evt.id} evt={evt} />
            ))}

        </Layout>
    )
}

// export async function getServerSideProps({query:{term}}) {
//     const res = await fetch(`${API_URL}/api/events?filters[name][$contains]=Manny`)
//     const rawEvents = await res.json()
//     const events = rawEvents.data.map(item => ({...item.attributes, id: item.id})) 

//     return {
//       props: { events: events, revalidate: 1},
//     }

//   }

export async function getServerSideProps({ query: { term } }) {

    // const query = qs.stringify({
    //     _where: {
    //         _or: [
    //             { name_contains: term },
    //             { venue_contains: term },
    //             { description_contains: term },
    //             { performers_contains: term }
    //         ]
    //     }
    // })

    const query = qs.stringify({
        filters: {
            $or: [
                {
                    name:
                        { $contains: term }
                },
                {
                    venue:
                        { $contains: term }
                },
                {
                    performers:
                        { $contains: term }
                },
                {
                    description:
                        { $contains: term }
                }]
        }
    },
        {
            encodeValuesOnly: true,
        })

    const res = await fetch(`${API_URL}/api/events?${query}&populate=*`)
    const rawEvents = await res.json()
    const events = rawEvents.data.map(item => ({ ...item.attributes, id: item.id }))

    return {
        props: { events: events, revalidate: 1 },
    }

}