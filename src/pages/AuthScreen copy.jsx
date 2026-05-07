import React, { useState, useRef } from 'react';
import { ArrowLeft, Cpu, User, Mail, Lock } from 'lucide-react';
import { auth, db, appId, isConfigured } from '../firebase/config';

import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';


export default function AuthScreen({ onBack }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('estudiante'); 
  const [course, setCourse] = useState('Octavo A');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // VALIDACIÓN ESTRICTA DE CORREO INSTITUCIONAL
  const validateUnesumEmail = (emailStr) => {
    return emailStr.toLowerCase().endsWith('@unesum.edu.ec');
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    if (!isConfigured) return setError("Firebase no configurado.");
    
    // REGLA DE NEGOCIO: Bloquear correos que no sean de la UNESUM
    if (!validateUnesumEmail(email)) {
      setError('Acceso denegado: Solo se permiten correos institucionales (@unesum.edu.ec)');
      return;
    }

    setError(''); setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'usuarios', userCredential.user.uid), {
          uid: userCredential.user.uid, 
          name: name || 'Estudiante', 
          email: email, 
          role: role, 
          course: role === 'estudiante' ? course : 'Docencia',
          totalScore: 0, 
          createdAt: new Date().toISOString()
        });
      }
    } catch (err) { setError('Error de autenticación. Verifica tus datos o contraseña (mínimo 6 caracteres).'); }
    setLoading(false);
  };

  const handleGoogleAuth = async () => {
    if (!isConfigured) return;
    setError(''); setLoading(true);
    try { 
      const provider = new GoogleAuthProvider();
      // Opcional: Forzar a Google a pedir cuenta de UNESUM
      provider.setCustomParameters({ hd: "unesum.edu.ec" });
      
      const result = await signInWithPopup(auth, provider);
      
      // Doble validación por seguridad
      if (!validateUnesumEmail(result.user.email)) {
        await signOut(auth);
        setError('Acceso denegado: Usa tu cuenta de Google de @unesum.edu.ec');
        setLoading(false);
        return;
      }
    } catch (err) { setError('Operación cancelada.'); setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#050B14] flex flex-col justify-center items-center p-4 relative overflow-hidden">
      <button onClick={onBack} className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-white z-20"><ArrowLeft className="w-5 h-5"/> Volver</button>
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] animate-pulse"></div>
      
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 shadow-2xl relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.5)] mb-4"><Cpu className="text-white w-8 h-8" /></div>
          <h1 className="text-3xl font-black text-white">EMERIA TECH</h1>
          <p className="text-slate-400 text-xs mt-2 uppercase tracking-widest">Plataforma Exclusiva UNESUM</p>
        </div>

        {error && <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm text-center font-medium">{error}</div>}

        <form onSubmit={handleEmailAuth} className="space-y-4">
          {!isLogin && (
            <div className="space-y-4 animate-in fade-in">
              <div className="relative"><User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" /><input type="text" required value={name} onChange={e=>setName(e.target.value)} className="w-full bg-slate-950/50 border border-white/10 text-white rounded-xl py-4 pl-12 pr-4 focus:border-blue-500 outline-none" placeholder="Nombre Completo" /></div>
              
              <div className="flex gap-4">
                <select value={role} onChange={e=>setRole(e.target.value)} className="flex-1 bg-slate-950/50 border border-white/10 text-slate-300 rounded-xl p-4 outline-none focus:border-blue-500">
                  <option value="estudiante">Estudiante</option>
                  <option value="docente">Docente</option>
                </select>
                
                {role === 'estudiante' && (
                  <select value={course} onChange={e=>setCourse(e.target.value)} className="flex-1 bg-slate-950/50 border border-white/10 text-slate-300 rounded-xl p-4 outline-none focus:border-blue-500">
                    <option value="Octavo A">Octavo A</option>
                    <option value="Octavo B">Octavo B</option>
                    <option value="Octavo C">Octavo C</option>
                    <option value="Octavo D">Octavo D</option>
                  </select>
                )}
              </div>
            </div>
          )}
          <div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" /><input type="email" required value={email} onChange={e=>setEmail(e.target.value)} className="w-full bg-slate-950/50 border border-white/10 text-white rounded-xl py-4 pl-12 pr-4 focus:border-blue-500 outline-none" placeholder="usuario@unesum.edu.ec" /></div>
          <div className="relative"><Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" /><input type="password" required value={password} onChange={e=>setPassword(e.target.value)} className="w-full bg-slate-950/50 border border-white/10 text-white rounded-xl py-4 pl-12 pr-4 focus:border-blue-500 outline-none" placeholder="Contraseña (Mín. 6)" /></div>
          
          <button type="submit" disabled={loading} className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold mt-6 transition-all">{loading ? 'Procesando...' : (isLogin ? 'Iniciar Sesión' : 'Registrarse')}</button>
        </form>

        <button onClick={handleGoogleAuth} disabled={loading} className="w-full mt-6 py-4 bg-white hover:bg-slate-100 text-slate-900 rounded-xl font-bold flex items-center justify-center gap-3">
          <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>Continuar con Google
        </button>

        <p className="mt-8 text-center text-sm text-slate-400">
          {isLogin ? '¿Estudiante nuevo? ' : '¿Ya tienes cuenta? '}
          <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="text-blue-400 font-bold hover:underline">
            {isLogin ? 'Regístrate' : 'Inicia Sesión'}
          </button>
        </p>
      </div>
    </div>
  );
}
