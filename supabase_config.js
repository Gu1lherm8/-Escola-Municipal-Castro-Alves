// Configuração do Supabase para o Portal do Servidor
// Substitua a URL abaixo pela URL do seu projeto Supabase (Ex: https://xyz.supabase.co)
const SUPABASE_URL = "https://mjmoywtwvugihlxsvbuu.supabase.co";

// Esta é a chave pública (anon key) que você enviou
const SUPABASE_ANON_KEY = "sb_publishable_eDczLzY788WNaetl_0PXCA_tom775eZ";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// E-mail da Secretaria onde os avisos de novos cadastros vão chegar
const EMAIL_SECRETARIA = "jfernandes.guilherme.lima@gmail.com";

export { supabase, EMAIL_SECRETARIA };
