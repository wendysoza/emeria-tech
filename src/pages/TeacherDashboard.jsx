import React, { useState, useEffect } from 'react';
import { LogOut, BookOpen, Edit3, Save, Users, LayoutDashboard, BarChart3, FileText, CheckCircle, Cpu, Zap, Search, Plus, Trash2, ArrowLeft, List, Type, Video, MessageSquare, AlertTriangle, Star, Target, Filter, CircleDashed, Gamepad2, PlayCircle, Lock, BrainCircuit, KeyRound, X, Loader2 } from 'lucide-react';
import { db, appId } from '../firebase/config';
import { collection, query, onSnapshot, doc, updateDoc, setDoc, orderBy } from 'firebase/firestore';
import { silabo as silaboInicial, arcadeGames as juegosIniciales } from '../data/silabo'; 

// Importar los Minijuegos para la Vista Previa
import { MemoryGameView, HangmanGameView, TimeAttackGameView, SortingGameView, PromptGameView, ScenarioGameView } from '../components/ArcadeGames';

const getYouTubeId = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

export default function TeacherDashboard({ profile, onLogout }) {
  const [activeTab, setActiveTab] = useState('inicio');
  const [silaboData, setSilaboData] = useState([]);
  const [juegosData, setJuegosData] = useState([]); 
  const [studentsData, setStudentsData] = useState([]);
  const [editingUnitId, setEditingUnitId] = useState(null);
  const [editingGameId, setEditingGameId] = useState(null); 
  const [loading, setLoading] = useState(true);
  
  // ESTADOS PARA CALIFICACIONES
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState('Todos');
  const [selectedStudentDetail, setSelectedStudentDetail] = useState(null);
  
  // ESTADOS PARA VISTAS PREVIAS
  const [previewLesson, setPreviewLesson] = useState(null);
  const [previewGame, setPreviewGame] = useState(null);

  // ESTADOS PARA CAMBIAR CÓDIGO
  const [isChangingCode, setIsChangingCode] = useState(false);
  const [newCode, setNewCode] = useState('');
  const [confirmCode, setConfirmCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [isSavingCode, setIsSavingCode] = useState(false);

  useEffect(() => {
    // Suscripción Sílabo
    const silaboRef = collection(db, 'artifacts', appId, 'public', 'data', 'silabo');
    const unsubSilabo = onSnapshot(silaboRef, (snapshot) => {
      if (!snapshot.empty) {
        const data = snapshot.docs.map(doc => ({ firebaseId: doc.id, ...doc.data() }));
        data.sort((a, b) => a.id.localeCompare(b.id));
        setSilaboData(data);
      }
    });

    // Suscripción Juegos (Laboratorio)
    const juegosRef = collection(db, 'artifacts', appId, 'public', 'data', 'juegos');
    const unsubJuegos = onSnapshot(juegosRef, (snapshot) => {
      if (!snapshot.empty) {
        const data = snapshot.docs.map(doc => ({ firebaseId: doc.id, ...doc.data() }));
        setJuegosData(data);
      }
      setLoading(false);
    });

    // Suscripción Estudiantes
    const usersRef = collection(db, 'artifacts', appId, 'public', 'data', 'usuarios');
    const qUsers = query(usersRef, orderBy('totalScore', 'desc'));
    const unsubUsers = onSnapshot(qUsers, (snapshot) => {
      const students = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(u => u.role === 'estudiante');
      setStudentsData(students);
    });

    return () => { unsubSilabo(); unsubJuegos(); unsubUsers(); };
  }, []);

  const initializeSilaboInFirestore = async () => {
    setLoading(true);
    try {
      for (const unidad of silaboInicial) {
        const unitRef = doc(db, 'artifacts', appId, 'public', 'data', 'silabo', unidad.id);
        await setDoc(unitRef, unidad);
      }
      for (const juego of juegosIniciales) {
        const juegoRef = doc(db, 'artifacts', appId, 'public', 'data', 'juegos', juego.id);
        await setDoc(juegoRef, juego);
      }
      alert("¡Base de datos del curso inicializada correctamente!");
    } catch (error) {
      console.error("Error al inicializar:", error);
      alert("Error al inicializar la base de datos.");
    }
    setLoading(false);
  };

  const handleSaveUnit = async (unitData) => {
    try {
      const unitRef = doc(db, 'artifacts', appId, 'public', 'data', 'silabo', unitData.firebaseId);
      await updateDoc(unitRef, unitData);
      setEditingUnitId(null);
      alert("Unidad actualizada correctamente en la nube.");
    } catch (error) {
      alert("Hubo un error al guardar los cambios.");
    }
  };

  const handleSaveGame = async (gameData) => {
    try {
      const gameRef = doc(db, 'artifacts', appId, 'public', 'data', 'juegos', gameData.firebaseId);
      await updateDoc(gameRef, gameData);
      setEditingGameId(null);
      alert("Configuración del simulador actualizada correctamente.");
    } catch (error) {
      alert("Hubo un error al guardar los cambios del simulador.");
    }
  };

  const handleChangeCode = async (e) => {
    e.preventDefault();
    setCodeError('');
    if (newCode !== confirmCode) {
      setCodeError("Los códigos no coinciden. Intenta nuevamente.");
      return;
    }
    if (newCode.length < 6) {
      setCodeError("El nuevo código debe tener al menos 6 caracteres.");
      return;
    }

    setIsSavingCode(true);
    try {
      // Usar profile.id para actualizar el documento en Firestore
      const userRef = doc(db, 'artifacts', appId, 'public', 'data', 'usuarios', profile.id);
      await updateDoc(userRef, { code_login: newCode });
      
      // Actualizar localStorage para que la sesión persista correctamente
      const updatedProfile = { ...profile, code_login: newCode };
      localStorage.setItem('teacherProfile_emeria', JSON.stringify(updatedProfile));
      
      setIsChangingCode(false);
      setNewCode('');
      setConfirmCode('');
      alert("Tu código de acceso se ha actualizado con éxito.");
    } catch (error) {
      console.error("Error al cambiar código:", error);
      setCodeError("Hubo un error al guardar el nuevo código.");
    }
    setIsSavingCode(false);
  };

  const getFlatLessons = () => {
    let allLessons = [];
    silaboData.forEach(u => {
      if(u.sessions) {
         u.sessions.forEach(s => {
           if(s.lessons) {
             s.lessons.forEach(l => allLessons.push(l));
           }
         })
      }
    });
    return allLessons;
  };
  const flatLessonsList = getFlatLessons();

  const totalStudents = studentsData.length;
  const avgXP = totalStudents > 0 ? Math.round(studentsData.reduce((acc, s) => acc + (s.totalScore || 0), 0) / totalStudents) : 0;
  
  const totalLessonsInSilabo = flatLessonsList.length;
  const totalGamesInDb = juegosData.length;

  const availableCourses = ['Todos', ...Array.from(new Set(studentsData.map(s => s.course).filter(Boolean)))];

  if (loading) return <div className="min-h-screen bg-[#050B14] flex items-center justify-center text-white"><Cpu className="w-12 h-12 animate-spin text-blue-500" /></div>;

  if (previewLesson) return <TeacherLessonPreview lesson={previewLesson} onClose={() => setPreviewLesson(null)} />;
  
  if (previewGame) {
    return (
      <div className="fixed inset-0 z-[100] bg-[#050B14] flex flex-col font-sans h-screen overflow-hidden">
        <header className="bg-slate-900/90 backdrop-blur-md border-b border-white/5 p-4 flex justify-between items-center shrink-0 shadow-lg">
          <div className="flex items-center gap-3">
            <button onClick={() => setPreviewGame(null)} className="p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors flex items-center gap-2 font-bold text-sm">
              <ArrowLeft className="w-4 h-4"/> Volver al Panel
            </button>
            <div className="h-6 w-px bg-white/20 mx-2 hidden sm:block"></div>
            <div className="hidden sm:block">
              <span className="text-xs text-pink-500 font-bold uppercase tracking-widest bg-pink-500/10 px-2 py-0.5 rounded border border-pink-500/20">Modo Proyección de Laboratorio</span>
            </div>
          </div>
          <h2 className="text-white font-bold text-lg truncate max-w-xl">{previewGame.title}</h2>
        </header>
        <div className="flex-1 overflow-y-auto relative bg-[#0a1120]">
           <GameRenderer game={previewGame} onBack={() => setPreviewGame(null)} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050B14] text-slate-300 flex overflow-hidden font-sans">
      
      {/* MODAL CAMBIAR CÓDIGO */}
      {isChangingCode && (
        <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/10 rounded-3xl p-6 w-full max-w-sm shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2"><KeyRound className="w-5 h-5 text-amber-500" /> Cambiar Código</h3>
              <button onClick={() => setIsChangingCode(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5"/></button>
            </div>
            {codeError && <p className="text-xs text-red-400 bg-red-500/10 p-3 rounded-lg mb-4 border border-red-500/20">{codeError}</p>}
            <form onSubmit={handleChangeCode} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nuevo Código</label>
                <input 
                  type="password" 
                  value={newCode} 
                  onChange={(e) => setNewCode(e.target.value)} 
                  className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Confirmar Código</label>
                <input 
                  type="password" 
                  value={confirmCode} 
                  onChange={(e) => setConfirmCode(e.target.value)} 
                  className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-amber-500"
                  required
                />
              </div>
              <button type="submit" disabled={isSavingCode} className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all">
                {isSavingCode ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Guardar Nuevo Código'}
              </button>
            </form>
          </div>
        </div>
      )}

      <aside className="w-64 bg-slate-900/50 border-r border-white/5 flex flex-col justify-between hidden md:flex backdrop-blur-md">
        <div>
          <div className="p-6 border-b border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Zap className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-black text-white leading-tight">EMERIA</h1>
              <p className="text-[10px] text-amber-400 font-bold uppercase tracking-widest">Panel Docente</p>
            </div>
          </div>
          
          <nav className="p-4 space-y-2">
            <SidebarBtn icon={<LayoutDashboard/>} label="Dashboard" isActive={activeTab==='inicio'} onClick={()=>{setActiveTab('inicio'); setSelectedStudentDetail(null);}} />
            <SidebarBtn icon={<BookOpen/>} label="Unidades (Teoría)" isActive={activeTab==='silabo'} onClick={()=>{setActiveTab('silabo'); setSelectedStudentDetail(null);}} />
            <SidebarBtn icon={<Gamepad2/>} label="Laboratorio (Juegos)" isActive={activeTab==='laboratorio'} onClick={()=>{setActiveTab('laboratorio'); setSelectedStudentDetail(null);}} />
            <SidebarBtn icon={<BarChart3/>} label="Calificaciones" isActive={activeTab==='calificaciones'} onClick={()=>setActiveTab('calificaciones')} />
          </nav>
        </div>

        <div className="p-4 border-t border-white/5">
           <div className="bg-slate-800/50 rounded-xl p-4 mb-4 border border-white/5">
              <p className="text-white font-bold text-sm truncate">{profile?.name || 'Profesor'}</p>
              <p className="text-xs text-amber-400 font-bold mt-1">Administrador</p>
           </div>
           
          {/* BOTÓN CAMBIAR CÓDIGO */}
          <button onClick={() => { setIsChangingCode(true); setCodeError(''); setNewCode(''); setConfirmCode(''); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-slate-300 hover:text-white transition-colors font-medium mb-1">
            <KeyRound className="w-5 h-5 text-amber-500" /> Cambiar Código
          </button>

          <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-red-400 transition-colors font-medium">
            <LogOut className="w-5 h-5" /> Cerrar Sesión
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        <header className="bg-slate-900/80 backdrop-blur-md border-b border-white/5 p-4 flex justify-between items-center sticky top-0 z-50">
           <div className="flex items-center gap-2 md:hidden">
             <Zap className="text-amber-500 w-6 h-6" /><span className="text-white font-bold text-lg">EMERIA ADMIN</span>
           </div>
           <div className="hidden md:block">
             <h2 className="text-xl font-bold text-white capitalize">{activeTab.replace('-', ' ')}</h2>
           </div>
           <div className="flex items-center gap-2">
             <button onClick={() => setIsChangingCode(true)} className="md:hidden text-amber-500 p-2"><KeyRound className="w-5 h-5"/></button>
             <button onClick={onLogout} className="md:hidden text-slate-400 hover:text-white p-2"><LogOut className="w-6 h-6"/></button>
           </div>
        </header>

        <div className="p-4 md:p-8 max-w-6xl mx-auto w-full">
          
          <div className="md:hidden grid grid-cols-4 gap-1 bg-slate-900/50 p-1 rounded-xl mb-6 border border-white/5">
             <MobileTabBtn label="Inicio" isActive={activeTab==='inicio'} onClick={()=>{setActiveTab('inicio'); setSelectedStudentDetail(null);}} />
             <MobileTabBtn label="Teoría" isActive={activeTab==='silabo'} onClick={()=>{setActiveTab('silabo'); setSelectedStudentDetail(null);}} />
             <MobileTabBtn label="Laboratorio" isActive={activeTab==='laboratorio'} onClick={()=>{setActiveTab('laboratorio'); setSelectedStudentDetail(null);}} />
             <MobileTabBtn label="Notas" isActive={activeTab==='calificaciones'} onClick={()=>setActiveTab('calificaciones')} />
          </div>

          {/* INICIO */}
          {activeTab === 'inicio' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-gradient-to-br from-amber-900/40 to-slate-900/80 border border-amber-500/20 rounded-3xl p-8">
                <h2 className="text-3xl font-black text-white mb-2">Resumen del Curso</h2>
                <p className="text-slate-400 mb-6">Métricas en tiempo real de tus estudiantes.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 flex flex-col items-center text-center">
                    <Users className="w-8 h-8 text-blue-400 mb-2" />
                    <p className="text-3xl font-black text-white">{totalStudents}</p>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Estudiantes</p>
                  </div>
                  <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 flex flex-col items-center text-center">
                    <Star className="w-8 h-8 text-yellow-400 mb-2" />
                    <p className="text-3xl font-black text-white">{avgXP}</p>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">XP Promedio</p>
                  </div>
                  <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 flex flex-col items-center text-center">
                    <Target className="w-8 h-8 text-green-400 mb-2" />
                    <p className="text-3xl font-black text-white">{totalLessonsInSilabo}</p>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Misiones Teoría</p>
                  </div>
                  <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-6 flex flex-col items-center text-center">
                    <Gamepad2 className="w-8 h-8 text-pink-400 mb-2" />
                    <p className="text-3xl font-black text-white">{totalGamesInDb}</p>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Simuladores</p>
                  </div>
                </div>
              </div>
              
              {(silaboData.length === 0 || juegosData.length === 0) && (
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6 text-center">
                   <p className="text-amber-400 font-bold mb-4">La base de datos de misiones o juegos está vacía. Debes inicializarla para que los estudiantes puedan jugar.</p>
                   <button onClick={initializeSilaboInFirestore} className="px-6 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-bold transition-all shadow-lg shadow-amber-600/20">
                     Inicializar Base de Datos
                   </button>
                </div>
              )}
            </div>
          )}

          {/* SÍLABO (TEORÍA) */}
          {activeTab === 'silabo' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-900/50 p-6 rounded-2xl border border-white/5 gap-4">
                 <div>
                   <h2 className="text-xl font-bold text-white flex items-center gap-2">
                     <Edit3 className="w-6 h-6 text-amber-400" /> Editor de Misiones
                   </h2>
                   <p className="text-sm text-slate-400 mt-1">Configura el contenido y administra los recursos de cada lección teórica.</p>
                 </div>
                 
                 <div className="flex gap-2 w-full sm:w-auto">
                    {silaboData.length === 0 ? (
                      <button onClick={initializeSilaboInFirestore} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold w-full sm:w-auto">Cargar Sílabo Base</button>
                    ) : (
                      <button onClick={() => {
                        if(window.confirm('¿Deseas FORZAR el reinicio de la base de datos? Esto borrará tus cambios y cargará la versión base.')) {
                          initializeSilaboInFirestore();
                        }
                      }} className="px-4 py-2 bg-red-600/10 hover:bg-red-600/30 text-red-400 border border-red-500/30 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 w-full sm:w-auto">
                        <AlertTriangle className="w-4 h-4"/> Forzar Reinicio
                      </button>
                    )}
                 </div>
               </div>

               {silaboData.map((unidad) => (
                <div key={unidad.firebaseId} className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 shadow-xl">
                  {editingUnitId === unidad.firebaseId ? (
                    <EditUnitForm unit={unidad} onSave={handleSaveUnit} onCancel={() => setEditingUnitId(null)} />
                  ) : (
                    <div>
                      <div className="flex justify-between items-start mb-6 border-b border-white/5 pb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white">{unidad.title}</h3>
                          <p className="text-sm text-slate-400 mt-1">{unidad.description}</p>
                        </div>
                        <button onClick={() => setEditingUnitId(unidad.firebaseId)} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-bold transition-all border border-white/10 shrink-0">
                          Modificar Unidad
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        {unidad.sessions?.map((session, sIdx) => (
                          <div key={sIdx} className="bg-slate-950/50 p-4 rounded-xl border border-white/5">
                            <h4 className="font-bold text-amber-400 text-sm mb-3">{session.name}</h4>
                            <div className="space-y-2">
                              {session.lessons?.map((lesson, lIdx) => (
                                <div key={lIdx} className="flex flex-col md:flex-row items-center justify-between bg-slate-900 p-3 rounded-lg border border-white/5 gap-4 hover:border-slate-700 transition-colors">
                                  <div className="flex items-center gap-3 w-full md:w-auto">
                                    {lesson.type === 'document' ? <FileText className="w-4 h-4 text-blue-400 shrink-0"/> : 
                                     lesson.type === 'task' ? <CheckCircle className="w-4 h-4 text-green-400 shrink-0"/> : 
                                     <BookOpen className="w-4 h-4 text-slate-400 shrink-0"/>}
                                    <span className="text-sm text-slate-300 font-medium">{lesson.title}</span>
                                  </div>
                                  <div className="flex items-center gap-4 w-full md:w-auto justify-end shrink-0">
                                     <button 
                                        onClick={() => setPreviewLesson(lesson)} 
                                        className="flex items-center gap-1 px-3 py-1 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-md transition-colors text-xs font-bold border border-blue-500/20"
                                        title="Proyectar Misión"
                                      >
                                        <PlayCircle className="w-3 h-3"/> Proyectar
                                     </button>
                                     <span className="text-xs font-bold text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded">{lesson.xpReward} XP</span>
                                     <span className="text-[10px] uppercase text-slate-500 font-bold bg-slate-800 px-2 py-1 rounded">
                                        {lesson.type === 'theory' ? 'Teoría' : lesson.type === 'practice' ? 'Práctica' : lesson.type === 'document' ? 'PDF' : 'Tarea'}
                                     </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* LABORATORIO */}
          {activeTab === 'laboratorio' && (
             <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-900/50 p-6 rounded-2xl border border-white/5 gap-4">
                 <div>
                   <h2 className="text-xl font-bold text-white flex items-center gap-2">
                     <Gamepad2 className="w-6 h-6 text-pink-400" /> Editor de Laboratorio
                   </h2>
                   <p className="text-sm text-slate-400 mt-1">Configura el XP y decide tras qué misión se desbloquean los simuladores.</p>
                 </div>
               </div>

               <div className="grid grid-cols-1 gap-6">
                 {juegosData.map((juego) => (
                   <div key={juego.firebaseId} className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                      {editingGameId === juego.firebaseId ? (
                        <EditGameForm 
                           game={juego} 
                           flatLessons={flatLessonsList} 
                           onSave={handleSaveGame} 
                           onCancel={() => setEditingGameId(null)} 
                        />
                      ) : (
                        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                           <div className="flex-1 space-y-4">
                             <div className="flex items-center gap-3">
                               <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center border border-white/10 shrink-0">
                                 <BrainCircuit className="w-6 h-6 text-pink-400" />
                               </div>
                               <div>
                                 <h3 className="text-xl font-bold text-white leading-tight">{juego.title}</h3>
                                 <span className="text-xs text-pink-400 uppercase font-bold tracking-wider">{juego.type} • +{juego.xpReward} XP</span>
                               </div>
                             </div>
                             
                             <p className="text-sm text-slate-400 leading-relaxed">{juego.description}</p>
                             
                             <div className="bg-slate-950 p-4 rounded-xl border border-white/5 flex items-center gap-3">
                               <Lock className="w-5 h-5 text-slate-500 shrink-0" />
                               <div>
                                 <p className="text-xs font-bold text-slate-500 uppercase">Se desbloquea al completar:</p>
                                 <p className="text-sm font-medium text-blue-400">{juego.requiredLessonName || 'Ninguna (Siempre desbloqueado)'}</p>
                               </div>
                             </div>
                           </div>

                           <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto shrink-0">
                              <button onClick={() => setPreviewGame(juego)} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 border border-blue-500/30 rounded-lg text-sm font-bold transition-all">
                                <PlayCircle className="w-4 h-4"/> Proyectar
                              </button>
                              <button onClick={() => setEditingGameId(juego.firebaseId)} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white border border-white/10 rounded-lg text-sm font-bold transition-all">
                                <Edit3 className="w-4 h-4"/> Configurar
                              </button>
                           </div>
                        </div>
                      )}
                   </div>
                 ))}
               </div>
             </div>
          )}

    {/* CALIFICACIONES */}
{activeTab === 'calificaciones' && (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
    {!selectedStudentDetail ? (
      <div className="bg-slate-900/50 border border-white/5 rounded-3xl overflow-hidden shadow-xl">
        <div className="p-6 border-b border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-green-400"/> Registro de Progreso
            </h2>
            <p className="text-sm text-slate-400 mt-1">Supervisa el avance en Teoría y Laboratorio.</p>
          </div>
          
          
          
          
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {/* Botón de exportación a formato Excel (XLS nativo vía HTML Table) */}
            <button 
              onClick={() => {
                const table = document.createElement("table");
                table.setAttribute("border", "1");
                
                // Cabeceras
                const headers = ["Nombre", "Curso", "U1", "U2", "U3", "U4", "U5", "U6", "Promedio Unidades", "Juego 1", "Juego 2", "Juego 3", "Juego 4", "Juego 5", "Juego 6", "Promedio Juegos", "PROMEDIO FINAL"];
                const thead = table.createTHead();
                const rowHead = thead.insertRow();
                headers.forEach(text => {
                  const th = document.createElement("th");
                  th.innerHTML = text;
                  rowHead.appendChild(th);
                });

                // Filas
                const tbody = table.createTBody();
                studentsData
                  .filter(s => selectedCourseFilter === 'Todos' || s.course === selectedCourseFilter)
                  .forEach(s => {
                    const unitScores = ["unit_1", "unit_2", "unit_3", "unit_4", "unit_5", "unit_6"].map(unitId => {
                      const unit = silaboData.find(u => u.id === unitId);
                      if (!unit) return 0;
                      const totalLessons = unit.sessions.reduce((acc, sess) => acc + (sess.lessons?.length || 0), 0);
                      const completedCount = s.completedMissions?.filter(id => unit.sessions.some(sess => sess.lessons?.find(l => l.id === id)))?.length || 0;
                      return totalLessons > 0 ? parseFloat(((completedCount / totalLessons) * 10).toFixed(1)) : 0;
                    });
                    const avgUnits = unitScores.reduce((a, b) => a + b, 0) / 6;
                    const gameScores = juegosData.map(juego => s.completedMissions?.includes(juego.id) ? 10 : 0);
                    const avgGames = gameScores.reduce((a, b) => a + b, 0) / 6;
                    const finalAvg = (avgUnits + avgGames) / 2;

                    const row = tbody.insertRow();
                    [s.name, s.course, ...unitScores, avgUnits.toFixed(1), ...gameScores, avgGames.toFixed(1), finalAvg.toFixed(1)].forEach(val => {
                      const cell = row.insertCell();
                      cell.innerHTML = val;
                    });
                  });

                const html = `<html><head><meta charset="utf-8"/></head><body>${table.outerHTML}</body></html>`;
                const blob = new Blob([html], { type: "application/vnd.ms-excel" });
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = `Reporte_Calificaciones_${selectedCourseFilter}.xls`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 shadow-lg"
            >
              Exportar a Excel (.xls)
            </button>

            <div className="relative w-full sm:w-48">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <select 
                value={selectedCourseFilter}
                onChange={(e) => setSelectedCourseFilter(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:border-blue-500 outline-none appearance-none cursor-pointer"
              >
                {availableCourses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>

            <div className="relative w-full sm:w-56">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Buscar estudiante..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:border-blue-500 outline-none"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/80 border-b border-white/10 text-xs uppercase tracking-wider text-slate-500">
                <th className="p-4 font-bold">Estudiante</th>
                <th className="p-4 font-bold hidden sm:table-cell">Curso</th>
                <th className="p-4 font-bold text-center">Experiencia</th>
                <th className="p-4 font-bold text-center border-l border-white/5">Teoría Completada</th>
                <th className="p-4 font-bold text-center border-l border-white/5">Laboratorio (Juegos)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {studentsData
                .filter(s => {
                  const matchesSearch = (s.name || '').toLowerCase().includes(searchTerm.toLowerCase());
                  const matchesCourse = selectedCourseFilter === 'Todos' || s.course === selectedCourseFilter;
                  return matchesSearch && matchesCourse;
                })
                .map((student) => {
                  const completedMissionsCount = student.completedMissions?.filter(id => flatLessonsList.find(l => l.id === id))?.length || 0;
                  const completedGamesCount = student.completedMissions?.filter(id => juegosData.find(g => g.id === id))?.length || 0;
                  const progressLessons = totalLessonsInSilabo > 0 ? (completedMissionsCount / totalLessonsInSilabo) * 100 : 0;
                  const progressGames = totalGamesInDb > 0 ? (completedGamesCount / totalGamesInDb) * 100 : 0;

                  return (
                    <tr key={student.id} onClick={() => setSelectedStudentDetail(student)} className="hover:bg-slate-800/80 transition-colors cursor-pointer group">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-xs border border-blue-500/30 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            {student.name ? student.name.charAt(0).toUpperCase() : 'S'}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-200 group-hover:text-blue-400 transition-colors">{student.name || 'Sin Nombre'}</p>
                            <p className="text-xs text-slate-500">{student.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 hidden sm:table-cell"><span className="text-xs text-slate-400 font-medium">{student.course || 'Sin asignar'}</span></td>
                      <td className="p-4 text-center"><span className="font-mono text-yellow-400 font-bold group-hover:scale-110 inline-block transition-transform">{student.totalScore || 0} XP</span></td>
                      <td className="p-4 border-l border-white/5">
                         <div className="flex flex-col items-center justify-center">
                           <div className="w-full max-w-[100px] bg-slate-950 rounded-full h-2 mb-1 overflow-hidden">
                             <div className="bg-blue-500 h-2 rounded-full" style={{width: `${progressLessons}%`}}></div>
                           </div>
                           <span className="text-[10px] text-slate-400 font-bold">{completedMissionsCount}/{totalLessonsInSilabo}</span>
                         </div>
                      </td>
                      <td className="p-4 border-l border-white/5">
                         <div className="flex flex-col items-center justify-center">
                           <div className="w-full max-w-[100px] bg-slate-950 rounded-full h-2 mb-1 overflow-hidden">
                             <div className="bg-pink-500 h-2 rounded-full" style={{width: `${progressGames}%`}}></div>
                           </div>
                           <span className="text-[10px] text-slate-400 font-bold">{completedGamesCount}/{totalGamesInDb}</span>
                         </div>
                      </td>
                    </tr>
                  );
                })}
              {studentsData.length === 0 && (
                <tr><td colSpan="5" className="p-8 text-center text-slate-500">No hay estudiantes registrados.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    ) : (
      <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl animate-in fade-in slide-in-from-right-4 duration-300">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-white/5 pb-6">
          <div className="flex items-center gap-4">
             <button onClick={() => setSelectedStudentDetail(null)} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors">
               <ArrowLeft className="w-5 h-5 text-slate-300" />
             </button>
             <div>
               <h2 className="text-2xl font-black text-white">{selectedStudentDetail.name}</h2>
               <p className="text-sm text-slate-400 font-medium">{selectedStudentDetail.course || 'Curso no asignado'} • {selectedStudentDetail.email}</p>
             </div>
          </div>
          <div className="flex gap-4">
             <div className="bg-slate-950 p-3 rounded-xl border border-white/5 text-center px-6">
               <p className="text-xs text-slate-500 font-bold uppercase mb-1">Experiencia</p>
               <p className="text-xl font-black text-yellow-400">{selectedStudentDetail.totalScore || 0} XP</p>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><BookOpen className="w-5 h-5 text-blue-400"/> Historial de Misiones</h3>
            <div className="space-y-6">
              {silaboData.map((unidad) => (
                <div key={unidad.id} className="bg-slate-950/50 rounded-2xl border border-white/5 p-4">
                  <h4 className="text-sm font-bold text-slate-200 mb-3">{unidad.title}</h4>
                  <div className="space-y-3 pl-2 border-l-2 border-slate-800">
                    {unidad.sessions?.map((session, sIdx) => (
                      <div key={sIdx}>
                        <div className="flex flex-col gap-2 mt-2">
                          {session.lessons?.map((lesson) => {
                            const isCompleted = selectedStudentDetail.completedMissions?.includes(lesson.id);
                            return (
                              <div key={lesson.id} className={`flex items-center gap-3 p-2 rounded-lg border transition-all ${isCompleted ? 'bg-green-500/10 border-green-500/30' : 'bg-slate-900 border-white/5'}`}>
                                {isCompleted ? <CheckCircle className="w-4 h-4 text-green-500 shrink-0" /> : <CircleDashed className="w-4 h-4 text-slate-600 shrink-0" />}
                                <p className={`text-xs font-medium ${isCompleted ? 'text-green-100' : 'text-slate-400'}`}>{lesson.title}</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><Gamepad2 className="w-5 h-5 text-pink-400"/> Historial de Laboratorio</h3>
            <div className="space-y-3">
               {juegosData.map((juego) => {
                 const isCompleted = selectedStudentDetail.completedMissions?.includes(juego.id);
                 return (
                   <div key={juego.id} className={`flex flex-col gap-2 p-4 rounded-xl border transition-all ${isCompleted ? 'bg-pink-500/10 border-pink-500/30' : 'bg-slate-950 border-white/5'}`}>
                      <div className="flex items-center gap-3">
                        {isCompleted ? <CheckCircle className="w-5 h-5 text-pink-500 shrink-0" /> : <CircleDashed className="w-5 h-5 text-slate-600 shrink-0" />}
                        <div className="flex-1">
                          <p className={`text-sm font-bold ${isCompleted ? 'text-pink-200' : 'text-slate-400'}`}>{juego.title}</p>
                          <p className="text-[10px] uppercase font-bold text-slate-500 mt-0.5">{juego.type}</p>
                        </div>
                      </div>
                   </div>
                 );
               })}
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
)}
        </div>
      </main>
    </div>
  );
}

// ----------------------------------------------------------------------
// SUBCOMPONENTE: EDITOR DE UNIDAD
// ----------------------------------------------------------------------
function EditUnitForm({ unit, onSave, onCancel }) {
  const [formData, setFormData] = useState(JSON.parse(JSON.stringify(unit)));
  const [editingLessonContent, setEditingLessonContent] = useState(null); 

  const handleSessionChange = (sIndex, field, value) => {
    const newData = { ...formData };
    newData.sessions[sIndex][field] = value;
    setFormData(newData);
  };

  const handleLessonChange = (sIndex, lIndex, field, value) => {
    const newData = { ...formData };
    newData.sessions[sIndex].lessons[lIndex][field] = value;
    setFormData(newData);
  };

  const saveLessonContent = (sIndex, lIndex, updatedLesson) => {
    const newData = { ...formData };
    newData.sessions[sIndex].lessons[lIndex] = updatedLesson;
    setFormData(newData);
    setEditingLessonContent(null);
  };

  if (editingLessonContent) {
    const { sIndex, lIndex } = editingLessonContent;
    const lesson = formData.sessions[sIndex].lessons[lIndex];
    return <LessonContentEditor lesson={lesson} onSave={(updated) => saveLessonContent(sIndex, lIndex, updated)} onCancel={() => setEditingLessonContent(null)} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-white/10 pb-4">
        <h3 className="text-lg font-black text-amber-400">Editando Unidad</h3>
        <div className="flex gap-2">
          <button onClick={onCancel} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-bold border border-white/10">Cancelar</button>
          <button onClick={() => onSave(formData)} className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-bold flex items-center gap-2"><Save className="w-4 h-4"/> Guardar Cambios</button>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Título de la Unidad</label>
          <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-lg p-2 text-white font-medium focus:border-amber-500 outline-none"/>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Descripción</label>
          <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-lg p-2 text-white text-sm focus:border-amber-500 outline-none" rows={2}/>
        </div>
        <div className="pt-4 border-t border-white/10">
          <h4 className="font-bold text-white mb-4">Misiones</h4>
          {formData.sessions?.map((session, sIndex) => (
            <div key={sIndex} className="bg-slate-950/80 border border-white/5 rounded-xl p-4 mb-4">
              <input type="text" value={session.name} onChange={(e) => handleSessionChange(sIndex, 'name', e.target.value)} className="w-full bg-slate-900 border border-white/10 rounded-lg p-2 text-amber-400 font-bold mb-4 outline-none"/>
              <div className="space-y-4 pl-2 sm:pl-4 border-l-2 border-slate-800">
                {session.lessons?.map((lesson, lIndex) => (
                  <div key={lIndex} className="flex flex-col gap-3 bg-slate-900 p-4 rounded-lg border border-white/5">
                    <div className="flex flex-col sm:flex-row gap-2">
                       <input type="text" value={lesson.title} onChange={(e) => handleLessonChange(sIndex, lIndex, 'title', e.target.value)} className="flex-1 bg-slate-800 border border-transparent rounded p-2 text-sm text-white focus:border-blue-500 outline-none font-medium"/>
                       <select value={lesson.type} onChange={(e) => handleLessonChange(sIndex, lIndex, 'type', e.target.value)} className="bg-slate-800 text-xs text-slate-300 p-2 rounded outline-none border border-white/5 shrink-0">
                         <option value="theory">Teoría</option>
                         <option value="practice">Práctica</option>
                       </select>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-3 mt-1">
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 text-slate-400 text-sm font-bold">XP: 
                          <input type="number" value={lesson.xpReward} onChange={(e) => handleLessonChange(sIndex, lIndex, 'xpReward', parseInt(e.target.value))} className="w-20 bg-slate-950 border border-white/10 rounded p-1.5 text-yellow-400 outline-none text-center"/>
                        </label>
                      </div>
                      <button onClick={() => setEditingLessonContent({sIndex, lIndex})} className="flex items-center gap-2 text-xs bg-amber-600/20 text-amber-400 hover:bg-amber-600/40 px-3 py-1.5 rounded-lg font-bold transition-colors border border-amber-500/30">
                        <Edit3 className="w-3 h-3" /> Editar Contenido y Quiz
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// SUBCOMPONENTE: EDITOR DE JUEGOS SIMPLIFICADO
// ----------------------------------------------------------------------
function EditGameForm({ game, flatLessons, onSave, onCancel }) {
  const [formData, setFormData] = useState({ ...game });

  const handleSave = () => {
     const finalData = {
       ...formData,
       xpReward: parseInt(formData.xpReward) || 0,
       requiredLessonName: flatLessons.find(l => l.id === formData.requiredLessonId)?.title || "",
     };
     onSave(finalData);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center border-b border-white/10 pb-4">
        <h3 className="text-lg font-black text-pink-400 flex items-center gap-2"><Gamepad2 className="w-5 h-5"/> Configurando Simulador</h3>
        <div className="flex gap-2">
          <button onClick={onCancel} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-bold border border-white/10">Cancelar</button>
          <button onClick={handleSave} className="px-4 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded-lg text-sm font-bold flex items-center gap-2"><Save className="w-4 h-4"/> Guardar Cambios</button>
        </div>
      </div>

      <div className="space-y-4 max-w-2xl">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Título del Simulador</label>
          <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white font-medium focus:border-pink-500 outline-none"/>
        </div>
        
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Descripción corta</label>
          <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white text-sm focus:border-pink-500 outline-none" rows={2}/>
        </div>
        
        <div className="flex gap-4">
          <div className="w-1/3">
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Recompensa (XP)</label>
            <input type="number" value={formData.xpReward} onChange={(e) => setFormData({...formData, xpReward: parseInt(e.target.value)})} className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-yellow-400 font-bold outline-none"/>
          </div>
        </div>
        
        <div className="bg-slate-950 p-5 rounded-xl border border-white/5 mt-6">
           <label className="block text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-2"><Lock className="w-4 h-4"/> Desbloquear después de:</label>
           <select 
              value={formData.requiredLessonId || ''} 
              onChange={(e) => setFormData({...formData, requiredLessonId: e.target.value})}
              className="w-full bg-slate-900 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-blue-500 outline-none"
           >
             <option value="">Ninguna (Siempre desbloqueado)</option>
             {flatLessons.map(lesson => (
               <option key={lesson.id} value={lesson.id}>{lesson.title}</option>
             ))}
           </select>
           <p className="text-xs text-slate-500 mt-3">El estudiante debe completar la misión seleccionada para poder entrar a jugar a este simulador.</p>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// RESTO DE SUBCOMPONENTES (EDITOR DE LECCIÓN Y VISTA PREVIA)
// ----------------------------------------------------------------------
function LessonContentEditor({ lesson, onSave, onCancel }) {
  const [localLesson, setLocalLesson] = useState(() => {
    const copy = JSON.parse(JSON.stringify(lesson));
    if (!copy.content) copy.content = [];
    if (!copy.quiz) copy.quiz = [];
    return copy;
  });

  const addContentBlock = (type) => {
    const newBlock = { type, value: '' };
    if (type === 'list') newBlock.items = ['Nuevo elemento'];
    if (type === 'youtube') newBlock.url = '';
    setLocalLesson(prev => ({ ...prev, content: [...prev.content, newBlock] }));
  };

  const updateContentBlock = (index, field, value) => {
    setLocalLesson(prev => {
      const newContent = [...prev.content];
      newContent[index][field] = value;
      return { ...prev, content: newContent };
    });
  };

  const removeContentBlock = (index) => {
    setLocalLesson(prev => ({ ...prev, content: prev.content.filter((_, i) => i !== index) }));
  };

  const addQuizQuestion = () => {
    const newQuiz = { question: 'Nueva pregunta', options: ['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4'], correctAnswer: 0 };
    setLocalLesson(prev => ({ ...prev, quiz: [...prev.quiz, newQuiz] }));
  };

  const updateQuizQuestion = (qIndex, field, value) => {
    setLocalLesson(prev => {
      const newQuiz = [...prev.quiz];
      newQuiz[qIndex][field] = value;
      return { ...prev, quiz: newQuiz };
    });
  };

  const updateQuizOption = (qIndex, optIndex, value) => {
    setLocalLesson(prev => {
      const newQuiz = [...prev.quiz];
      newQuiz[qIndex].options[optIndex] = value;
      return { ...prev, quiz: newQuiz };
    });
  };

  const removeQuizQuestion = (qIndex) => {
    setLocalLesson(prev => ({ ...prev, quiz: prev.quiz.filter((_, i) => i !== qIndex) }));
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
      <div className="flex justify-between items-center border-b border-white/10 pb-4">
        <div>
          <button onClick={onCancel} className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-bold mb-2 transition-colors">
            <ArrowLeft className="w-4 h-4"/> Volver a la Unidad
          </button>
          <h3 className="text-xl font-black text-amber-400">Editando Contenido: <span className="text-white">{localLesson.title}</span></h3>
        </div>
        <button onClick={() => onSave(localLesson)} className="px-5 py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg shadow-green-600/20">
          <Save className="w-5 h-5"/> Guardar Contenido
        </button>
      </div>

      <div className="bg-slate-950/50 p-6 rounded-2xl border border-white/5">
        <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-blue-400"/> Material de Estudio</h4>
        <div className="space-y-4">
          {localLesson.content.map((block, idx) => (
            <div key={idx} className="bg-slate-900 border border-white/10 rounded-xl p-4 relative group">
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => removeContentBlock(idx)} className="p-1.5 bg-red-500/20 text-red-400 hover:bg-red-500/40 rounded-lg"><Trash2 className="w-4 h-4"/></button>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold text-slate-500 uppercase bg-slate-800 px-2 py-1 rounded">
                  {block.type === 'subtitle' ? 'Subtítulo' : block.type === 'text' ? 'Párrafo' : block.type === 'list' ? 'Lista' : 'Video YouTube'}
                </span>
              </div>
              {(block.type === 'subtitle' || block.type === 'text') && (
                <textarea value={block.value} onChange={(e) => updateContentBlock(idx, 'value', e.target.value)} className={`w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-blue-500 ${block.type === 'subtitle' ? 'font-bold text-lg' : 'text-sm h-24'}`}/>
              )}
              {block.type === 'list' && (
                <textarea value={block.items?.join('\n')} onChange={(e) => updateContentBlock(idx, 'items', e.target.value.split('\n'))} className="w-full h-32 bg-slate-950 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-blue-500 text-sm leading-relaxed" placeholder="Elemento 1&#10;Elemento 2"/>
              )}
             {block.type === 'youtube' && (
               <div className="flex items-center gap-3 bg-slate-950 p-4 rounded-xl border border-white/5">
                  <Video className="w-6 h-6 text-red-500" />
                  <input type="text" value={block.url || ''} onChange={(e) => updateContentBlock(idx, 'url', e.target.value)} placeholder="URL de YouTube..." className="flex-1 bg-transparent text-white outline-none"/>
               </div>
             )}
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button onClick={() => addContentBlock('subtitle')} className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-xs font-bold border border-white/5 flex items-center gap-1"><Type className="w-3 h-3"/> Subtítulo</button>
          <button onClick={() => addContentBlock('text')} className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-xs font-bold border border-white/5 flex items-center gap-1"><FileText className="w-3 h-3"/> Párrafo</button>
          <button onClick={() => addContentBlock('list')} className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-xs font-bold border border-white/5 flex items-center gap-1"><List className="w-3 h-3"/> Lista</button>
          <button onClick={() => addContentBlock('youtube')} className="px-3 py-1.5 bg-red-600/20 text-red-400 rounded-lg text-xs font-bold border border-red-500/30 flex items-center gap-1"><Video className="w-3 h-3"/> YouTube</button>
        </div>
      </div>

      <div className="bg-slate-950/50 p-6 rounded-2xl border border-white/5">
        <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><MessageSquare className="w-5 h-5 text-yellow-400"/> Reto de Conocimiento (Cuestionario)</h4>
        <div className="space-y-6">
          {localLesson.quiz.map((q, qIdx) => (
            <div key={qIdx} className="bg-slate-900 border border-white/10 rounded-xl p-5 relative">
              <button onClick={() => removeQuizQuestion(qIdx)} className="absolute top-4 right-4 p-1.5 bg-red-500/20 text-red-400 hover:bg-red-500/40 rounded-lg"><Trash2 className="w-4 h-4"/></button>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Pregunta {qIdx + 1}</label>
              <textarea value={q.question} onChange={(e) => updateQuizQuestion(qIdx, 'question', e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-white font-medium outline-none focus:border-amber-500 mb-4" rows={2}/>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Opciones de Respuesta</label>
              <div className="space-y-2">
                {q.options.map((opt, optIdx) => (
                  <div key={optIdx} className="flex items-center gap-3">
                    <input type="radio" name={`correct-${qIdx}`} checked={q.correctAnswer === optIdx} onChange={() => updateQuizQuestion(qIdx, 'correctAnswer', optIdx)} className="w-4 h-4 accent-green-500 cursor-pointer"/>
                    <input type="text" value={opt} onChange={(e) => updateQuizOption(qIdx, optIdx, e.target.value)} className={`flex-1 bg-slate-950 border rounded-lg p-2 text-sm text-white outline-none ${q.correctAnswer === optIdx ? 'border-green-500/50' : 'border-white/10 focus:border-blue-500'}`}/>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <button onClick={addQuizQuestion} className="px-4 py-2 bg-yellow-600/20 text-yellow-400 hover:bg-yellow-600/30 rounded-xl text-sm font-bold border border-yellow-500/30 flex items-center gap-2"><Plus className="w-4 h-4"/> Añadir Pregunta</button>
        </div>
      </div>
    </div>
  );
}

function TeacherLessonPreview({ lesson, onClose }) {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  const hasContent = lesson.content && lesson.content.length > 0;
  const hasQuiz = lesson.quiz && lesson.quiz.length > 0;
  const currentQuestion = hasQuiz ? lesson.quiz[currentQuizIndex] : null;

  const handleCheckAnswer = () => { if (selectedOption === null) return; setIsAnswerChecked(true); };
  const handleNextQuestion = () => {
    if (currentQuizIndex < lesson.quiz.length - 1) { setCurrentQuizIndex(prev => prev + 1); setSelectedOption(null); setIsAnswerChecked(false); } 
    else { setCurrentQuizIndex(0); setSelectedOption(null); setIsAnswerChecked(false); alert("¡Simulación finalizada!"); }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#050B14] flex flex-col font-sans h-screen overflow-hidden text-slate-300">
      <header className="bg-slate-900/90 backdrop-blur-md border-b border-white/5 p-4 flex justify-between items-center shrink-0 shadow-lg">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors flex items-center gap-2 font-bold text-sm">
            <ArrowLeft className="w-4 h-4"/> Volver al Panel
          </button>
        </div>
        <h2 className="text-white font-bold text-lg truncate">{lesson.title}</h2>
      </header>
      <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
        <div className="max-w-4xl mx-auto space-y-12 pb-32">
          {hasContent && (
            <div className="bg-slate-900/50 border border-white/5 rounded-3xl p-6 md:p-10 shadow-2xl space-y-6">
               {lesson.content.map((block, idx) => {
                 if (block.type === 'subtitle') return <h3 key={idx} className="text-xl md:text-2xl font-bold text-white border-b border-white/10 pb-2 mt-8">{block.value}</h3>;
                 if (block.type === 'text') return <p key={idx} className="text-slate-300 leading-relaxed text-lg">{block.value}</p>;
                 if (block.type === 'list') return <ul key={idx} className="space-y-3 bg-slate-950/50 p-6 rounded-xl border border-white/5">{block.items.map((item, i) => (<li key={i} className="flex gap-3 text-slate-300 leading-relaxed"><CheckCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" /><span>{item}</span></li>))}</ul>;
                 if (block.type === 'youtube') {
                   const videoId = getYouTubeId(block.url);
                   return videoId ? <div key={idx} className="w-full aspect-video bg-slate-950 rounded-2xl overflow-hidden border border-white/10 relative shadow-lg my-6"><iframe className="w-full h-full absolute top-0 left-0" src={`https://www.youtube.com/embed/${videoId}?rel=0`} title="YouTube" frameBorder="0" allowFullScreen></iframe></div> : null;
                 }
                 return null;
               })}
            </div>
          )}
          {hasQuiz && (
            <div className="bg-gradient-to-b from-blue-900/20 to-slate-900/50 border border-blue-500/30 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
               <p className="text-xl md:text-2xl text-white font-medium mb-8 leading-tight">{currentQuestion.question}</p>
               <div className="space-y-3">
                 {currentQuestion.options.map((option, idx) => {
                   let cardClass = "bg-slate-800/50 border-white/10 text-slate-300";
                   if (isAnswerChecked) {
                     if (idx === currentQuestion.correctAnswer) cardClass = "bg-green-500/20 border-green-500 text-green-300"; 
                     else if (idx === selectedOption) cardClass = "bg-red-500/20 border-red-500 text-red-300"; 
                   } else if (selectedOption === idx) cardClass = "bg-blue-600 border-blue-400 text-white"; 
                   return <button key={idx} disabled={isAnswerChecked} onClick={() => setSelectedOption(idx)} className={`w-full text-left p-5 rounded-xl border-2 transition-all font-medium ${cardClass}`}>{option}</button>;
                 })}
               </div>
               <div className="mt-8 flex justify-end">
                 {!isAnswerChecked ? <button onClick={handleCheckAnswer} disabled={selectedOption === null} className="px-8 py-3 rounded-xl font-bold bg-blue-600 text-white">Verificar</button> : <button onClick={handleNextQuestion} className="px-8 py-3 rounded-xl font-bold bg-white text-slate-900">Siguiente</button>}
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function GameRenderer({ game, onBack }) {
    const gameProps = { game, onBack, onComplete: () => {}, isAlreadyCompleted: false, isPreviewMode: true };
    switch (game.type) {
      case 'memory': return <MemoryGameView {...gameProps} />;
      case 'hangman': return <HangmanGameView {...gameProps} />;
      case 'timeattack': return <TimeAttackGameView {...gameProps} />;
      case 'sorting': return <SortingGameView {...gameProps} />;
      case 'prompt': return <PromptGameView {...gameProps} />;
      case 'scenario': return <ScenarioGameView {...gameProps} />;
      default: return <div className="text-white p-10">Simulador no soportado.</div>;
    }
}

function SidebarBtn({ icon, label, isActive, onClick }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/20' : 'hover:bg-white/5 text-slate-400 hover:text-white'}`}>
      <span className="w-5 h-5">{icon}</span> {label}
    </button>
  );
}

function MobileTabBtn({ label, isActive, onClick }) {
  return (
    <button onClick={onClick} className={`flex-1 py-2 text-xs font-bold rounded-lg truncate px-1 ${isActive ? 'bg-amber-600 text-white' : 'text-slate-400'}`}>{label}</button>
  );
}