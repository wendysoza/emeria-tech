import React, { useState, useEffect } from 'react';
import { Cpu } from 'lucide-react';
import { onAuthStateChanged, signOut, signInAnonymously, signInWithCustomToken } from 'firebase/auth';
import { doc, getDoc, updateDoc, increment, setDoc, arrayUnion } from 'firebase/firestore';

import { auth, db, appId, isConfigured } from './firebase/config';
import LandingPage from './pages/LandingPage';
import AuthScreen from './pages/AuthScreen';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';

export default function App() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [currentScreen, setCurrentScreen] = useState('landing'); 
  
  const [isCustomTeacherLogin, setIsCustomTeacherLogin] = useState(false);

  useEffect(() => {
    if (!isConfigured) { setLoadingAuth(false); return; }

    // RECUPERACIÓN DE SESIÓN DE DOCENTE (PERSISTENCIA)
    const storedTeacher = localStorage.getItem('teacherProfile_emeria');
    if (storedTeacher) {
      setProfile(JSON.parse(storedTeacher));
      setIsCustomTeacherLogin(true);
      setCurrentScreen('dashboard');
      setLoadingAuth(false);
      return; 
    }

    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (error) {
        console.error("Error inicializando Auth:", error);
      }
    };
    initAuth();
    
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (isCustomTeacherLogin) {
        setLoadingAuth(false);
        return;
      }

      if (currentUser && !currentUser.isAnonymous) {
        // --- EVITAR INGRESO AUTOMÁTICO SI EL CORREO NO ESTÁ VERIFICADO ---
        if (!currentUser.emailVerified) {
          setLoadingAuth(false);
          return; 
        }
        // ------------------------------------------------------------------

        const userRef = doc(db, 'artifacts', appId, 'public', 'data', 'usuarios', currentUser.uid);
        try {
          const snap = await getDoc(userRef);
          if (!snap.exists()) {
            const newP = { 
              uid: currentUser.uid, 
              name: currentUser.displayName || 'Estudiante', 
              email: currentUser.email, 
              role: 'estudiante', 
              totalScore: 0,
              completedMissions: [],
              course: null 
            };
            await setDoc(userRef, newP); 
            setProfile(newP);
            setCurrentScreen('onboarding'); 
          } else { 
            const data = snap.data();
            if (!data.completedMissions) data.completedMissions = [];
            setProfile(data); 
            
            if (data.role === 'estudiante' && !data.course) {
               setCurrentScreen('onboarding');
            } else {
               setCurrentScreen('dashboard');
            }
          }
        } catch (error) { 
          console.error("Error obteniendo perfil:", error); 
        }
      } else {
        setProfile(null); 
        if (currentScreen === 'dashboard' || currentScreen === 'onboarding') {
           setCurrentScreen('landing');
        }
      }
      setLoadingAuth(false);
    });
    
    return () => unsubscribe();
  }, [currentScreen, isCustomTeacherLogin]);

  // LOGIN DE DOCENTE CON GUARDADO EN LOCALSTORAGE
  const handleTeacherLogin = (teacherProfile) => {
    localStorage.setItem('teacherProfile_emeria', JSON.stringify(teacherProfile));
    setIsCustomTeacherLogin(true);
    setProfile(teacherProfile);
    setCurrentScreen('dashboard');
  };

  const addExperience = async (points, missionId) => {
    if (!isConfigured || !profile) return;
    if (profile.completedMissions.includes(missionId)) return; 

    const uidToUpdate = profile.uid || user?.uid;
    if (!uidToUpdate) return;

    const userRef = doc(db, 'artifacts', appId, 'public', 'data', 'usuarios', uidToUpdate);
    try {
      await updateDoc(userRef, { 
        totalScore: increment(points),
        completedMissions: arrayUnion(missionId)
      });
      setProfile(p => ({ 
        ...p, 
        totalScore: p.totalScore + points,
        completedMissions: [...p.completedMissions, missionId]
      }));
    } catch (error) {
      console.error("Error guardando progreso:", error);
    }
  };

  // CERRAR SESIÓN (LIMPIA EL LOCALSTORAGE DEL DOCENTE)
  const handleLogout = () => { 
    localStorage.removeItem('teacherProfile_emeria');
    setIsCustomTeacherLogin(false);
    setProfile(null);
    if (isConfigured) signOut(auth); 
    setCurrentScreen('landing'); 
  };

  const handleCourseSelected = async (selectedCourse) => {
    if (!profile) return;
    const uidToUpdate = profile.uid || user?.uid;
    if (!uidToUpdate) return;

    const userRef = doc(db, 'artifacts', appId, 'public', 'data', 'usuarios', uidToUpdate);
    try {
      await updateDoc(userRef, { course: selectedCourse });
      setProfile(p => ({ ...p, course: selectedCourse }));
      setCurrentScreen('dashboard');
    } catch (error) {
      console.error("Error guardando el curso:", error);
      alert("Hubo un error al guardar tu selección. Intenta de nuevo.");
    }
  };

  if (loadingAuth) return <div className="min-h-screen bg-[#050B14] flex items-center justify-center text-white"><Cpu className="w-12 h-12 animate-spin text-blue-500" /></div>;

  if (currentScreen === 'onboarding') {
    return <OnboardingScreen profile={profile} onComplete={handleCourseSelected} onLogout={handleLogout} />;
  }

  if (currentScreen === 'dashboard' && profile) {
    if (profile.role === 'admin' || profile.role === 'docente') {
      return <TeacherDashboard profile={profile} onLogout={handleLogout} />;
    } else {
      return <StudentDashboard user={user} profile={profile} onLogout={handleLogout} addExperience={addExperience} />;
    }
  }
  
  if (currentScreen === 'auth') {
    return <AuthScreen onBack={() => setCurrentScreen('landing')} onTeacherLogin={handleTeacherLogin} />;
  }

  return <LandingPage onNavigateToAuth={() => setCurrentScreen('auth')} />;
}

