import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fzuniuemimgzgmixjocb.supabase.co'
const supabaseKey = 'sb_publishable_MOmKhzMQEA7_NgDG0Cv4JA_0VwgjTHu'

export const supabase = createClient(supabaseUrl, supabaseKey)