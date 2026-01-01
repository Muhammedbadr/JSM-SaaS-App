import CompanionCard from '@/components/CompanionCard'
import CompanionList from '@/components/CompanionList'
import CTA from '@/components/CTA'
import { Button } from '@/components/ui/button'
import { recentSessions } from '@/constants'
import { getAllCompanions, getRecentSessions  } from '@/lib/actions/companion.actions'
import { getSubjectColor } from '@/lib/utils'
export const dynamic = "force-dynamic"



const Page = async () => {
  const companions = await getAllCompanions({ limit: 3 })
  const recentSessionsCompanions = await getRecentSessions(10)


  return (
    <main className='mb-24'>
      <h1 >
        Populer Companions 
      </h1>
      {/* CompanionCards */}
      <section className='home-section'>
        {companions.map((companion) => (
           <CompanionCard
            key={companion.id}
            {...companion}
            color={getSubjectColor(companion.subject)}
        />
        ))}
       
        
      </section>
      {/* CompanionList */}
      {/* CTA */}
      <section className='home-section'>
        <CompanionList
          title="Recently completed lessons"
          companions={recentSessionsCompanions}
          classNames="w-2/3 max-lg:w-full"
        />

        <CTA/>
      </section>
    </main>
  )
}

export default Page