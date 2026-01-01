import CompanionList from "@/components/CompanionList";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { getUserCommpanions, getUserSessions } from "@/lib/actions/companion.actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation"

import Image from "next/image";

const profile = async () => {
  const user  = await currentUser();

  if (!user) redirect('/sign-in');

  const companions = await getUserCommpanions(user.id);
  const sessionHistroy = await getUserSessions(user.id);


  return (
    <main className="min-lg:w-3/4">
      <section className="flex justfy-between gap-4 max-sm:flex-col items-center ">
        <div className="flex gap-4 items-center" > 
          <Image src={user.imageUrl} alt={user.firstName!} width={110} height={110 } />
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-2xl ">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-sm text-muted-foreground">
              {user.emailAddresses[0]?.emailAddress}
            </p>
          </div>
        </div>
        <div className="flex gap-4 ">
          <div className="border border-black rounded-lg p-2 gap-2 flex flex-col h-fit text-center">
            <div className="flex gap-2 items-center ">
              <Image src='/icons/check.svg' alt="checkmark" width={22} height={22}/>
              <p className="text-2xl font-bold">{sessionHistroy.length}</p>
            </div>
            <div>Lessons comleted</div>
          </div>
        </div>
        <div className="flex gap-4 ">
          <div className="border border-black rounded-lg p-2 gap-2 flex flex-col h-fit text-center">
            <div className="flex gap-2 items-center ">
              <Image src='/icons/cap.svg' alt="cap" width={22} height={22}/>
              <p className="text-2xl font-bold">{companions.length}</p>
            </div>
            <div>Companions Created</div>
          </div>
        </div>
      </section>

        <Accordion type="multiple" >
          <AccordionItem value="recent">
            <AccordionTrigger className="text-2xl font-bold">Recent Sessions</AccordionTrigger>
            <AccordionContent>
              <CompanionList title="Recent sessions" companions={sessionHistroy} />
            </AccordionContent>
          </AccordionItem>
              <AccordionItem value="companions">
                  <AccordionTrigger className="text-2xl font-bold">My companions {`(${companions.length})`} 

                  </AccordionTrigger>
                      <AccordionContent>
                        <CompanionList title="My companions" companions={companions} />
                      </AccordionContent>
              </AccordionItem>
        </Accordion>
    </main>
  )
}

export default profile