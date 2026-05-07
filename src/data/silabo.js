// Estructura completa de datos para las Misiones (Sílabo)
// Basado en: "Fundamentos de Tecnologías de la Información / Tecnologías Emergentes"

export const silabo = [
  // =======================================================================
  // UNIDAD 1
  // =======================================================================
  {
    id: "unit_1",
    title: "UT 1: Introducción general a las Tecnologías Emergentes y a la IA",
    description: "Comprende las bases de las tecnologías disruptivas y la Inteligencia Artificial.",
    totalXp: 400,
    sessions: [
      {
        id: "u1_s2",
        name: "Sesión 2: Conceptos Base",
        lessons: [
          { 
            id: "l1_1", 
            title: "1.1 Introducción al concepto de Tecnologías Emergentes", 
            type: "theory", 
            xpReward: 50,
            isUnlocked: true,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "Las tecnologías emergentes son innovaciones tecnológicas en desarrollo o en fase de adopción temprana. Poseen el potencial de transformar radicalmente las industrias, la economía y la sociedad." },
              { type: "subtitle", value: "Características Principales" },
              { type: "list", items: [
                "Novedad Radical: Introducen capacidades inéditas.",
                "Crecimiento Rápido: Evolución acelerada que vuelve obsoleto lo anterior.",
                "Incertidumbre: Sus aplicaciones finales y límites aún están en descubrimiento."
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso" },
              { type: "text", value: "Ejemplos clásicos incluyen la Impresión 3D aplicada a la creación de prótesis médicas, o la Computación Cuántica usada para resolver algoritmos complejos en segundos que a computadoras normales les tomaría años." },
              { type: "youtube", url: "https://www.youtube.com/watch?v=kYJmI9I2d0k" }
            ],
            quiz: [
              { question: "¿Qué define a una tecnología emergente?", options: ["Un invento de hace 50 años", "Una innovación en desarrollo con potencial de transformar industrias", "Una técnica manual", "Un software desactualizado"], correctAnswer: 1 },
              { question: "¿Cuál es una característica clave de las tecnologías emergentes?", options: ["Crecimiento estático", "Uso exclusivo en hogares", "Incertidumbre sobre sus aplicaciones finales", "Son siempre gratuitas"], correctAnswer: 2 },
              { question: "¿Qué característica se refiere a la 'Novedad Radical'?", options: ["Es una copia de otra tecnología", "Introduce capacidades que antes no existían", "Solo funciona en internet", "Tarda mucho en aprenderse"], correctAnswer: 1 },
              { question: "Un ejemplo de uso de la Impresión 3D como tecnología emergente es:", options: ["Imprimir documentos de Word", "Creación de prótesis médicas", "Enviar correos", "Jugar videojuegos"], correctAnswer: 1 },
              { question: "¿Por qué el crecimiento de estas tecnologías se considera 'Rápido'?", options: ["Porque pesan poco en megabytes", "Porque su evolución acelera rápidamente dejando lo anterior obsoleto", "Porque viajan a la velocidad de la luz", "Porque se instalan rápido"], correctAnswer: 1 }
            ]
          },
          { 
            id: "l1_2", 
            title: "1.2 Introducción general a la Inteligencia Artificial (IA)", 
            type: "theory", 
            xpReward: 50,
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "La IA es un campo de la informática dedicado a crear sistemas capaces de realizar tareas que requieren inteligencia humana, como reconocimiento de voz, razonamiento y aprendizaje." },
              { type: "subtitle", value: "Características Principales" },
              { type: "list", items: [
                "Aprendizaje Automático: Mejoran mediante exposición a datos.",
                "Procesamiento de Lenguaje Natural: Entienden comunicación humana.",
                "Autonomía: Toman decisiones sin intervención constante."
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso" },
              { type: "text", value: "Siri o Alexa usando lenguaje natural, algoritmos de Netflix recomendando películas, y programas médicos detectando tumores en radiografías con más precisión que el ojo humano." },
              { type: "youtube", url: "https://www.youtube.com/watch?v=8lMIdrlIWOQ" }
            ],
            quiz: [
              { question: "¿Cuál es el objetivo principal de la IA?", options: ["Reemplazar monitores", "Realizar tareas que requieren inteligencia humana", "Crear páginas web", "Imprimir en 3D"], correctAnswer: 1 },
              { question: "¿Qué característica permite a la IA mejorar con el tiempo?", options: ["Autonomía", "Aprendizaje Automático", "Energía solar", "El teclado"], correctAnswer: 1 },
              { question: "El Procesamiento de Lenguaje Natural (NLP) permite a la IA:", options: ["Hablar con animales", "Entender y procesar la comunicación humana", "Traducir código binario", "Aumentar la memoria RAM"], correctAnswer: 1 },
              { question: "¿Cuál es un caso de uso de IA en la medicina?", options: ["Llenar encuestas", "Detección de tumores en radiografías", "Limpiar hospitales", "Vender medicinas"], correctAnswer: 1 },
              { question: "La capacidad de un sistema IA para tomar decisiones por sí solo se llama:", options: ["Autonomía", "Dependencia", "Sincronización", "Renderizado"], correctAnswer: 0 }
            ]
          }
        ]
      },
      {
        id: "u1_s3",
        name: "Sesión 3: Intersección y Proyecto en Aula",
        lessons: [
          { 
            id: "l1_3", 
            title: "1.3 La intersección entre Tecnologías Emergentes e IA", 
            type: "theory", 
            xpReward: 50,
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "Es el punto de convergencia donde la IA actúa como el procesador central (cerebro) que potencia y dirige las capacidades de otras tecnologías emergentes." },
              { type: "subtitle", value: "Características Principales" },
              { type: "list", items: [
                "Sinergia: El resultado conjunto es mayor que las partes por separado.",
                "Automatización Avanzada: Procesos físicos que se controlan solos en tiempo real.",
                "Toma de decisiones descentralizada."
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso" },
              { type: "text", value: "La combinación de IA + Internet de las Cosas (AIoT). Ejemplo: Termostatos inteligentes que aprenden a qué hora llegas a casa para ajustar la temperatura y ahorrar energía." },
              { type: "youtube", url: "https://www.youtube.com/watch?v=qsE2Yc4HkEQ" }
            ],
            quiz: [
              { question: "¿Qué se entiende por la intersección de tecnologías?", options: ["Cuando dos cables se cruzan", "El punto donde la IA potencia otras tecnologías", "Un programa que falla", "Un firewall"], correctAnswer: 1 },
              { question: "En la combinación AIoT (IA + IoT), ¿qué función cumple la IA?", options: ["Es el hardware físico", "Actúa como el 'cerebro' que procesa", "Es la pantalla del dispositivo", "No hace nada"], correctAnswer: 1 },
              { question: "¿Qué significa 'Sinergia' tecnológica?", options: ["Que consumen más energía", "Que el resultado conjunto es mayor que las partes separadas", "Que son independientes", "Que se anulan mutuamente"], correctAnswer: 1 },
              { question: "Un ejemplo claro de AIoT en el hogar es:", options: ["Una silla de madera", "Un termostato inteligente que aprende tus rutinas", "Un televisor de tubo", "Un ventilador manual"], correctAnswer: 1 },
              { question: "Esta intersección permite lograr una:", options: ["Desautomatización", "Automatización Avanzada", "Caída de red", "Pérdida de datos"], correctAnswer: 1 }
            ]
          },
          { 
            id: "l1_4", 
            title: "1.4 Impacto, desafíos y futuro", 
            type: "theory", 
            xpReward: 50,
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "Se refiere a las consecuencias sociales, éticas y laborales que trae la adopción masiva de la Inteligencia Artificial y tecnologías disruptivas." },
              { type: "subtitle", value: "Características Principales" },
              { type: "list", items: [
                "Desplazamiento Laboral: Reemplazo de tareas repetitivas.",
                "Sesgos Algorítmicos: Adopción de prejuicios humanos en las decisiones de la IA.",
                "Problema de Caja Negra: Incapacidad de rastrear el razonamiento de una IA."
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso" },
              { type: "text", value: "Casos como algoritmos de contratación de empresas que penalizaban currículums de mujeres debido a un sesgo histórico en los datos con los que fueron entrenados." },
              { type: "youtube", url: "https://www.youtube.com/watch?v=qsE2Yc4HkEQ" }
            ],
            quiz: [
              { question: "¿Cuál es un impacto directo de la IA en el mercado laboral?", options: ["Aumenta el trabajo manual", "Desplazamiento de tareas repetitivas", "Todos ganan más dinero", "Prohíbe usar computadoras"], correctAnswer: 1 },
              { question: "¿A qué se llama 'Sesgo Algorítmico'?", options: ["Cuando la IA funciona muy rápido", "La adopción de prejuicios humanos en las decisiones de la IA", "Un virus informático", "Cuando la IA se apaga sola"], correctAnswer: 1 },
              { question: "¿Qué es el problema de la 'Caja Negra'?", options: ["Falta de luz en el servidor", "La incapacidad de rastrear el razonamiento de una IA", "Un disco duro quemado", "Falta de conexión"], correctAnswer: 1 },
              { question: "¿Cuál es un ejemplo de sesgo en recursos humanos?", options: ["Contratar al azar", "Algoritmos penalizando ciertos currículums por datos históricos", "Pagar mediante IA", "Entrevistar por zoom"], correctAnswer: 1 },
              { question: "A pesar de los desafíos, la IA promete un futuro de:", options: ["Mayor ineficiencia", "Innovación y automatización avanzada", "Regreso a tecnologías análogas", "Lentitud de procesos"], correctAnswer: 1 }
            ]
          },
          { 
            id: "l1_5", 
            title: "1.5 Estrategia para la elaboración del tema", 
            type: "practice", 
            xpReward: 60,
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "Es el proceso metodológico de identificar una necesidad o problemática real en el entorno para plantear una solución basada en tecnología." },
              { type: "subtitle", value: "Características Principales" },
              { type: "list", items: [
                "Especificidad: El tema debe estar delimitado y no ser demasiado general.",
                "Viabilidad: Debe ser posible realizarlo con los recursos actuales.",
                "Innovación: Aportar un enfoque fresco usando tecnología."
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso" },
              { type: "text", value: "En lugar de 'Usar IA en la agricultura', un tema correcto sería 'Sistema IoT e IA para optimización de riego en cultivos de maíz en Manabí'." },
              { type: "youtube", url: "https://www.youtube.com/watch?v=qM2vjQ5t16A" }
            ],
            quiz: [
              { question: "¿Cuál es el primer paso para plantear un tema de proyecto?", options: ["Comprar servidores", "Identificar una problemática real", "Crear la portada", "Hacer diapositivas"], correctAnswer: 1 },
              { question: "Un tema de proyecto debe ser:", options: ["Extremadamente general", "Específico y delimitado", "Imposible de realizar", "Ambiguo"], correctAnswer: 1 },
              { question: "¿Qué significa que el proyecto sea 'Viable'?", options: ["Que es barato", "Que es posible realizarlo con los recursos actuales", "Que viaja por internet", "Que usa mucha memoria"], correctAnswer: 1 },
              { question: "¿Por qué 'Usar IA en la agricultura' es un mal tema?", options: ["Porque es aburrido", "Porque es demasiado general y no delimitado", "Porque la IA no sirve en el campo", "Porque es muy corto"], correctAnswer: 1 },
              { question: "La innovación en el tema se refiere a:", options: ["Copiar proyectos de internet", "Aportar un enfoque fresco usando tecnología para resolver el problema", "No usar computadoras", "Hacerlo en otro idioma"], correctAnswer: 1 }
            ]
          },
          { 
            id: "l1_6", 
            title: "1.6 Estrategia para hacer la introducción", 
            type: "practice", 
            xpReward: 60,
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "La introducción es la carta de presentación de una investigación. Contextualiza al lector sobre el problema, el propósito y la estructura del documento." },
              { type: "subtitle", value: "Características Principales" },
              { type: "list", items: [
                "Contextualización: Describe el escenario del problema.",
                "Propósito: Responde al 'qué' y 'por qué' del estudio.",
                "Estructura: Anticipa brevemente cómo se dividirá el trabajo."
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso" },
              { type: "text", value: "Empezar describiendo datos globales sobre el desperdicio de agua, para luego aterrizar en la necesidad del proyecto de riego inteligente propuesto." },
              { type: "youtube", url: "https://www.youtube.com/watch?v=Hntg2VqWj0I" }
            ],
            quiz: [
              { question: "¿Qué propósito principal cumple la introducción?", options: ["Agradecer a los profesores", "Contextualizar al lector sobre el problema y propósito", "Mostrar la bibliografía", "Poner el índice"], correctAnswer: 1 },
              { question: "¿Qué preguntas clave debe responder una buena introducción?", options: ["¿Cuándo y dónde nací?", "¿Qué se va a hacer y por qué?", "¿Cuánto cuesta?", "¿Quién tiene la culpa?"], correctAnswer: 1 },
              { question: "La contextualización en la introducción sirve para:", options: ["Describir el escenario del problema", "Hacer relleno de texto", "Poner imágenes", "Cerrar el proyecto"], correctAnswer: 0 },
              { question: "¿Se debe detallar el presupuesto completo en la introducción?", options: ["Sí, es obligatorio", "No, eso va en capítulos posteriores", "Solo si es en dólares", "Depende del profesor"], correctAnswer: 1 },
              { question: "Indicar cómo se dividirá el trabajo en la introducción corresponde a:", options: ["Contextualización", "La Estructura", "La Dedicatoria", "Los Anexos"], correctAnswer: 1 }
            ]
          }
        ]
      }
    ]
  },

  // =======================================================================
  // UNIDAD 2
  // =======================================================================
  {
    id: "unit_2",
    title: "UT 2: Gestión de Conocimientos y Avances",
    description: "Metodologías de investigación y gestión de la información empresarial.",
    totalXp: 500,
    sessions: [
      {
        id: "u2_s4",
        name: "Sesión 4: Fundamentos y Formulación",
        lessons: [
          { 
            id: "l2_1", 
            title: "2.1 Fundamentos de la gestión del conocimiento", 
            type: "theory", 
            xpReward: 50, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "Es el proceso de capturar, distribuir y utilizar eficazmente el conocimiento dentro de una organización para generar ventaja competitiva." },
              { type: "subtitle", value: "Características Principales" },
              { type: "list", items: [
                "Conocimiento Explícito: Fácil de documentar (manuales, bases de datos).",
                "Conocimiento Tácito: Difícil de transferir, basado en la experiencia e intuición personal."
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso" },
              { type: "text", value: "La creación de una 'Wiki' interna en una empresa donde los empleados veteranos redactan manuales para los empleados nuevos." }
            ],
            quiz: [
              { question: "¿Cuál es el objetivo de la Gestión del Conocimiento?", options: ["Perder información", "Capturar y utilizar el conocimiento de una organización", "Ocultar manuales", "Imprimir más papel"], correctAnswer: 1 },
              { question: "¿Qué es el Conocimiento Explícito?", options: ["Experiencia personal", "El que es fácil de documentar", "El que no se puede escribir", "El que se olvida"], correctAnswer: 1 },
              { question: "¿Qué es el Conocimiento Tácito?", options: ["Bases de datos", "Manuales", "Conocimiento arraigado en la intuición personal", "Libros"], correctAnswer: 2 },
              { question: "¿Por qué el conocimiento tácito es un desafío?", options: ["Ocupa mucho disco duro", "Es difícil de transferir si el empleado se va", "Es muy barato", "Se borra con antivirus"], correctAnswer: 1 },
              { question: "Una 'Wiki' corporativa es un ejemplo de:", options: ["Transformar conocimiento tácito en explícito", "Juego de rol", "Red social", "Pérdida de tiempo"], correctAnswer: 0 }
            ]
          },
          { 
            id: "l2_2", 
            title: "2.2 Avances tecnológicos en la gestión", 
            type: "theory", 
            xpReward: 50, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "Aplicación de herramientas tecnológicas modernas para almacenar, proteger y distribuir el capital intelectual de una empresa." }
            ],
            quiz: [
              { question: "¿Qué avance tecnológico revolucionó el acceso remoto a la información?", options: ["El disquete", "Cloud Computing", "La máquina de escribir", "El telégrafo"], correctAnswer: 1 },
              { question: "¿Cómo ayuda la IA en la gestión de documentos?", options: ["Borra archivos", "Búsqueda inteligente", "Añade virus", "Imprime"], correctAnswer: 1 },
              { question: "Una ventaja del Cloud Computing es:", options: ["Colaboración global", "Discos físicos", "Es más lento", "Solo funciona de día"], correctAnswer: 0 },
              { question: "¿Qué reemplazó principalmente el almacenamiento en la nube?", options: ["Al teclado", "Servidores físicos locales", "A las pantallas", "Al internet"], correctAnswer: 1 },
              { question: "Microsoft 365 es ejemplo de:", options: ["Software malicioso", "Bases de datos análogos", "Colaboración en la nube", "Juegos de video"], correctAnswer: 2 }
            ]
          },
          { 
            id: "l2_3", 
            title: "2.3 Estrategias para formulación del problema", 
            type: "practice", 
            xpReward: 60, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "Es la estructuración formal de la idea de investigación. Generalmente se sintetiza en una pregunta concisa que guía todo el proyecto." }
            ],
            quiz: [
              { question: "¿Cómo se suele estructurar la formulación del problema?", options: ["Como un poema", "Como una pregunta de investigación", "Lista de compras", "Código de programación"], correctAnswer: 1 },
              { question: "Una buena pregunta de investigación debe tener:", options: ["Claridad y relación de variables", "Muchas palabras", "Respuestas de Sí o No", "Metáforas"], correctAnswer: 0 },
              { question: "En la formulación, 'relacionar variables' significa:", options: ["Código JavaScript", "Involucrar causa y efecto", "Sumar números", "Cambiar letra"], correctAnswer: 1 },
              { question: "¿Cuál de estas es una buena formulación?", options: ["¿Cómo hacer IA?", "¿De qué manera la IA reducirá tiempos?", "La IA es buena", "¿Cuándo se inventó la IA?"], correctAnswer: 1 },
              { question: "Formular correctamente el problema equivale a:", options: ["Terminar la tesis", "Estructurar la dirección del proyecto", "Reprobar", "Pagar"], correctAnswer: 1 }
            ]
          }
        ]
      },
      {
        id: "u2_s5",
        name: "Sesión 5: Aplicaciones y Objetivos",
        lessons: [
          { 
            id: "l2_4", 
            title: "2.4 Aplicaciones tecnológicas en la gestión", 
            type: "theory", 
            xpReward: 50, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "Se refiere al software específico (CRM, ERP) que automatizan la gestión del conocimiento." }
            ],
            quiz: [
              { question: "¿Qué hace un sistema CRM?", options: ["Repara computadoras", "Gestiona la relación con los clientes", "Imprime recibos", "Crea virus"], correctAnswer: 1 },
              { question: "La característica de 'Centralización' indica que:", options: ["Hay múltiples libretas", "La información está en un solo lugar", "Es secreta", "Solo el jefe la conoce"], correctAnswer: 1 },
              { question: "¿Por qué los chatbots son útiles?", options: ["Sirven café", "Resuelven dudas frecuentes automáticamente", "Se quejan", "Son adornos"], correctAnswer: 1 },
              { question: "¿Qué permite la 'Integración'?", options: ["Conectar departamentos de la empresa", "Desconectar internet", "Borrar información", "Trabajar sin energía"], correctAnswer: 0 },
              { question: "Un ERP sirve para:", options: ["Jugar", "Administrar los procesos del negocio", "Hacer presentaciones", "Música"], correctAnswer: 1 }
            ]
          },
          { 
            id: "l2_5", 
            title: "2.5 Cultura y adopción tecnológica", 
            type: "theory", 
            xpReward: 50, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "El estudio de cómo los valores de los empleados afectan la implementación tecnológica." }
            ],
            quiz: [
              { question: "¿Qué factor puede hacer fracasar un proyecto?", options: ["Velocidad del CPU", "La resistencia al cambio", "Color del software", "El monitor"], correctAnswer: 1 },
              { question: "¿A qué se debe la 'resistencia al cambio'?", options: ["Exceso de sueldo", "Miedo a lo desconocido", "Es gratuito", "Falta de papel"], correctAnswer: 1 },
              { question: "El Liderazgo Digital busca:", options: ["Prohibir la tecnología", "Fomentar la adopción de herramientas", "Despedir a todos", "Volver al papel"], correctAnswer: 1 },
              { question: "¿De qué sirve el mejor software si no hay capacitación?", options: ["De mucho", "De poco, el personal no sabrá usarlo", "Es indistinto", "Genera dinero"], correctAnswer: 1 },
              { question: "La adopción tecnológica es un tema de:", options: ["Hardware", "Licencias", "Cultura organizacional y mentalidad", "Cables"], correctAnswer: 2 }
            ]
          },
          { 
            id: "l2_6", 
            title: "2.6 Objetivos generales y específicos", 
            type: "practice", 
            xpReward: 60, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "Son las metas del proyecto. El general es la meta principal, los específicos son los pasos." }
            ],
            quiz: [
              { question: "¿Diferencia entre general y específico?", options: ["Ninguna", "El general es la meta final, específicos los pasos", "El general es opcional", "Son materiales"], correctAnswer: 1 },
              { question: "¿Cómo deben iniciar siempre los objetivos?", options: ["Sustantivo", "Pregunta", "Verbo en infinitivo", "Nombre del autor"], correctAnswer: 2 },
              { question: "¿Cuál es un verbo en infinitivo válido?", options: ["Analizando", "Analizar", "Analicé", "Análisis"], correctAnswer: 1 },
              { question: "¿Qué característica asegura medir el éxito?", options: ["Que sean medibles", "Que sean largos", "En inglés", "Imposibles"], correctAnswer: 0 },
              { question: "'Diseñar la base de datos' para hacer una App sería un objetivo:", options: ["General", "Específico", "Imposible", "Subjetivo"], correctAnswer: 1 }
            ]
          }
        ]
      },
      {
        id: "u2_s6",
        name: "Sesión 6: Ética y Justificación",
        lessons: [
          { 
            id: "l2_7", 
            title: "2.7 Aspectos éticos y legales", 
            type: "theory", 
            xpReward: 50, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "Leyes (como GDPR) que regulan el uso de datos." }
            ],
            quiz: [
              { question: "¿Por qué es importante la ética de datos?", options: ["Llenar el servidor", "Respetar la privacidad", "Venderlos", "No es importante"], correctAnswer: 1 },
              { question: "¿Qué significa 'Transparencia'?", options: ["Monitores de cristal", "Explicar al usuario qué se hace con sus datos", "Código invisible", "No usar contraseñas"], correctAnswer: 1 },
              { question: "¿Qué es la GDPR?", options: ["Un juego", "Ley de protección de datos", "Lenguaje", "Hardware"], correctAnswer: 1 },
              { question: "Vender datos sin permiso es:", options: ["Buena práctica", "Violación ética y legal", "Común", "Avance tecnológico"], correctAnswer: 1 },
              { question: "Para manejar datos se requiere:", options: ["Dinero", "Consentimiento explícito del usuario", "Computadora", "Contraseña"], correctAnswer: 1 }
            ]
          },
          { 
            id: "l2_8", 
            title: "2.8 Estrategias para hacer la justificación", 
            type: "practice", 
            xpReward: 60, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "Sección que defiende la necesidad del proyecto." }
            ],
            quiz: [
              { question: "¿Qué preguntas responde la Justificación?", options: ["¿Cómo y cuándo?", "¿Por qué y Para qué?", "¿Quién y cuánto?", "¿Dónde?"], correctAnswer: 1 },
              { question: "A quién beneficia el proyecto establece su:", options: ["Relevancia Social", "Presupuesto", "Conclusión", "Anexo"], correctAnswer: 0 },
              { question: "Qué aporta a la Informática establece su:", options: ["Relevancia Tecnológica", "Relevancia Médica", "Introducción", "Índice"], correctAnswer: 0 },
              { question: "La justificación sirve para:", options: ["Rellenar", "Convencer de la necesidad e importancia", "Listar equipos", "Bibliografía"], correctAnswer: 1 },
              { question: "Si un proyecto no tiene justificación:", options: ["Es fácil", "Puede ser rechazado por falta de utilidad", "Mejor nota", "Se vuelve IA"], correctAnswer: 1 }
            ]
          }
        ]
      }
    ]
  },

  // =======================================================================
  // UNIDAD 3
  // =======================================================================
  {
    id: "unit_3",
    title: "UT 3: Sistemas basados en Conocimiento (IoT y Blockchain)",
    description: "Aplicación práctica de IoT, IA Generativa, Cloud Computing y Blockchain.",
    totalXp: 450,
    sessions: [
      {
        id: "u3_s7",
        name: "Sesión 7: IoT e IA Generativa",
        lessons: [
          { 
            id: "l3_1", 
            title: "3.1 Integración con el Internet de las Cosas (IoT)", 
            type: "theory", 
            xpReward: 50, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "El IoT es la red de objetos físicos que llevan sensores y se conectan a internet." }
            ],
            quiz: [
              { question: "¿Qué significan las siglas IoT?", options: ["Internet of Technology", "Internet of Things", "Internal Output", "Intelligent Tool"], correctAnswer: 1 },
              { question: "Componente clave de un objeto IoT:", options: ["Pantalla", "Sensores y conexión a internet", "Metal", "Batería infinita"], correctAnswer: 1 },
              { question: "¿Qué hace un sensor IoT?", options: ["Crea webs", "Recopila variables físicas", "Elimina virus", "Imprime en 3D"], correctAnswer: 1 },
              { question: "Un ejemplo claro de IoT es:", options: ["Libro", "Sensores de humedad conectados", "Máquina de escribir", "Guitarra"], correctAnswer: 1 },
              { question: "La conectividad en IoT se logra mediante:", options: ["Cables VGA", "Wi-Fi, 5G, Bluetooth", "Cuerdas", "Señales de humo"], correctAnswer: 1 }
            ]
          },
          { 
            id: "l3_2", 
            title: "3.2 Aplicación en Inteligencia Artificial Generativa", 
            type: "theory", 
            xpReward: 50, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "La IA Generativa usa redes neuronales profundas para crear contenido nuevo." }
            ],
            quiz: [
              { question: "¿Qué diferencia a la IA Generativa?", options: ["Es más lenta", "Crea contenido nuevo y sintético", "No usa internet", "Solo en celulares"], correctAnswer: 1 },
              { question: "¿Cómo se llama la instrucción de texto que se le da?", options: ["Código", "Prompt", "Script", "Macro"], correctAnswer: 1 },
              { question: "ChatGPT está basado en:", options: ["Imágenes", "Modelos de Lenguaje Grande (LLMs)", "Cálculo 3D", "Robótica"], correctAnswer: 1 },
              { question: "Midjourney se especializa en:", options: ["Generar imágenes desde texto", "Hacer hojas de cálculo", "Limpiar malware", "Manejar vehículos"], correctAnswer: 0 },
              { question: "La IA Generativa puede programar:", options: ["Falso", "Verdadero, puede generar código", "Solo HTML", "Es ilegal"], correctAnswer: 1 }
            ]
          }
        ]
      },
      {
        id: "u3_s8",
        name: "Sesión 8: Cloud, Edge y Blockchain",
        lessons: [
          { 
            id: "l3_3", 
            title: "3.3 Cloud y Edge Computing", 
            type: "theory", 
            xpReward: 50, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "Cloud procesa en servidores remotos. Edge procesa localmente." }
            ],
            quiz: [
              { question: "¿Dónde procesa Cloud?", options: ["Celular", "Servidores centrales remotos", "Pendrive", "RAM local"], correctAnswer: 1 },
              { question: "¿Dónde procesa Edge?", options: ["Nube", "Localmente cerca del dispositivo", "Google", "Papel"], correctAnswer: 1 },
              { question: "Principal ventaja de Edge:", options: ["Capacidad", "Baja latencia", "En línea", "Monitor"], correctAnswer: 1 },
              { question: "Para un carro autónomo es mejor:", options: ["Cloud", "Edge Computing", "Correo", "Nada"], correctAnswer: 1 },
              { question: "Cloud destaca por:", options: ["Sin internet", "Alta capacidad masiva", "Local", "Incapacidad"], correctAnswer: 1 }
            ]
          },
          { 
            id: "l3_4", 
            title: "3.4 Blockchain para verificación", 
            type: "theory", 
            xpReward: 50, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "Libro de registros descentralizado e inmutable." }
            ],
            quiz: [
              { question: "¿Qué es Blockchain?", options: ["Editor", "Libro de registros digital descentralizado", "Servidor", "Red social"], correctAnswer: 1 },
              { question: "'Inmutabilidad' significa:", options: ["Transparentes", "No se puede alterar ni borrar en secreto", "Se cae", "Hielo"], correctAnswer: 1 },
              { question: "¿Por qué es descentralizado?", options: ["No depende de un único servidor", "No funciona", "Tiene administrador", "Usa cables"], correctAnswer: 0 },
              { question: "Un uso corporativo es:", options: ["Solitario", "Trazabilidad segura", "Música", "Fotos"], correctAnswer: 1 },
              { question: "¿Cómo se aseguran los bloques?", options: ["Candados", "Enlaces criptográficos", "Contraseñas simples", "Firmas"], correctAnswer: 1 }
            ]
          }
        ]
      },
      {
        id: "u3_s9",
        name: "Sesión 9: Interfaces Inmersivas y Ética",
        lessons: [
          { 
            id: "l3_5", 
            title: "3.5 Interfaces Inmersivas (VR/AR)", 
            type: "theory", 
            xpReward: 50, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "VR sumerge totalmente, AR superpone en el mundo real." }
            ],
            quiz: [
              { question: "¿Diferencia entre VR y AR?", options: ["Lo mismo", "VR sumerge totalmente, AR superpone", "VR aburrido", "PC vs Consola"], correctAnswer: 1 },
              { question: "Hologramas en tu sala es:", options: ["VR", "Realidad Aumentada (AR)", "TV", "Cuántica"], correctAnswer: 1 },
              { question: "Simulador de vuelo ciego es:", options: ["AR", "Realidad Virtual (VR)", "Blockchain", "3D"], correctAnswer: 1 },
              { question: "La inmersión es:", options: ["Agua", "Sensación de presencia física digital", "Pantalla", "Cable"], correctAnswer: 1 },
              { question: "Uso industrial de AR:", options: ["Juegos", "Ver manuales flotando sobre maquinaria", "Dormir", "Vender"], correctAnswer: 1 }
            ]
          },
          { 
            id: "l3_6", 
            title: "3.6 Gobernanza en IA", 
            type: "theory", 
            xpReward: 50, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "Reglas legales sobre algoritmos para evitar daños." }
            ],
            quiz: [
              { question: "¿Qué busca la gobernanza?", options: ["Más rapidez", "Establecer reglas éticas y legales", "Dar derechos", "Reducir disco"], correctAnswer: 1 },
              { question: "'Explicabilidad' significa:", options: ["Poder auditar por qué la IA decidió eso", "Código público", "Máquina habla", "Sin contraseñas"], correctAnswer: 0 },
              { question: "El dilema de la culpa ante accidentes es:", options: ["POO", "Responsabilidad legal", "Diseño", "Hardware"], correctAnswer: 1 },
              { question: "¿Riesgo de IA sin gobernanza?", options: ["Electricidad", "Decisiones sesgadas perjudiciales", "Lentas", "Se borran"], correctAnswer: 1 },
              { question: "Auditoría de algoritmo busca:", options: ["Nombre", "Verificar que decisiones sean justas", "Vender", "Colores"], correctAnswer: 1 }
            ]
          }
        ]
      }
    ]
  },

  // =======================================================================
  // UNIDAD 4
  // =======================================================================
  {
    id: "unit_4",
    title: "UT 4: Aprendizaje Automático e Incertidumbre",
    description: "Introducción al Machine Learning.",
    totalXp: 400,
    sessions: [
      {
        id: "u4_s10",
        name: "Sesión 10: Machine Learning Core",
        lessons: [
          { 
            id: "l4_1", 
            title: "4.1 Introducción al Machine Learning", 
            type: "theory", 
            xpReward: 50, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "Sistemas que aprenden patrones a través de datos." }
            ],
            quiz: [
              { question: "¿Requiere programación explícita regla por regla?", options: ["Sí", "No, aprende patrones de datos", "A veces", "Solo simple"], correctAnswer: 1 },
              { question: "¿Qué necesita el ML primordialmente?", options: ["Teclados", "Gran cantidad de datos de entrenamiento", "Pantallas", "Bluetooth"], correctAnswer: 1 },
              { question: "Un algoritmo prediciendo películas usa:", options: ["Magia", "Tendencias basadas en tu historial", "Cámaras", "Clima"], correctAnswer: 1 },
              { question: "¿De qué rama es el ML?", options: ["Bases", "Inteligencia Artificial", "Web", "Redes"], correctAnswer: 1 },
              { question: "El rendimiento mejora con:", options: ["La experiencia (más datos)", "Apagar", "4K", "Menos memoria"], correctAnswer: 0 }
            ]
          },
          { 
            id: "l4_2", 
            title: "4.2 Categorías de algoritmos", 
            type: "theory", 
            xpReward: 50, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "Supervisado (etiquetas), No Supervisado (sin etiquetas), Refuerzo (premios)." }
            ],
            quiz: [
              { question: "Datos con etiquetas correctas:", options: ["No Supervisado", "Supervisado", "Refuerzo", "Aleatorio"], correctAnswer: 1 },
              { question: "Busca patrones en datos sin etiquetas:", options: ["Supervisado", "Refuerzo", "No Supervisado", "Lineal"], correctAnswer: 2 },
              { question: "Aprende por recompensas (ensayo y error):", options: ["Supervisado", "No Supervisado", "Aprendizaje por Refuerzo", "Estático"], correctAnswer: 2 },
              { question: "Mil fotos etiquetadas como 'Gato' es:", options: ["No Supervisado", "Supervisado", "Refuerzo", "Caja Negra"], correctAnswer: 1 },
              { question: "La categoría se define por:", options: ["Lenguaje", "Forma de presentar datos en entrenamiento", "Marca", "Color"], correctAnswer: 1 }
            ]
          }
        ]
      },
      {
        id: "u4_s11",
        name: "Sesión 11: Aplicaciones e Incertidumbre",
        lessons: [
          { 
            id: "l4_3", 
            title: "4.3 Aplicaciones prácticas", 
            type: "theory", 
            xpReward: 50, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "Uso de modelos para predecir, clasificar o detectar anomalías." }
            ],
            quiz: [
              { question: "Detección de fraudes bancarios usa:", options: ["3D", "Detección de anomalías con ML", "Blockchain", "VR"], correctAnswer: 1 },
              { question: "Separar correos en Spam es:", options: ["Anomalías", "Clasificación", "Refuerzo", "Hardware"], correctAnswer: 1 },
              { question: "No es una aplicación de ML:", options: ["Reconocimiento facial", "Netflix", "Barrer la calle", "Filtros Instagram"], correctAnswer: 2 },
              { question: "¿Por qué ML en bancos?", options: ["Imprime", "Analiza transacciones buscando fraudes", "Bóvedas", "Ventanilla"], correctAnswer: 1 },
              { question: "Capacidad predictiva se usa en:", options: ["VHS a DVD", "Tendencias futuras (clima, bolsa)", "Pintar", "Teclados"], correctAnswer: 1 }
            ]
          },
          { 
            id: "l4_4", 
            title: "4.4 Incertidumbre en IA", 
            type: "theory", 
            xpReward: 50, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "Decisiones con datos incompletos usando probabilidad." }
            ],
            quiz: [
              { question: "¿Qué causa incertidumbre en IA?", options: ["Datos incompletos o ambiguos", "Computadora potente", "Internet", "Memoria"], correctAnswer: 0 },
              { question: "¿Cómo se maneja matemáticamente?", options: ["Sumas", "Probabilidad y porcentaje de confianza", "Apagando", "Ignorando"], correctAnswer: 1 },
              { question: "¿Qué es una Red Bayesiana?", options: ["Red social", "Modelo gráfico probabilístico", "Cable", "Computadora"], correctAnswer: 1 },
              { question: "La IA asume que el mundo real es:", options: ["Perfecto", "Ruidoso y con incertidumbre", "Holograma", "Binario"], correctAnswer: 1 },
              { question: "Ante la incertidumbre, la IA da:", options: ["Sí o No", "Un porcentaje de probabilidad", "Chiste", "Cierre"], correctAnswer: 1 }
            ]
          }
        ]
      },
      {
        id: "u4_s12",
        name: "Sesión 12: Arquitectura y Proyecto",
        lessons: [
          { 
            id: "l4_5", 
            title: "4.5 Modularidad", 
            type: "theory", 
            xpReward: 40, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "Dividir el sistema en partes independientes." }
            ],
            quiz: [
              { question: "¿Qué es la modularidad?", options: ["Archivo gigante", "Dividir en partes independientes", "Monitores", "Eliminar código"], correctAnswer: 1 },
              { question: "Ventaja principal:", options: ["Imposible de entender", "Actualizar un módulo sin afectar el resto", "Barato", "Consume RAM"], correctAnswer: 1 },
              { question: "Si un módulo falla:", options: ["Todo se destruye", "El sistema completo no colapsa", "Se borra BD", "Teclado falla"], correctAnswer: 1 },
              { question: "Visión y motor separados en robot es:", options: ["Desorden", "Modularidad", "Gobernanza", "Blockchain"], correctAnswer: 1 },
              { question: "¿Qué principio busca esto?", options: ["Monolithic", "Alta Cohesión/Modularidad", "Spaghetti", "LAN"], correctAnswer: 1 }
            ]
          },
          { 
            id: "l4_6", 
            title: "4.6 Lógica Monótona y No Monótona", 
            type: "theory", 
            xpReward: 40, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "Monótona (hechos rígidos), No-Monótona (adaptable)." }
            ],
            quiz: [
              { question: "En lógica monótona, nueva información:", options: ["Borra memoria", "Nunca invalida conclusiones pasadas", "Cambia mates", "Enoja a IA"], correctAnswer: 1 },
              { question: "Razonamiento humano es:", options: ["Monótona", "No-Monótona (flexible)", "Cálculo", "Binaria"], correctAnswer: 1 },
              { question: "Si un dato nuevo anula una conclusión:", options: ["Monótona", "Lógica No-Monótona", "Error", "Bucle"], correctAnswer: 1 },
              { question: "Matemática pura es:", options: ["Lógica Monótona", "No-Monótona", "Redes", "Blockchain"], correctAnswer: 0 },
              { question: "Sistema médico ante nuevos síntomas usa:", options: ["Monótona", "Lógica No-Monótona", "3D", "Reloj"], correctAnswer: 1 }
            ]
          },
          { 
            id: "l4_7", 
            title: "4.7 Presentación de proyecto en aula", 
            type: "practice", 
            xpReward: 120, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "Defensa técnica del proyecto final." }
            ],
            quiz: [
              { question: "Objetivo de la presentación:", options: ["Leer documento", "Defender y demostrar la solución", "Hacer tiempo", "Fotos"], correctAnswer: 1 },
              { question: "Regla de oro en diapositivas:", options: ["Poner todo el texto", "Letra pequeña", "Sintetizar y evitar exceso de texto", "Sin imágenes"], correctAnswer: 2 },
              { question: "Enfocarse en responder a:", options: ["Nombre", "¿Cómo se resolvió el problema?", "Costo", "Hora"], correctAnswer: 1 },
              { question: "Si presentas un prototipo:", options: ["Solo teoría", "Hacer demostración técnica", "Casa", "Dibujo"], correctAnswer: 1 },
              { question: "Habilidad clave en la defensa verbal:", options: ["C++", "Síntesis y Oratoria", "Tipeo", "Memoria"], correctAnswer: 1 }
            ]
          }
        ]
      }
    ]
  }
];

