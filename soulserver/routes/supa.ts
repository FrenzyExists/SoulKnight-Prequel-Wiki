import { createClient } from "@supabase/supabase-js";

const URL: string = 'https://riolyfugtjqctxkrdqjm.supabase.co';
const API_KEY: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpb2x5ZnVndGpxY3R4a3JkcWptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY1NzcyOTgsImV4cCI6MjA0MjE1MzI5OH0.QzIHIzf2Ygq3BssRv37X-AWDuA8KmlCghm1duEe1_1w'
export const supabase = createClient(URL, API_KEY);