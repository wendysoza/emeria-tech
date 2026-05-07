import React, { useState } from 'react';
import { ArrowLeft, Cpu, User, Mail, Lock, ShieldCheck, GraduationCap, KeyRound, Loader2, Eye, EyeOff } from 'lucide-react';
import { auth, db, appId, isConfigured } from '../firebase/config';

import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  sendEmailVerification,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, setDoc, collection, getDocs } from 'firebase/firestore';

export default function AuthScreen({ onBack, onTeacherLogin }) {
  // Estado de Navegación de Pestañas
  const [loginType, setLoginType] = useState('student'); // 'student' o 'teacher'

  // Estados Globales de UI
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Estados de Estudiante
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [course, setCourse] = useState('Octavo A');
  const [showStudentPassword, setShowStudentPassword] = useState(false); 

  // Estados de Docente
  const [teacherEmail, setTeacherEmail] = useState('');
  const [teacherCode, setTeacherCode] = useState('');
  const [showTeacherPassword, setShowTeacherPassword] = useState(false); 

  // --------------------------------------------------------------------------
  // LÓGICA DE ESTUDIANTE
  // --------------------------------------------------------------------------
  const validateUnesumEmail = (emailStr) => {
    return emailStr.toLowerCase().endsWith('@unesum.edu.ec');
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!validateUnesumEmail(email)) {
      setError('Acceso denegado: Ingresa tu correo institucional (@unesum.edu.ec)');
      return;
    }

    setError('');
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMsg('Se ha enviado un enlace para restablecer tu contraseña a tu correo institucional. Revisa tu bandeja de entrada y SPAM.');
      setIsForgotPassword(false);
    } catch (err) {
      setError('No se pudo enviar el correo de recuperación. Verifica que el correo sea correcto.');
    }
    setLoading(false);
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    if (!isConfigured) return setError("Firebase no configurado.");
    
    if (!validateUnesumEmail(email)) {
      setError('Acceso denegado: Solo se permiten correos institucionales (@unesum.edu.ec)');
      return;
    }

    setError(''); 
    setSuccessMsg('');
    setLoading(true);

    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        if (!userCredential.user.emailVerified) {
          await signOut(auth);
          setError('Tu cuenta aún no está verificada. Revisa tu correo institucional para validarla.');
          setLoading(false);
          return;
        }
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'usuarios', userCredential.user.uid), {
          uid: userCredential.user.uid, 
          name: name || 'Estudiante', 
          email: email, 
          role: 'estudiante',
          course: course, 
          totalScore: 0, 
          createdAt: new Date().toISOString()
        });

        try {
          await sendEmailVerification(userCredential.user);
        } catch (verifyErr) {
          console.error("Error enviando verificación:", verifyErr);
        }
        
        await signOut(auth);
        
        setSuccessMsg('¡Registro exitoso! Verifica tu correo institucional antes de iniciar sesión.');
        setIsLogin(true);
        setPassword('');
      }
    } catch (err) { 
      console.error("Código de error de Firebase:", err.code); 
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('Este correo institucional ya está registrado. Por favor, intenta iniciar sesión o recuperar tu contraseña.');
          break;
        case 'auth/password-does-not-meet-requirements':
        case 'auth/weak-password':
          setError('La contraseña es demasiado débil. Debe contener letras, números y tener al menos 6 caracteres.');
          break;
        case 'auth/invalid-credential':
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          setError('Correo o contraseña incorrectos. Verifica tus credenciales.');
          break;
        case 'auth/too-many-requests':
          setError('Demasiados intentos fallidos. Por seguridad, inténtalo de nuevo más tarde.');
          break;
        default:
          setError('Ocurrió un error al procesar tu solicitud. Inténtalo de nuevo.');
          break;
      }
    }
    setLoading(false);
  };

  const handleGoogleAuth = async () => {
    if (!isConfigured) return;
    
    // Importante: Inicializar el proveedor directamente sin hacer `setLoading(true)` u otros 
    // cambios de estado ANTES del popup. Cambiar estados en React causa un re-renderizado
    // que le hace creer al navegador que la ventana emergente no fue solicitada directamente por el clic.
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ hd: "unesum.edu.ec" });
    
    try { 
      // Lanzamos la ventana emergente INMEDIATAMENTE
      const result = await signInWithPopup(auth, provider);
      
      // Una vez resuelto, actualizamos nuestros estados de carga y UI
      setError(''); 
      setSuccessMsg(''); 
      setLoading(true);
      
      if (!validateUnesumEmail(result.user.email)) {
        await signOut(auth);
        setError('Acceso denegado: Usa tu cuenta de Google de @unesum.edu.ec');
        setLoading(false);
        return;
      }
    } catch (err) { 
      console.error("Error detallado de Google Auth:", err); // Log para consola
      
      if (err.code === 'auth/popup-blocked') {
        // Manejo específico del bloqueador de pop-ups
        setError('Tu navegador bloqueó la ventana de Google. Por favor, permite las ventanas emergentes (pop-ups) en tu navegador e intenta de nuevo.');
      } else if (err.code !== 'auth/popup-closed-by-user') {
         setError(`Error de Google: ${err.message}`); 
      }
      setLoading(false); 
    }
  };

  // --------------------------------------------------------------------------
  // LÓGICA DE DOCENTE
  // --------------------------------------------------------------------------
  const handleTeacherSubmit = async (e) => {
    e.preventDefault();
    if (!teacherEmail || !teacherCode) {
      setError("Por favor, completa ambos campos.");
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      const usersRef = collection(db, 'artifacts', appId, 'public', 'data', 'usuarios');
      const snapshot = await getDocs(usersRef);
      
      const allUsers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const teacher = allUsers.find(u => 
        u.role === 'docente' && 
        u.email.toLowerCase() === teacherEmail.toLowerCase() && 
        u.code_login === teacherCode
      );

      if (teacher) {
        onTeacherLogin(teacher);
      } else {
        setError("Correo o código de acceso incorrectos.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error validando credenciales de docente:", error);
      setError("Error de conexión con la base de datos.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050B14] flex flex-col justify-center items-center p-4 relative overflow-hidden text-slate-300">
      <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      
      <button onClick={onBack} className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-white z-20 transition-colors">
        <ArrowLeft className="w-5 h-5"/> Volver
      </button>
      
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 shadow-2xl relative z-10">
        
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.5)] mb-4">
            <Cpu className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black text-white">EMERIA TECH</h1>
          <p className="text-slate-400 text-xs mt-2 uppercase tracking-widest">Plataforma Exclusiva UNESUM</p>
        </div>

        <div className="flex bg-slate-950/50 p-1 rounded-xl mb-6 border border-white/10">
          <button 
            onClick={() => { setLoginType('student'); setError(''); setSuccessMsg(''); }}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-lg transition-all ${loginType === 'student' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <GraduationCap className="w-4 h-4" /> Estudiante
          </button>
          <button 
            onClick={() => { setLoginType('teacher'); setError(''); setSuccessMsg(''); }}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-bold rounded-lg transition-all ${loginType === 'teacher' ? 'bg-amber-600 text-white shadow-lg shadow-amber-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <ShieldCheck className="w-4 h-4" /> Docente
          </button>
        </div>

        {error && <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm text-center font-medium animate-in fade-in">{error}</div>}
        {successMsg && <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-xl text-green-400 text-sm text-center font-medium animate-in fade-in">{successMsg}</div>}

        {loginType === 'student' && (
          <div className="animate-in fade-in slide-in-from-left-4 duration-300">
            {isForgotPassword ? (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <h2 className="text-white text-lg font-bold text-center mb-4">Recuperar Contraseña</h2>
                <p className="text-slate-400 text-xs text-center mb-4">Ingresa tu correo para recibir un enlace de restauración.</p>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} className="w-full bg-slate-950/50 border border-white/10 text-white rounded-xl py-4 pl-12 pr-4 focus:border-blue-500 outline-none" placeholder="usuario@unesum.edu.ec" />
                </div>
                <button type="submit" disabled={loading} className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all disabled:opacity-70">
                  {loading ? 'Enviando...' : 'Enviar Enlace'}
                </button>
                <button type="button" onClick={() => { setIsForgotPassword(false); setError(''); }} className="w-full text-blue-400 text-sm font-bold hover:underline mt-2">
                  Volver al inicio de sesión
                </button>
              </form>
            ) : (
              <form onSubmit={handleEmailAuth} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-4 animate-in fade-in">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input type="text" required value={name} onChange={e=>setName(e.target.value)} className="w-full bg-slate-950/50 border border-white/10 text-white rounded-xl py-4 pl-12 pr-4 focus:border-blue-500 outline-none" placeholder="Nombre Completo" />
                    </div>
                    <select value={course} onChange={e=>setCourse(e.target.value)} className="w-full bg-slate-950/50 border border-white/10 text-slate-300 rounded-xl p-4 outline-none focus:border-blue-500">
                      <option value="Octavo A">Octavo A</option>
                      <option value="Octavo B">Octavo B</option>
                      <option value="Octavo C">Octavo C</option>
                      <option value="Octavo D">Octavo D</option>
                    </select>
                  </div>
                )}
                
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} className="w-full bg-slate-950/50 border border-white/10 text-white rounded-xl py-4 pl-12 pr-4 focus:border-blue-500 outline-none" placeholder="usuario@unesum.edu.ec" />
                </div>
                
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input 
                    type={showStudentPassword ? "text" : "password"} 
                    required 
                    value={password} 
                    onChange={e=>setPassword(e.target.value)} 
                    className="w-full bg-slate-950/50 border border-white/10 text-white rounded-xl py-4 pl-12 pr-12 focus:border-blue-500 outline-none" 
                    placeholder="Contraseña (letras y números)" 
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowStudentPassword(!showStudentPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 focus:outline-none transition-colors"
                  >
                    {showStudentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {isLogin && (
                  <div className="flex justify-end">
                    <button type="button" onClick={() => { setIsForgotPassword(true); setError(''); setSuccessMsg(''); }} className="text-xs text-blue-400 hover:underline">
                      ¿Olvidaste tu contraseña?
                    </button>
                  </div>
                )}
                
                <button type="submit" disabled={loading} className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold mt-2 transition-all disabled:opacity-70 flex justify-center items-center">
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isLogin ? 'Iniciar Sesión' : 'Registrarse')}
                </button>
              </form>
            )}

            {!isForgotPassword && (
              <>
                <button onClick={handleGoogleAuth} disabled={loading} className="w-full mt-6 py-4 bg-white hover:bg-slate-100 text-slate-900 rounded-xl font-bold flex items-center justify-center gap-3 disabled:opacity-70">
                  <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  Continuar con Google
                </button>

                <p className="mt-8 text-center text-sm text-slate-400">
                  {isLogin ? '¿Estudiante nuevo? ' : '¿Ya tienes cuenta? '}
                  <button onClick={() => { setIsLogin(!isLogin); setError(''); setSuccessMsg(''); }} className="text-blue-400 font-bold hover:underline">
                    {isLogin ? 'Regístrate' : 'Inicia Sesión'}
                  </button>
                </p>
              </>
            )}
          </div>
        )}

        {/* =====================================================================
            VISTA DOCENTE (Manual)
            ===================================================================== */}
        {loginType === 'teacher' && (
          <form onSubmit={handleTeacherSubmit} className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 mb-6">
              <p className="text-sm text-amber-300 font-medium text-center">Ingreso administrativo mediante credenciales preasignadas.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 pl-1">Correo Institucional</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input 
                  type="email" 
                  value={teacherEmail}
                  onChange={(e) => setTeacherEmail(e.target.value)}
                  placeholder="ejemplo@unesum.edu.ec"
                  className="w-full bg-slate-950/50 border border-white/10 focus:border-amber-500 rounded-xl py-4 pl-12 pr-4 text-white outline-none transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 pl-1">Código de Acceso (code_login)</label>
              <div className="relative">
                <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input 
                  type={showTeacherPassword ? "text" : "password"} 
                  value={teacherCode}
                  onChange={(e) => setTeacherCode(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950/50 border border-white/10 focus:border-amber-500 rounded-xl py-4 pl-12 pr-12 text-white outline-none transition-colors"
                  required
                />
                <button 
                  type="button" 
                  onClick={() => setShowTeacherPassword(!showTeacherPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 focus:outline-none transition-colors"
                >
                  {showTeacherPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white py-4 rounded-xl font-black transition-all shadow-[0_0_20px_rgba(217,119,6,0.3)] flex items-center justify-center gap-2 mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Ingresar al Panel Docente'}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}