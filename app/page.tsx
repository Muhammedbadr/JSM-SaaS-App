import CompanionCard from '@/components/CompanionCard'
import CompanionList from '@/components/CompanionList'
import CTA from '@/components/CTA'
import { Button } from '@/components/ui/button'
import { recentSessions } from '@/constants'
import React from 'react'


const Page = () => {
  return (
    <main className='mb-24'>
      <h1 >
        Populer Companions 
      </h1>
      {/* CompanionCards */}
      <section className='home-section'>
        <CompanionCard
        id="1"
        name="Neura the Brainy Explorer"
        topic="Neural Network of the Brain"
        subject="science"
        duration={45}
        color="#ffda6e"
        />
        <CompanionCard
        id="2"
        name="Countsy the Number Wizard"
        topic="Derivatives & Integrals"
        subject="Meths"
        duration={30}
        color="#e5d0ff"
        />
        <CompanionCard
        id="3"
        name="Verba the Vocabulary Builder"
        topic=" English Literature "
        subject="science"
        duration={30}
        color="#BDE7FF"
        />
      </section>
      {/* CompanionList */}
      {/* CTA */}
      <section className='home-section'>
        <CompanionList
          title="Recently completed lessons"
          companions={recentSessions}
          classNames="w-2/3 max-lg:w-full"
        />
        <CTA/>
      </section>
    </main>
  )
}

export default Page