export const calculateLevel = (totalXp) => {
  return Math.floor(totalXp / 100) + 1;
};

// =======================================================================
// JUEGOS ARCADE ESTRATÉGICOS (MEJORADOS)
// =======================================================================
export const arcadeGames = [
  {
    id: "game_memory_1",
    title: "Nodos de Red",
    type: "memory",
    description: "Reconecta los servidores de la empresa emparejando conceptos clave con sus definiciones. Memoriza los íconos.",
    xpReward: 100,
    requiredLessonId: "l1_1", 
    requiredLessonName: "1.1 Introducción al concepto de Tecnologías Emergentes",
    data: [
      { id: 1, text: "Internet de las Cosas", icon: "Wifi", matchId: 101 },
      { id: 101, text: "Sensores físicos a internet.", icon: "Wifi", matchId: 1 },
      { id: 2, text: "Blockchain", icon: "Link", matchId: 102 },
      { id: 102, text: "Libro descentralizado inmutable.", icon: "Link", matchId: 2 },
      { id: 3, text: "IA Generativa", icon: "Sparkles", matchId: 103 },
      { id: 103, text: "Crea contenido nuevo sintético.", icon: "Sparkles", matchId: 3 },
      { id: 4, text: "Cloud Computing", icon: "Cloud", matchId: 104 },
      { id: 104, text: "Procesamiento en servidores remotos.", icon: "Cloud", matchId: 4 }
    ]
  },
  {
    id: "game_hangman_1",
    title: "Brecha de Seguridad",
    type: "hangman",
    description: "Alerta de intrusión. Adivina la clave en la terminal hacker antes de que los contramedidas destruyan tu conexión.",
    xpReward: 150,
    requiredLessonId: "l2_7", 
    requiredLessonName: "2.7 Aspectos éticos y legales",
    data: [
      { word: "CIBERSEGURIDAD", hint: "Protección de sistemas y redes contra ataques." },
      { word: "ALGORITMO", hint: "Conjunto de pasos lógicos en el código." },
      { word: "PRIVACIDAD", hint: "Derecho a controlar el uso de tus datos personales." }
    ]
  },
  {
    id: "game_timeattack_1",
    title: "Sobrecarga Crítica",
    type: "timeattack",
    description: "El núcleo de IA está inestable. Responde rápido para mantener la estabilidad del sistema por encima del 0%.",
    xpReward: 200,
    requiredLessonId: "l1_4", 
    requiredLessonName: "1.4 Impacto, desafíos y futuro",
    data: [
      { question: "¿Qué IA crea imágenes desde texto?", correct: "IA Generativa", options: ["IA Generativa", "IoT", "Blockchain", "VR"] },
      { question: "¿Problema donde no sabemos cómo la IA decide?", correct: "Caja Negra", options: ["Caja Negra", "Pantalla Azul", "Ping Alto", "Hardware"] },
      { question: "¿Procesamiento de datos cerca del usuario?", correct: "Edge Computing", options: ["Cloud Computing", "Edge Computing", "Mainframe", "Router"] },
      { question: "¿Tecnología de Bitcoin?", correct: "Blockchain", options: ["Blockchain", "VR", "Machine Learning", "Cloud"] },
      { question: "¿Dispositivos físicos conectados a internet?", correct: "IoT", options: ["Internet Oscuro", "Internet de las Cosas (IoT)", "Intranet", "Cables LAN"] }
    ]
  },
  {
    id: "game_sorting_1",
    title: "Clasificador de Datos",
    type: "sorting",
    description: "Acepta o rechaza paquetes de datos para entrenar a tu algoritmo. Evita la basura digital.",
    xpReward: 150,
    requiredLessonId: "l4_2", 
    requiredLessonName: "4.2 Categorías de algoritmos",
    data: {
      categories: ["Aprendizaje Supervisado", "Aprendizaje No Supervisado"],
      items: [
        { text: "Entrenar usando fotos que ya dicen 'Perro' o 'Gato'.", category: "Aprendizaje Supervisado" },
        { text: "Buscar patrones ocultos en datos desordenados.", category: "Aprendizaje No Supervisado" },
        { text: "Predecir precios de casas basado en el historial de ventas pasadas.", category: "Aprendizaje Supervisado" },
        { text: "Agrupar automáticamente a los clientes de un supermercado por sus gustos.", category: "Aprendizaje No Supervisado" }
      ]
    }
  },
  {
    id: "game_prompt_1",
    title: "Arquitecto de Prompt",
    type: "prompt",
    description: "Conecta los nodos de código en el orden lógico correcto para programar una instrucción perfecta.",
    xpReward: 150,
    requiredLessonId: "l3_2", 
    requiredLessonName: "3.2 Aplicación en Inteligencia Artificial Generativa",
    data: {
      target: "Actúa como un experto y redacta un informe corto",
      words: ["Actúa", "como", "un", "experto", "y", "redacta", "un", "informe", "corto"]
    }
  },
  {
    id: "game_scenario_1",
    title: "Simulador de CEO",
    type: "scenario",
    description: "Toma decisiones críticas. Mantén el equilibrio entre Ética, Presupuesto e Innovación. ¡Si alguna llega a 0, te despiden!",
    xpReward: 250,
    requiredLessonId: "l3_6", 
    requiredLessonName: "3.6 Consideraciones éticas y de gobernanza",
    data: [
      {
        situation: "Un equipo propone vender datos privados de usuarios a terceros. Es altamente rentable pero viola nuestra política de privacidad.",
        options: [
          { text: "Rechazar y proteger datos", impacts: { ethics: +20, budget: -15, tech: 0 }, feedback: "Perdimos dinero, pero nuestra reputación y confianza ética subieron." },
          { text: "Vender en secreto", impacts: { ethics: -40, budget: +30, tech: 0 }, feedback: "Ganamos millones, pero la prensa se enteró. La ética colapsó." }
        ]
      },
      {
        situation: "Nuestra IA médica ha sido acusada de tener sesgos raciales al diagnosticar pacientes.",
        options: [
          { text: "Apagarla y auditarla", impacts: { ethics: +30, budget: -20, tech: -10 }, feedback: "Perdimos terreno tecnológico y dinero, pero evitamos demandas letales." },
          { text: "Lanzar parche rápido en vivo", impacts: { ethics: -20, budget: +10, tech: -10 }, feedback: "El parche falló. Hubo negligencia y la empresa sufre." }
        ]
      },
      {
        situation: "La competencia lanzó una IA que roba arte sin pagar derechos. Es muy popular.",
        options: [
          { text: "Copiarles para competir", impacts: { ethics: -30, budget: +20, tech: +20 }, feedback: "El avance tecnológico fue brutal, pero recibimos miles de demandas de artistas." },
          { text: "Crear un modelo ético de pago", impacts: { ethics: +20, budget: -20, tech: +10 }, feedback: "Costó una fortuna programarlo, pero la industria nos ama ahora." }
        ]
      }
    ]
  }
];