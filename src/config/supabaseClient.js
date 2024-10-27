import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mikikrgdulllacswawkp.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)