// ----------------------------------------------------------------------
// COMPONENTE: PANTALLA DE ONBOARDING (SELECCIÓN DE CURSO)
// ----------------------------------------------------------------------
import { BookOpen, ChevronRight, CheckCircle2 } from 'lucide-react';
function OnboardingScreen({ profile, onComplete, onLogout }) {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableCourses = [
    "Octavo A",
    "Octavo B",
    "Octavo C",
    "Octavo D"
  ];

  const handleSubmit = async () => {
    if (!selectedCourse) return;
    setIsSubmitting(true);
    await onComplete(selectedCourse);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#050B14] flex flex-col items-center justify-center p-6 text-slate-300 font-sans relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px]"></div>

      <div className="w-full max-w-xl bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative z-10 animate-in fade-in zoom-in duration-500">
        <div className="flex justify-center mb-8">
           <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.4)]">
             <BookOpen className="w-8 h-8 text-white" />
           </div>
        </div>
        <h1 className="text-3xl font-black text-white text-center mb-2">¡Bienvenido a EMERIA!</h1>
        <p className="text-slate-400 text-center mb-10">Hola <span className="text-white font-bold">{profile?.name}</span>. Para personalizar tu experiencia y asignarte a un ranking, por favor selecciona tu curso actual.</p>

        <div className="space-y-4 mb-10 max-h-60 overflow-y-auto pr-2">
          {availableCourses.map((course) => {
            const isSelected = selectedCourse === course;
            return (
              <button key={course} onClick={() => setSelectedCourse(course)} className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between group ${isSelected ? 'bg-blue-600/20 border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.2)]' : 'bg-slate-950/50 border-white/5 hover:border-white/20'}`}>
                <span className={`font-bold ${isSelected ? 'text-blue-400' : 'text-slate-300 group-hover:text-white'}`}>{course}</span>
                {isSelected && <CheckCircle2 className="w-5 h-5 text-blue-400 animate-in zoom-in duration-200" />}
              </button>
            );
          })}
        </div>

        <div className="flex gap-4">
          <button onClick={onLogout} className="px-6 py-4 rounded-xl font-bold text-slate-400 hover:text-white hover:bg-white/5 transition-colors">Cancelar</button>
          <button onClick={handleSubmit} disabled={!selectedCourse || isSubmitting} className={`flex-1 py-4 rounded-xl font-black transition-all flex items-center justify-center gap-2 ${selectedCourse && !isSubmitting ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-500 hover:to-cyan-500 shadow-[0_0_20px_rgba(37,99,235,0.4)]' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}>
            {isSubmitting ? 'Guardando...' : 'Comenzar Aventura'} <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}