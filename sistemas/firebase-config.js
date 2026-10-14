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
  setDoc,
  collection,
  getDocs
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

/**
 * Perfis disponíveis no sistema:
 * - 'secretaria': Acesso total a todos os módulos e configurações
 * - 'voluntarios': Lançamento e consulta de faltas e reposições de voluntários sociais
 * - 'aee': Carteirinhas e autorizações do AEE (Sala de Recursos)
 * - 'transporte': Carteirinhas do Transporte Escolar
 */
export async function obterPerfilUsuario(user) {
  if (!user) return null;
  
  try {
    const docRef = doc(db, "usuarios", user.uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { uid: user.uid, email: user.email, ...docSnap.data() };
    } else {
      // Perfil padrão caso o documento ainda não tenha sido criado no Firestore
      // Se for o primeiro usuário ou e-mail de secretaria/admin, recebe perfil 'secretaria'
      const isMasterAdmin = user.email.toLowerCase().includes('admin') || 
                            user.email.toLowerCase().includes('secretaria') ||
                            user.email.toLowerCase().includes('direcao');
      
      const perfilPadrao = {
        uid: user.uid,
        email: user.email,
        nome: user.displayName || user.email.split('@')[0],
        perfil: isMasterAdmin ? 'secretaria' : 'voluntarios',
        ativo: true,
        criadoEm: new Date().toISOString()
      };

      // Tenta salvar no Firestore para os próximos acessos
      try {
        await setDoc(docRef, perfilPadrao, { merge: true });
      } catch (err) {
        console.warn("Não foi possível salvar perfil inicial no Firestore:", err);
      }

      return perfilPadrao;
    }
  } catch (error) {
    console.error("Erro ao obter perfil do usuário:", error);
    // Fallback seguro em caso de timeout de rede
    return {
      uid: user.uid,
      email: user.email,
      nome: user.email.split('@')[0],
      perfil: user.email.toLowerCase().includes('secretaria') ? 'secretaria' : 'voluntarios',
      ativo: true
    };
  }
}

export { signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail };
