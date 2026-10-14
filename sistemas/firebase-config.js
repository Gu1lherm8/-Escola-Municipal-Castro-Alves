// Configuração Oficial e Centralizada do Firebase - Escola Municipal Castro Alves
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc 
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAqMmZEFRa2TIqkq1NRM1r8wasDH4vmLJc",
  authDomain: "castro-alves-43a37.firebaseapp.com",
  projectId: "castro-alves-43a37",
  storageBucket: "castro-alves-43a37.firebasestorage.app",
  messagingSenderId: "1068181780181",
  appId: "1:1068181780181:web:6b96f438ac846a9248d45c",
  measurementId: "G-86C66W87P2"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Lista de e-mails com permissão de Secretaria Geral (Super Administrador - Acesso Total)
const ADMIN_EMAILS = [
  'jfernandes.guilherme.lima@gmail.com',
  'secretariacastroalves7@gmail.com',
  'secretaria@castroalves.escola',
  'admin@castroalves.escola'
];

/**
 * Obtém o perfil do usuário garantindo que NUNCA trave (com timeout de 2 segundos)
 */
export async function obterPerfilUsuario(user) {
  if (!user) return null;

  const emailLower = (user.email || '').toLowerCase();
  const isMasterAdmin = ADMIN_EMAILS.includes(emailLower) || 
                        emailLower.includes('admin') || 
                        emailLower.includes('secretaria') ||
                        emailLower.includes('direcao');

  const perfilPadrao = {
    uid: user.uid,
    email: user.email,
    nome: user.displayName || user.email.split('@')[0],
    perfil: isMasterAdmin ? 'secretaria' : 'voluntarios',
    ativo: true,
    carregadoEm: new Date().toISOString()
  };

  // Promessa com timeout de 2 segundos para o Firestore nunca travar a tela
  const promessaFirestore = async () => {
    try {
      const docRef = doc(db, "usuarios", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { uid: user.uid, email: user.email, ...docSnap.data() };
      } else {
        // Tenta salvar em segundo plano sem travar
        setDoc(docRef, perfilPadrao, { merge: true }).catch(() => {});
        return perfilPadrao;
      }
    } catch (err) {
      console.warn("Firestore offline ou aguardando regras:", err);
      return perfilPadrao;
    }
  };

  const timeoutPromessa = new Promise((resolve) => {
    setTimeout(() => resolve(perfilPadrao), 1800);
  });

  return Promise.race([promessaFirestore(), timeoutPromessa]);
}

export { signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail };
