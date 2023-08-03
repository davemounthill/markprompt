import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';
import type { NextApiRequest, NextApiResponse } from 'next';

import { Database } from '@/types/supabase';
import { DbFileWithoutContent, Project } from '@/types/types';

type Data =
  | {
      status?: string;
      error?: string;
    }
  | DbFileWithoutContent[];

const allowedMethods = ['GET', 'DELETE'];

// Admin access to Supabase, bypassing RLS.
const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || '',
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (!req.method || !allowedMethods.includes(req.method)) {
    res.setHeader('Allow', allowedMethods);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const supabase = createServerSupabaseClient<Database>({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const projectId = req.query.id as Project['id'];

  if (req.method === 'GET') {
    // Note: if a column is a reference to another table, e.g.
    // project_id, and the value is null, somehow the following
    // join with filter does not include these rows. This looks
    // like a bug in Supabase.
    const { data: files, error } = await supabase
      .from('files')
      .select(
        'id,path,meta,project_id,updated_at,source_id,checksum,token_count, sources!inner (project_id)',
      )
      .eq('sources.project_id', projectId);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    if (!files) {
      return res.status(404).json({ error: 'No files found' });
    }

    // Matierialized views turn columns into `col_type | null` types
    // instead of the actual `col_type` type, so we type cast here
    // to stay with the actual types.
    return res.status(200).json(files);
  } else if (req.method === 'DELETE') {
    const ids = req.body;
    if (!ids) {
      return res.status(400).json({
        error: 'Invalid request. Please provide a list of ids to delete.',
      });
    }

    const { error } = await supabase
      .from('files')
      .delete()
      .in('id', ids)
      .select('path');

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ status: 'ok' });
  }

  return res.status(400).end();
}
