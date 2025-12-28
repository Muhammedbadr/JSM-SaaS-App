'use server'

import { auth } from "@clerk/nextjs/server"
import { createSupabaseClient } from "@/lib/supebase"
// import { Columns } from "lucide-react"

export const createCompanion = async (formData: CreateCompanion) => {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }

  const supabase = createSupabaseClient()

  const { data, error } = await supabase
    .from('companions')
    .insert({
      ...formData,
      author_id: userId,
    })
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}


export const getAllCompanions = async ({limit = 10 , page = 1 , subject , topic }: GetAllCompanions) => {
  const supabase = createSupabaseClient()
  
  let query = supabase.from('companions').select('*')

  if (subject && topic) {
    query = query
      .ilike('subject', `%${subject}%`)
      .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
  } else if (subject) {
    query = query.ilike('subject', `%${subject}%`)
  } else if (topic) {
    query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
  }

  query = query.range(
    (page - 1) * limit,
    page * limit - 1
  )

  const { data:  companions , error  } = await query
  if (error) throw new Error(error.message)
  
  return companions
}



export const getCompanionById = async (id: string) => {
  const supabase = createSupabaseClient()
  const { data: companion, error } = await supabase
    .from('companions')
    .select('*')
    .eq('id', id)
    .single()
  if (error) return console.log(error)
    //  throw new Error(error.message)  
  return companion
} 


export const addToSessionHistory = async (companionId: string) => {
    const { userId } = await auth();
    const supabase = createSupabaseClient();
    const { data, error } = await supabase.from('session_history')
        .insert({
            companion_id: companionId,
            user_id: userId,
        })

    if(error) throw new Error(error.message);

    return data;
}

export const getRecentSessions = async (limit = 10) => {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
        .from('session_history')
        .select(`companions:companion_id (*)`)
        .order('created_at', { ascending: false })
        .limit(limit)

    if(error) throw new Error(error.message);

    return data.map(({ companions }) => companions);
}