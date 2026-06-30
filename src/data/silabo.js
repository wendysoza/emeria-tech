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
        id: "u1_s1",
        name: "Sesión 1: Conceptos Base",
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
        id: "u1_s2",
        name: "Sesión 2: Intersección e Impacto",
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
            title: "1.4 Impacto, desafíos y ética digital", 
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
                "Privacidad: Protección de datos sensibles en entornos inteligentes."
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso" },
              { type: "text", value: "Casos como algoritmos de contratación de empresas que penalizaban currículums de mujeres debido a un sesgo histórico en los datos con los que fueron entrenados." }
            ],
            quiz: [
              { question: "¿Cuál es un impacto directo de la IA en el mercado laboral?", options: ["Aumenta el trabajo manual", "Desplazamiento de tareas repetitivas", "Todos ganan más dinero", "Prohíbe usar computadoras"], correctAnswer: 1 },
              { question: "¿A qué se llama 'Sesgo Algorítmico'?", options: ["Cuando la IA funciona muy rápido", "La adopción de prejuicios humanos en las decisiones de la IA", "Un virus informático", "Cuando la IA se apaga sola"], correctAnswer: 1 },
              { question: "Un principio ético clave en la IA es:", options: ["Vender datos sin permiso", "La transparencia algorítmica y protección de datos", "Ocultar errores", "Ignorar las leyes"], correctAnswer: 1 },
              { question: "¿Cuál es un ejemplo de sesgo en recursos humanos?", options: ["Contratar al azar", "Algoritmos penalizando currículums por datos históricos machistas", "Pagar mediante IA", "Entrevistar por zoom"], correctAnswer: 1 },
              { question: "A pesar de los desafíos, la IA promete un futuro de:", options: ["Mayor ineficiencia", "Innovación y automatización avanzada", "Regreso a tecnologías análogas", "Lentitud de procesos"], correctAnswer: 1 }
            ]
          }
        ]
      },
      {
        id: "u1_s3",
        name: "Sesión 3: Proyecto de Asignatura (Fase 1)",
        lessons: [
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
            title: "1.6 Estrategia para hacer la introducción y objetivos", 
            type: "practice", 
            xpReward: 60,
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "La introducción es la carta de presentación de una investigación. Contextualiza al lector sobre el problema, el propósito y establece los objetivos (generales y específicos) del estudio." },
              { type: "subtitle", value: "Características Principales" },
              { type: "list", items: [
                "Contextualización: Describe el escenario del problema.",
                "Propósito: Responde al 'qué' y 'por qué' del estudio.",
                "Verbos en Infinitivo: Los objetivos siempre deben iniciar con un verbo sin conjugar (Ej: Analizar, Diseñar)."
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso" },
              { type: "text", value: "Empezar describiendo datos globales sobre el desperdicio de agua, para luego aterrizar en la necesidad del proyecto de riego inteligente propuesto." }
            ],
            quiz: [
              { question: "¿Qué propósito principal cumple la introducción?", options: ["Agradecer a los profesores", "Contextualizar al lector sobre el problema y propósito", "Mostrar la bibliografía", "Poner el índice"], correctAnswer: 1 },
              { question: "¿Qué preguntas clave debe responder una buena introducción?", options: ["¿Cuándo y dónde nací?", "¿Qué se va a hacer y por qué?", "¿Cuánto cuesta?", "¿Quién tiene la culpa?"], correctAnswer: 1 },
              { question: "¿Diferencia entre objetivo general y específico?", options: ["Ninguna", "El general es la meta final, específicos los pasos", "El general es opcional", "Son materiales a usar"], correctAnswer: 1 },
              { question: "¿Cómo deben iniciar siempre los objetivos?", options: ["Con un sustantivo", "Con una pregunta", "Con un verbo en infinitivo", "Con el nombre del autor"], correctAnswer: 2 },
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
    totalXp: 400,
    sessions: [
      {
        id: "u2_s1",
        name: "Sesión 1: Gestión y Tipos de Conocimiento",
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
            title: "2.2 Avances y aplicaciones tecnológicas (CRM/ERP)", 
            type: "theory", 
            xpReward: 50, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "Aplicación de herramientas tecnológicas y software moderno (como CRM o ERP) para almacenar, proteger y distribuir el capital intelectual de una empresa." },
              { type: "subtitle", value: "Características Principales" },
              { type: "list", items: [
                "CRM (Customer Relationship Management): Gestiona datos y relaciones con clientes.",
                "ERP (Enterprise Resource Planning): Centraliza procesos internos de recursos humanos y logística.",
                "Centralización: La información reside en un solo lugar accesible."
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso" },
              { type: "text", value: "Una empresa utilizando SAP para integrar su contabilidad con el inventario en tiempo real." }
            ],
            quiz: [
              { question: "¿Qué hace un sistema CRM?", options: ["Repara computadoras", "Gestiona la relación con los clientes", "Imprime recibos", "Crea virus"], correctAnswer: 1 },
              { question: "Un ERP sirve para:", options: ["Jugar online", "Administrar y centralizar los procesos del negocio", "Hacer presentaciones gráficas", "Escuchar música"], correctAnswer: 1 },
              { question: "La característica de 'Centralización' indica que:", options: ["Hay múltiples libretas sueltas", "La información está en un solo lugar accesible", "Es secreta", "Solo el gerente la conoce"], correctAnswer: 1 },
              { question: "¿Cómo ayuda la tecnología en la gestión de documentos?", options: ["Borra archivos viejos", "Permite búsqueda inteligente y acceso remoto", "Añade lentitud", "Gasta más papel"], correctAnswer: 1 },
              { question: "¿Qué permite la 'Integración' de sistemas?", options: ["Conectar eficientemente departamentos de la empresa", "Desconectar internet", "Trabajar sin energía eléctrica", "Aislar a los empleados"], correctAnswer: 0 }
            ]
          }
        ]
      },
      {
        id: "u2_s2",
        name: "Sesión 2: Formulación y Justificación",
        lessons: [
          { 
            id: "l2_3", 
            title: "2.3 Formulación del problema de investigación", 
            type: "practice", 
            xpReward: 60, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "Es la estructuración formal de la idea de investigación. Generalmente se sintetiza en una pregunta concisa que guía todo el proyecto." },
              { type: "subtitle", value: "Características Principales" },
              { type: "list", items: [
                "Pregunta Directa: Se formula típicamente como interrogante.",
                "Relación de variables: Conecta la causa con el efecto propuesto.",
                "Delimitación: Establece el alcance claro del estudio."
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso" },
              { type: "text", value: "¿De qué manera la implementación de un sistema de recomendación IA mejorará las ventas en la tienda X durante el año 2026?" }
            ],
            quiz: [
              { question: "¿Cómo se suele estructurar la formulación del problema?", options: ["Como un poema épico", "Como una pregunta de investigación", "Lista de compras", "Código de programación"], correctAnswer: 1 },
              { question: "Una buena pregunta de investigación debe tener:", options: ["Claridad y relación de variables", "Muchas palabras rebuscadas", "Respuestas cerradas de Sí o No", "Metáforas"], correctAnswer: 0 },
              { question: "En la formulación, 'relacionar variables' significa:", options: ["Escribir código JavaScript", "Involucrar causa y efecto en la oración", "Sumar números", "Cambiar de fuente de letra"], correctAnswer: 1 },
              { question: "¿Cuál de estas es una buena formulación de problema?", options: ["¿Cómo hacer IA?", "¿De qué manera la IA reducirá tiempos en el área Y?", "La IA es muy buena", "¿Cuándo se inventó la primera computadora?"], correctAnswer: 1 },
              { question: "Formular correctamente el problema equivale a:", options: ["Terminar la tesis por completo", "Estructurar la dirección y base del proyecto", "Reprobar el semestre", "Pagar derechos de autor"], correctAnswer: 1 }
            ]
          },
          { 
            id: "l2_4", 
            title: "2.4 Justificación y Estado del Arte", 
            type: "practice", 
            xpReward: 60, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "La Justificación defiende la necesidad e importancia del proyecto (¿Por qué? y ¿Para qué?). El Estado del Arte revisa qué se ha hecho antes sobre el tema." },
              { type: "subtitle", value: "Características Principales" },
              { type: "list", items: [
                "Relevancia Social/Tecnológica: A quién beneficia el proyecto.",
                "Viabilidad: Demuestra que la solución es aplicable.",
                "Antecedentes: Revisión de estudios previos para no 'reinventar la rueda'."
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso" },
              { type: "text", value: "Justificar un software médico indicando las estadísticas actuales de mortalidad por diagnósticos tardíos." }
            ],
            quiz: [
              { question: "¿Qué preguntas responde la sección de Justificación?", options: ["¿Cómo y cuándo?", "¿Por qué y Para qué?", "¿Quién y cuánto?", "¿Dónde?"], correctAnswer: 1 },
              { question: "Explicar a quién beneficia directamente el proyecto establece su:", options: ["Relevancia Social", "Presupuesto anual", "Conclusión final", "Anexo técnico"], correctAnswer: 0 },
              { question: "El 'Estado del Arte' se refiere a:", options: ["Pintar el software", "Revisión de estudios e investigaciones previas", "La introducción", "El índice de imágenes"], correctAnswer: 1 },
              { question: "La justificación sirve para:", options: ["Rellenar páginas", "Convencer a los evaluadores de la necesidad e importancia", "Listar los equipos a usar", "Hacer la bibliografía"], correctAnswer: 1 },
              { question: "Si un proyecto no tiene justificación adecuada:", options: ["Es más fácil de aprobar", "Puede ser rechazado por falta de utilidad demostrada", "Obtiene mejor nota", "Se vuelve IA autónoma"], correctAnswer: 1 }
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
    title: "UT 3: Sistemas basados en Conocimiento (SBC) e IoT",
    description: "Características de los sistemas expertos y el Internet de las Cosas.",
    totalXp: 400,
    sessions: [
      {
        id: "u3_s1",
        name: "Sesión 1: Sistemas Basados en Conocimiento",
        lessons: [
          { 
            id: "l3_1", 
            title: "3.1 Fundamentos y componentes de SBC", 
            type: "theory", 
            xpReward: 50, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "Los Sistemas Basados en el Conocimiento (SBC) o Sistemas Expertos son programas informáticos diseñados para resolver problemas complejos imitando el razonamiento de un experto humano." },
              { type: "subtitle", value: "Características Principales" },
              { type: "list", items: [
                "Base de Conocimiento: Donde se guardan las reglas y datos del experto.",
                "Motor de Inferencia: El 'cerebro' que procesa las reglas para sacar conclusiones.",
                "Interfaz de Usuario: Por donde el sistema hace preguntas al usuario."
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso" },
              { type: "text", value: "Un sistema experto médico como MYCIN, que al recibir síntomas del paciente, deduce qué bacteria tiene y receta antibióticos." }
            ],
            quiz: [
              { question: "Los sistemas basados en conocimiento intentan imitar:", options: ["A un animal", "El razonamiento de un experto humano", "A una red social", "El hardware del equipo"], correctAnswer: 1 },
              { question: "¿Dónde se guardan los datos y reglas en un SBC?", options: ["En la pantalla", "En la Base de Conocimiento", "En el teclado", "En el router"], correctAnswer: 1 },
              { question: "El componente que procesa las reglas para deducir conclusiones es:", options: ["El mouse", "El Motor de Inferencia", "La impresora", "El cable HDMI"], correctAnswer: 1 },
              { question: "¿Qué diferencia a un sistema inteligente de uno tradicional?", options: ["Usa cables de cobre", "Infiere soluciones y toma decisiones complejas", "Es más grande físicamente", "No usa pantalla"], correctAnswer: 1 },
              { question: "Una aplicación clásica de un sistema experto es:", options: ["Un videojuego de carreras", "Un diagnosticador médico de enfermedades", "Un reproductor de mp3", "Un block de notas"], correctAnswer: 1 }
            ]
          },
          { 
            id: "l3_2", 
            title: "3.2 Integración con el Internet de las Cosas (IoT)", 
            type: "theory", 
            xpReward: 50, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "El IoT es la red de objetos físicos cotidianos que llevan sensores integrados y se conectan a internet para enviar y recibir datos en tiempo real." },
              { type: "subtitle", value: "Características Principales" },
              { type: "list", items: [
                "Sensores: Recopilan datos del entorno (temperatura, movimiento).",
                "Conectividad: Transmiten los datos vía Wi-Fi, 5G o Bluetooth.",
                "Acción: Toman decisiones automáticas basadas en esos datos."
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso" },
              { type: "text", value: "Relojes inteligentes que miden tu ritmo cardíaco y lo envían a tu médico, o sistemas de riego agrícola que se activan solos cuando el suelo está seco." }
            ],
            quiz: [
              { question: "¿Qué significan las siglas IoT?", options: ["Internet of Technology", "Internet of Things (Internet de las cosas)", "Internal Output", "Intelligent Tool"], correctAnswer: 1 },
              { question: "El componente clave que permite a un objeto IoT recopilar datos es:", options: ["La carcasa", "Los sensores y la conexión a internet", "El metal de fabricación", "La batería infinita"], correctAnswer: 1 },
              { question: "¿Qué hace un sensor en un entorno IoT?", options: ["Crea páginas webs", "Recopila variables físicas del entorno", "Elimina virus", "Imprime modelos en 3D"], correctAnswer: 1 },
              { question: "Un ejemplo claro de dispositivo IoT en la industria es:", options: ["Un libro físico", "Sensores de humedad en campos conectados a la red", "Una máquina de escribir", "Una guitarra acústica"], correctAnswer: 1 },
              { question: "La conectividad en los dispositivos IoT se logra típicamente mediante:", options: ["Cables VGA", "Wi-Fi, 5G o Bluetooth", "Cuerdas elásticas", "Señales de humo"], correctAnswer: 1 }
            ]
          }
        ]
      },
      {
        id: "u3_s2",
        name: "Sesión 2: IA Generativa",
        lessons: [
          { 
            id: "l3_3", 
            title: "3.3 Aplicación en Inteligencia Artificial Generativa", 
            type: "theory", 
            xpReward: 50, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "La IA Generativa es una rama de la IA que utiliza redes neuronales avanzadas (como los LLMs) para crear contenido completamente nuevo y original, como texto, imágenes, música o código." },
              { type: "subtitle", value: "Características Principales" },
              { type: "list", items: [
                "Síntesis: No busca en Google, genera respuestas palabra por palabra.",
                "Prompts: Se controla mediante instrucciones de lenguaje natural.",
                "Multimodalidad: Capacidad de mezclar texto, voz e imágenes."
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso" },
              { type: "text", value: "ChatGPT redactando un ensayo, Midjourney creando una pintura digital que no existía, o GitHub Copilot escribiendo funciones de programación." }
            ],
            quiz: [
              { question: "¿Qué diferencia principal tiene la IA Generativa con la IA tradicional?", options: ["Es mucho más lenta", "Crea contenido nuevo y sintético (texto, imágenes, etc.)", "No requiere usar internet nunca", "Solo funciona en teléfonos celulares"], correctAnswer: 1 },
              { question: "¿Cómo se llama la instrucción de texto que se le da a una IA generativa?", options: ["Código fuente", "Prompt", "Script de consola", "Macro de Excel"], correctAnswer: 1 },
              { question: "Plataformas como ChatGPT están basadas principalmente en:", options: ["Imágenes estáticas", "Modelos de Lenguaje Grande (LLMs)", "Cálculo en 3D", "Robótica de hardware"], correctAnswer: 1 },
              { question: "Herramientas como Midjourney o DALL-E se especializan en:", options: ["Generar imágenes a partir de texto", "Hacer hojas de cálculo contables", "Limpiar malware del equipo", "Manejar vehículos de forma autónoma"], correctAnswer: 0 },
              { question: "Es cierto que la IA Generativa puede programar:", options: ["Falso, no puede", "Verdadero, puede generar código de software funcional", "Solo si se trata de HTML básico", "Es ilegal que lo haga"], correctAnswer: 1 }
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
    title: "UT 4: Arquitecturas y Gobernanza Digital",
    description: "Cloud Computing, Blockchain, Realidades Inmersivas y Ética.",
    totalXp: 400,
    sessions: [
      {
        id: "u4_s1",
        name: "Sesión 1: Cloud y Blockchain",
        lessons: [
          { 
            id: "l4_1", 
            title: "4.1 Cloud y Edge Computing", 
            type: "theory", 
            xpReward: 50, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "Cloud Computing procesa datos en potentes servidores remotos centralizados. Edge Computing procesa los datos de forma local, justo donde se generan (en el 'borde' de la red), para evitar demoras." },
              { type: "subtitle", value: "Características Principales" },
              { type: "list", items: [
                "Cloud: Alta capacidad de almacenamiento, requiere internet constante.",
                "Edge: Baja latencia (respuesta rápida), ideal para tiempo real."
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso" },
              { type: "text", value: "Guardar fotos en Google Drive (Cloud) vs. Un vehículo autónomo que frena al detectar un peatón sin tener que consultar a internet primero (Edge)." }
            ],
            quiz: [
              { question: "¿Dónde se procesa la información en Cloud Computing?", options: ["En el celular", "En servidores centrales remotos", "En un pendrive USB", "En la memoria RAM local exclusivamente"], correctAnswer: 1 },
              { question: "¿Dónde se procesa la información en Edge Computing?", options: ["En la nube", "Localmente cerca de donde se genera el dato", "En las oficinas de Google", "En papel"], correctAnswer: 1 },
              { question: "La principal ventaja de usar Edge Computing es:", options: ["Almacenamiento infinito", "Baja latencia y respuesta en tiempo real", "No gastar electricidad", "Que necesita un monitor enorme"], correctAnswer: 1 },
              { question: "Para un carro de conducción autónoma es vital utilizar:", options: ["Solo Cloud", "Edge Computing para reaccionar al instante", "El correo postal", "Nada de tecnología"], correctAnswer: 1 },
              { question: "Cloud Computing destaca por:", options: ["Funcionar sin internet", "Su alta capacidad masiva de procesamiento remoto", "Ser puramente local", "Incapacidad de respaldos"], correctAnswer: 1 }
            ]
          },
          { 
            id: "l4_2", 
            title: "4.2 Blockchain para verificación y trazabilidad", 
            type: "theory", 
            xpReward: 50, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "Blockchain es una tecnología de registro descentralizado e inmutable. La información se guarda en 'bloques' encadenados criptográficamente, imposibles de alterar." },
              { type: "subtitle", value: "Características Principales" },
              { type: "list", items: [
                "Descentralización: No hay un servidor central; la copia la tienen todos.",
                "Inmutabilidad: Una vez guardado el dato, no se puede borrar ni editar.",
                "Transparencia: Todos en la red pueden verificar las transacciones."
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso" },
              { type: "text", value: "Trazabilidad de alimentos (saber exactamente de qué granja viene un producto) o validación de títulos universitarios imposibles de falsificar." }
            ],
            quiz: [
              { question: "¿Qué es esencialmente el Blockchain?", options: ["Un editor de texto", "Un libro de registros digital descentralizado e inmutable", "Un servidor físico en un sótano", "Una red social de hackers"], correctAnswer: 1 },
              { question: "Que la tecnología sea 'Inmutable' significa que:", options: ["Es transparente como el cristal", "La información no se puede alterar ni borrar en secreto", "Se cae constantemente", "Es fría como el hielo"], correctAnswer: 1 },
              { question: "¿Por qué el Blockchain se considera descentralizado?", options: ["Porque no depende de un único servidor controlador", "Porque no funciona bien", "Porque tiene un administrador humano", "Porque usa muchos cables"], correctAnswer: 0 },
              { question: "Un uso corporativo moderno para el Blockchain (fuera de criptomonedas) es:", options: ["Jugar en solitario", "Trazabilidad segura de productos y cadenas de suministro", "Reproducir música", "Guardar fotos de vacaciones"], correctAnswer: 1 },
              { question: "¿Cómo se aseguran los bloques de información entre sí?", options: ["Con candados de metal", "Mediante enlaces criptográficos complejos", "Con contraseñas simples como '1234'", "Con firmas en papel"], correctAnswer: 1 }
            ]
          }
        ]
      },
      {
        id: "u4_s2",
        name: "Sesión 2: Interfaces Inmersivas y Gobernanza",
        lessons: [
          { 
            id: "l4_3", 
            title: "4.3 Interfaces Inmersivas (VR/AR)", 
            type: "theory", 
            xpReward: 50, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "La Realidad Virtual (VR) sumerge al usuario en un mundo 100% digital usando gafas cerradas. La Realidad Aumentada (AR) superpone elementos digitales sobre el mundo real (usando cámaras o gafas transparentes)." },
              { type: "subtitle", value: "Características Principales" },
              { type: "list", items: [
                "Inmersión (VR): Desconexión total del entorno físico.",
                "Superposición (AR): Interacción con el entorno físico real."
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso" },
              { type: "text", value: "VR usado para simular cirugías riesgosas para estudiantes de medicina. AR usada por técnicos que ven manuales flotando sobre un motor mientras lo reparan." }
            ],
            quiz: [
              { question: "¿Cuál es la diferencia principal entre VR y AR?", options: ["Son exactamente lo mismo", "VR te sumerge totalmente, AR superpone cosas al mundo real", "VR es aburrido y AR es divertido", "VR es para PC y AR para consolas"], correctAnswer: 1 },
              { question: "Ver hologramas de muebles en tu sala a través del celular es un ejemplo de:", options: ["Realidad Virtual (VR)", "Realidad Aumentada (AR)", "Televisión a color", "Física Cuántica"], correctAnswer: 1 },
              { question: "Un simulador de vuelo donde te pones un casco ciego es:", options: ["AR", "Realidad Virtual (VR)", "Blockchain inmersivo", "Cine 3D"], correctAnswer: 1 },
              { question: "El concepto de 'inmersión' en estas tecnologías se refiere a:", options: ["Meterse al agua", "La sensación psicológica de presencia física en un entorno digital", "La pantalla del computador", "Conectar un cable largo"], correctAnswer: 1 },
              { question: "Un uso industrial potente de la Realidad Aumentada (AR) es:", options: ["Jugar videojuegos en la oficina", "Ver manuales y guías flotando sobre maquinaria real para repararlas", "Dormir en horas laborales", "Vender computadoras viejas"], correctAnswer: 1 }
            ]
          },
          { 
            id: "l4_4", 
            title: "4.4 Gobernanza en IA y Modularidad", 
            type: "theory", 
            xpReward: 50, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "La Gobernanza en IA trata de los marcos legales y éticos para asegurar que los algoritmos sean seguros. La Modularidad es un principio de software para construir sistemas en bloques independientes." },
              { type: "subtitle", value: "Características Principales" },
              { type: "list", items: [
                "Explicabilidad (Gobernanza): Poder entender por qué la IA tomó una decisión.",
                "Desacoplamiento (Modularidad): Si un módulo falla, no tumba todo el sistema."
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso" },
              { type: "text", value: "Auditorías de algoritmos bancarios para asegurar que no discriminan (Gobernanza). Construir un robot donde el 'módulo de visión' y el 'módulo de caminar' están programados por separado (Modularidad)." }
            ],
            quiz: [
              { question: "¿Qué busca principalmente la gobernanza en la IA?", options: ["Hacer que los procesadores vayan más rápido", "Establecer reglas éticas, legales y de responsabilidad", "Darle derechos humanos a las máquinas", "Reducir el tamaño de los discos duros"], correctAnswer: 1 },
              { question: "En el contexto de la IA, la 'Explicabilidad' significa:", options: ["Poder auditar y justificar por qué la IA tomó una decisión específica", "Hacer que el código sea de dominio público obligatoriamente", "Que la máquina hable en voz alta", "Usar el sistema sin contraseñas"], correctAnswer: 0 },
              { question: "¿Cuál es el principal riesgo de una IA sin gobernanza?", options: ["Que consuma mucha electricidad", "Tome decisiones sesgadas y perjudiciales sin consecuencias legales claras", "Que sea muy lenta", "Que se borre sola"], correctAnswer: 1 },
              { question: "¿Qué significa el principio de 'Modularidad' en la construcción de sistemas?", options: ["Hacer un solo archivo gigante de código", "Dividir el sistema en partes independientes y conectables", "Poner muchos monitores", "Eliminar código que no sirve"], correctAnswer: 1 },
              { question: "Una gran ventaja de usar modularidad es:", options: ["Es imposible de entender", "Permite actualizar o reparar un módulo sin afectar a todo el sistema", "Es mucho más barato", "Consume mucha memoria RAM"], correctAnswer: 1 }
            ]
          }
        ]
      }
    ]
  },

  // =======================================================================
  // UNIDAD 5
  // =======================================================================
  {
    id: "unit_5",
    title: "UT 5: Aprendizaje Automático (Machine Learning)",
    description: "Algoritmos, Redes Neuronales Artificiales y Deep Learning.",
    totalXp: 400,
    sessions: [
      {
        id: "u5_s1",
        name: "Sesión 1: Conceptos y Tipos de Aprendizaje",
        lessons: [
          { 
            id: "l5_1", 
            title: "5.1 Disrupción y conceptos de Machine Learning", 
            type: "theory", 
            xpReward: 50, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "El Machine Learning (ML) es el campo que da a las computadoras la capacidad de aprender de los datos sin ser programadas explícitamente con reglas rígidas." },
              { type: "subtitle", value: "Características Principales" },
              { type: "list", items: [
                "Reconoce patrones ocultos en grandes volúmenes de datos.",
                "Mejora su rendimiento empíricamente (con la experiencia y más datos)."
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso" },
              { type: "text", value: "Los filtros anti-spam de tu correo: nadie programó la palabra exacta del fraude, el algoritmo aprendió a detectarlos al ver miles de correos basura." }
            ],
            quiz: [
              { question: "¿El Machine Learning requiere que el programador escriba reglas explícitas de IF-THEN para cada situación?", options: ["Sí, siempre", "No, el sistema aprende los patrones directamente de los datos", "Solo a veces", "Solo en sistemas simples"], correctAnswer: 1 },
              { question: "¿Qué insumo primordial necesita el ML para funcionar correctamente?", options: ["Teclados mecánicos", "Gran cantidad de datos de entrenamiento", "Pantallas de alta resolución", "Conexión Bluetooth"], correctAnswer: 1 },
              { question: "Un algoritmo de Netflix recomendando películas utiliza:", options: ["Magia negra", "Aprendizaje basado en tu historial y el de millones de usuarios", "Cámaras ocultas", "El clima local"], correctAnswer: 1 },
              { question: "¿De qué campo de estudio más grande es subrama el Machine Learning?", options: ["Bases de Datos Relacionales", "Inteligencia Artificial", "Diseño Web", "Redes de Telecomunicaciones"], correctAnswer: 1 },
              { question: "El rendimiento de un modelo de ML mejora considerablemente con:", options: ["La experiencia (alimentarlo con más datos)", "Apagar el servidor de vez en cuando", "Ponerle un monitor 4K", "Tener menos memoria RAM"], correctAnswer: 0 }
            ]
          },
          { 
            id: "l5_2", 
            title: "5.2 Tipos: Supervisado, No supervisado y Refuerzo", 
            type: "theory", 
            xpReward: 50, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "Existen tres enfoques principales para enseñar a las máquinas: dándoles las respuestas (Supervisado), dejándolos buscar grupos (No Supervisado) y dándoles premios/castigos (Refuerzo)." },
              { type: "subtitle", value: "Características Principales" },
              { type: "list", items: [
                "Supervisado: Los datos de entrenamiento tienen etiquetas (ej. fotos que ya dicen 'gato').",
                "No Supervisado: Datos sin clasificar, el sistema busca agrupaciones (clusters).",
                "Refuerzo: El sistema aprende por ensayo y error en un entorno para maximizar una recompensa."
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso" },
              { type: "text", value: "Supervisado: Predecir el precio de una casa. No Supervisado: Agrupar clientes por gustos similares. Refuerzo: Una IA aprendiendo a jugar ajedrez o a caminar." }
            ],
            quiz: [
              { question: "Si le damos a la máquina fotos de radiografías previamente marcadas por doctores como 'Enfermo' o 'Sano', estamos usando:", options: ["Aprendizaje No Supervisado", "Aprendizaje Supervisado", "Aprendizaje por Refuerzo", "Aprendizaje Aleatorio"], correctAnswer: 1 },
              { question: "El algoritmo que busca patrones o grupos (clusters) en datos que no tienen ninguna etiqueta se llama:", options: ["Supervisado", "Por Refuerzo", "No Supervisado", "Estructurado"], correctAnswer: 2 },
              { question: "El método donde un agente aprende por ensayo y error recibiendo recompensas o castigos es el:", options: ["Supervisado", "No Supervisado", "Aprendizaje por Refuerzo", "Aprendizaje Estático"], correctAnswer: 2 },
              { question: "¿En qué categoría cae entrenar a un robot para que no se caiga al caminar?", options: ["No Supervisado", "Supervisado", "Aprendizaje por Refuerzo", "Caja Negra"], correctAnswer: 2 },
              { question: "La categoría del algoritmo se define principalmente por:", options: ["El lenguaje de programación usado", "La forma en que se presentan los datos (con/sin etiquetas) durante el entrenamiento", "La marca de la computadora", "El color de la interfaz"], correctAnswer: 1 }
            ]
          }
        ]
      },
      {
        id: "u5_s2",
        name: "Sesión 2: Redes y Limpieza de Datos",
        lessons: [
          { 
            id: "l5_3", 
            title: "5.3 Redes Neuronales Artificiales y Deep Learning", 
            type: "theory", 
            xpReward: 50, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "Las Redes Neuronales imitan la estructura del cerebro humano. Cuando una red neuronal tiene muchas capas ocultas, se le denomina Aprendizaje Profundo (Deep Learning)." },
              { type: "subtitle", value: "Características Principales" },
              { type: "list", items: [
                "Capas: Tienen una capa de entrada, capas ocultas de procesamiento y una capa de salida.",
                "Deep Learning: Capaz de procesar información ultra compleja (como video en vivo o audio)."
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso" },
              { type: "text", value: "La tecnología detrás del reconocimiento facial de tu celular o la traducción de voz a texto en tiempo real." }
            ],
            quiz: [
              { question: "¿En qué biología se inspiran las Redes Neuronales Artificiales?", options: ["En el estómago", "En la estructura del cerebro humano", "En el ADN de las plantas", "En las alas de los pájaros"], correctAnswer: 1 },
              { question: "¿Cuándo se considera que una red neuronal es 'Deep Learning' (Aprendizaje Profundo)?", options: ["Cuando funciona bajo el agua", "Cuando tiene múltiples capas ocultas de procesamiento", "Cuando el disco duro es muy grande", "Cuando es de código abierto"], correctAnswer: 1 },
              { question: "La primera capa que recibe la información cruda en la red se llama:", options: ["Capa Oculta", "Capa de Entrada (Input Layer)", "Capa de Salida", "Capa de Hardware"], correctAnswer: 1 },
              { question: "El Deep Learning destaca especialmente en áreas como:", options: ["Sumar 2+2", "Procesamiento de lenguaje natural y visión artificial computarizada", "Hacer tablas de Word", "Apagar computadoras"], correctAnswer: 1 },
              { question: "¿Qué problema presentan las redes neuronales profundas muy grandes?", options: ["Son transparentes", "Sufren del problema de 'Caja Negra' (difícil saber cómo razonaron)", "No consumen memoria", "Solo funcionan de día"], correctAnswer: 1 }
            ]
          },
          { 
            id: "l5_4", 
            title: "5.4 Limpieza de datos y Casos de uso (Comercio/Seguridad)", 
            type: "theory", 
            xpReward: 50, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "El 80% del trabajo en ML es procesar y limpiar los datos. Si la IA aprende de datos basura (basura entra), predecirá basura (basura sale). Sus aplicaciones en comercio y seguridad son masivas." },
              { type: "subtitle", value: "Características Principales" },
              { type: "list", items: [
                "Limpieza: Eliminar duplicados, rellenar vacíos, quitar errores.",
                "Comercio: Predicción de demanda y marketing hiper-personalizado.",
                "Seguridad: Detección de intrusiones en redes y fraudes bancarios."
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso" },
              { type: "text", value: "Bancos analizando millones de transacciones por segundo para bloquear tu tarjeta si detectan un gasto inusual en otro país." }
            ],
            quiz: [
              { question: "La regla 'Basura Entra, Basura Sale' en Machine Learning significa que:", options: ["El hardware debe estar limpio", "Si entrenas al modelo con datos erróneos, las predicciones serán erróneas", "Hay que borrar el disco C:", "Se deben usar archivos temporales"], correctAnswer: 1 },
              { question: "¿Qué acción pertenece a la 'Limpieza de Datos'?", options: ["Lavar el monitor", "Eliminar registros duplicados y corregir valores en blanco", "Comprar antivirus", "Imprimir el código"], correctAnswer: 1 },
              { question: "¿Cómo se utiliza el ML comúnmente en la seguridad bancaria?", options: ["Para imprimir billetes", "Para la detección de anomalías y fraudes en tarjetas", "Para construir bóvedas", "Para atender la ventanilla"], correctAnswer: 1 },
              { question: "En el comercio electrónico (e-commerce), el ML se usa fuertemente para:", options: ["Fundir los servidores", "Sistemas de recomendación personalizada de productos", "Ocultar precios", "Pintar los paquetes"], correctAnswer: 1 },
              { question: "Separar correos automáticamente en las bandejas de 'Importantes' o 'Spam' es una tarea de:", options: ["Detección de anomalías", "Clasificación con Machine Learning", "Aprendizaje por Refuerzo", "Hardware de red"], correctAnswer: 1 }
            ]
          }
        ]
      }
    ]
  },

  // =======================================================================
  // UNIDAD 6
  // =======================================================================
  {
    id: "unit_6",
    title: "UT 6: Incertidumbre en Inteligencia Artificial",
    description: "Manejo probabilístico, lógica difusa y modelos neutrosóficos.",
    totalXp: 400,
    sessions: [
      {
        id: "u6_s1",
        name: "Sesión 1: Probabilidad y Lógica Difusa",
        lessons: [
          { 
            id: "l6_1", 
            title: "6.1 Elementos de incertidumbre y Redes Bayesianas", 
            type: "theory", 
            xpReward: 50, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "El mundo real es ruidoso y los datos suelen estar incompletos. Las IAs utilizan el razonamiento probabilístico (como las Redes Bayesianas) para tomar decisiones educadas ante la incertidumbre." },
              { type: "subtitle", value: "Características Principales" },
              { type: "list", items: [
                "Incertidumbre: Surge por ruido en sensores, falta de datos o complejidad del mundo real.",
                "Redes Bayesianas: Modelos gráficos probabilísticos que representan relaciones de causa-efecto."
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso" },
              { type: "text", value: "Una IA médica que ante la presencia de tos y fiebre, no da un diagnóstico 100% certero, sino que concluye: 85% probabilidad de Gripe, 15% de Neumonía." }
            ],
            quiz: [
              { question: "¿Qué causa principalmente la incertidumbre en los sistemas de IA?", options: ["Datos incompletos, ambiguos o ruido en sensores", "Tener computadoras muy potentes", "Exceso de cableado de red", "La memoria RAM llena"], correctAnswer: 0 },
              { question: "¿Cómo se maneja matemáticamente la incertidumbre en estos sistemas?", options: ["Con sumas y restas simples", "Mediante la probabilidad y porcentajes de confianza", "Apagando el sistema", "Ignorando los errores"], correctAnswer: 1 },
              { question: "¿Qué es una Red Bayesiana?", options: ["Una red social corporativa", "Un modelo gráfico probabilístico de causa y efecto", "Un cable de fibra óptica", "Una computadora antigua"], correctAnswer: 1 },
              { question: "La Inteligencia Artificial avanzada asume que el mundo real es:", options: ["Totalmente perfecto y predecible", "Ruidoso y lleno de incertidumbre", "Un holograma proyectado", "Totalmente binario (blanco y negro)"], correctAnswer: 1 },
              { question: "Ante la incertidumbre, en lugar de dar un simple 'Sí' o 'No', la IA suele dar:", options: ["Cero y Uno", "Un porcentaje de probabilidad", "Un chiste", "Un cierre de sistema forzado"], correctAnswer: 1 }
            ]
          },
          { 
            id: "l6_2", 
            title: "6.2 Lógica difusa y razonamiento aproximado", 
            type: "theory", 
            xpReward: 50, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "A diferencia de la lógica booleana clásica (verdadero o falso, 1 o 0), la lógica difusa (Fuzzy Logic) permite grados de verdad, manejando conceptos imprecisos como 'muy alto', 'un poco frío' o 'bastante rápido'." },
              { type: "subtitle", value: "Características Principales" },
              { type: "list", items: [
                "Variables Lingüísticas: Usa palabras en lugar de solo números fríos.",
                "Grados de Pertenencia: Un valor puede ser 30% falso y 70% verdadero al mismo tiempo."
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso" },
              { type: "text", value: "Los frenos ABS de un carro o una lavadora inteligente que no solo detecta 'sucio/limpio', sino 'ligeramente sucio' y ajusta el agua en consecuencia." }
            ],
            quiz: [
              { question: "¿Cuál es la principal diferencia entre la lógica booleana y la lógica difusa?", options: ["La booleana usa colores, la difusa números", "La booleana es de 1 o 0, la difusa permite grados y matices intermedios", "La difusa solo usa el número 2", "No hay diferencia"], correctAnswer: 1 },
              { question: "Las expresiones 'un poco frío' o 'muy alto' en este contexto se conocen como:", options: ["Errores de código", "Variables Lingüísticas", "Variables enteras", "Hardware defectuoso"], correctAnswer: 1 },
              { question: "¿La lógica difusa permite que algo sea parcialmente verdadero y parcialmente falso?", options: ["Es imposible matemáticamente", "Sí, a través de los grados de pertenencia", "Solo si el programador se equivoca", "Solo en sistemas antiguos"], correctAnswer: 1 },
              { question: "Un uso súper común de la lógica difusa en la vida diaria es:", options: ["Mostrar la hora en un reloj", "Controladores de electrodomésticos (ej. lavadoras que ajustan agua según nivel de suciedad)", "Enviar correos de texto", "Procesar pagos"], correctAnswer: 1 },
              { question: "La lógica difusa ayuda a los sistemas inteligentes a lidiar con:", options: ["La desconexión a internet", "La ambigüedad e imprecisión del lenguaje humano y el mundo real", "El calentamiento del CPU", "La falta de cables"], correctAnswer: 1 }
            ]
          }
        ]
      },
      {
        id: "u6_s2",
        name: "Sesión 2: Neutrosofía y Defensa Final",
        lessons: [
          { 
            id: "l6_3", 
            title: "6.3 Modelos y Teoría Neutrosófica", 
            type: "theory", 
            xpReward: 50, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "La Neutrosofía es una extensión filosófica de la lógica difusa que introduce un tercer componente clave: la Indeterminación o Neutralidad. Evalúa la Verdad, la Falsedad y la Indeterminación como valores independientes." },
              { type: "subtitle", value: "Características Principales" },
              { type: "list", items: [
                "Terna Neutrosófica: Se expresa como (T, I, F) = (Truth, Indeterminacy, Falsehood).",
                "Manejo de la Ignorancia: Permite modelar matemáticamente cuando simplemente 'no sabemos' la respuesta."
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso" },
              { type: "text", value: "Analizar el sentimiento de un Tweet sobre política, donde puede haber palabras positivas (T), palabras negativas (F) y palabras ambiguas imposibles de clasificar (I)." }
            ],
            quiz: [
              { question: "¿Qué nuevo concepto central introduce la teoría neutrosófica respecto a otras lógicas?", options: ["La velocidad", "La Indeterminación o Neutralidad explícita", "El cálculo en 3D", "La nube"], correctAnswer: 1 },
              { question: "¿Cómo se compone la terna neutrosófica?", options: ["(A, B, C)", "(Verdad, Indeterminación, Falsedad)", "(1, 2, 3)", "(Rojo, Verde, Azul)"], correctAnswer: 1 },
              { question: "¿Qué problema del mundo real ayuda a resolver la neutrosofía?", options: ["Poder modelar matemáticamente la ignorancia o lo que no sabemos", "Hacer que el WiFi sea más rápido", "Bajar el costo de las computadoras", "Limpiar los monitores"], correctAnswer: 0 },
              { question: "En un análisis neutrosófico, ¿pueden la Verdad y la Falsedad ser independientes de la Indeterminación?", options: ["No, están amarradas", "Sí, se evalúan como dimensiones separadas", "Solo en matemáticas simples", "Nunca"], correctAnswer: 1 },
              { question: "Una aplicación útil de la neutrosofía es:", options: ["Pintar bases de datos", "Analizar opiniones ambiguas o contradictorias de usuarios", "Formatear discos duros", "Manejar hardware"], correctAnswer: 1 }
            ]
          },
          { 
            id: "l6_4", 
            title: "6.4 Presentación y Defensa del Proyecto Final", 
            type: "practice", 
            xpReward: 150, 
            isUnlocked: false,
            content: [
              { type: "subtitle", value: "Definición" },
              { type: "text", value: "La defensa es el evento cumbre donde presentas la solución tecnológica ante el tribunal (Feria TechInnova), demostrando el dominio técnico y respondiendo preguntas bajo presión." },
              { type: "subtitle", value: "Características Principales" },
              { type: "list", items: [
                "Síntesis: Regla de menos texto, más gráficos en las diapositivas.",
                "Demostración (Pitch): Mostrar el prototipo funcionando en vivo.",
                "Seguridad y Oratoria: Responder las preguntas justificando las decisiones arquitectónicas."
              ]},
              { type: "subtitle", value: "Ejemplos y Casos de Uso" },
              { type: "text", value: "Explicar por qué se escogió un algoritmo de Machine Learning Supervisado en lugar de otro, demostrando la eficacia del modelo con una prueba en vivo." }
            ],
            quiz: [
              { question: "¿Cuál es el objetivo principal de la presentación del proyecto?", options: ["Leer el documento en voz alta", "Defender y demostrar la validez de tu solución tecnológica", "Hacer tiempo hasta que se acabe la clase", "Mostrar fotos del equipo"], correctAnswer: 1 },
              { question: "La regla de oro para las diapositivas de defensa es:", options: ["Poner todo el código fuente", "Usar letra muy pequeña", "Sintetizar la información y evitar el exceso de texto", "No usar ninguna imagen"], correctAnswer: 2 },
              { question: "Durante la presentación, debes enfocarte críticamente en responder:", options: ["Tu nombre completo y edad", "¿Cómo la tecnología que usaste resolvió el problema inicial?", "El costo de la universidad", "La hora exacta"], correctAnswer: 1 },
              { question: "Si presentas un prototipo de software en la feria, lo ideal es:", options: ["Solo hablar de teoría y ecuaciones", "Hacer una demostración técnica en vivo (Pitch)", "Llevarlo impreso en papel", "Dibujarlo en la pizarra"], correctAnswer: 1 },
              { question: "¿Qué habilidad blanda es clave durante la ronda de preguntas?", options: ["Saber programar en C++", "Síntesis, seguridad y buena oratoria para justificar tus decisiones", "Tipeo rápido", "Memoria fotográfica"], correctAnswer: 1 }
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
// JUEGOS ARCADE ESTRATÉGICOS (Misiones requeridas actualizadas)
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
    requiredLessonId: "l2_4", 
    requiredLessonName: "2.4 Justificación y Estado del Arte",
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
    requiredLessonName: "1.4 Impacto, desafíos y ética digital",
    data: [
      { question: "¿Qué IA crea imágenes desde texto?", correct: "IA Generativa", options: ["IA Generativa", "IoT", "Blockchain", "VR"] },
      { question: "¿Problema donde no sabemos cómo la IA decide?", correct: "Caja Negra", options: ["Caja Negra", "Pantalla Azul", "Ping Alto", "Hardware"] },
      { question: "¿Procesamiento de datos cerca del usuario?", correct: "Edge Computing", options: ["Cloud Computing", "Edge Computing", "Mainframe", "Router"] },
      { question: "¿Tecnología de Bitcoin?", correct: "Blockchain", options: ["Blockchain", "VR", "Machine Learning", "Cloud"] },
      { question: "¿Dispositivos físicos conectados a internet?", correct: "Internet de las Cosas (IoT)", options: ["Internet Oscuro", "Internet de las Cosas (IoT)", "Intranet", "Cables LAN"] }
    ]
  },
  {
    id: "game_sorting_1",
    title: "Clasificador de Datos",
    type: "sorting",
    description: "Acepta o rechaza paquetes de datos para entrenar a tu algoritmo. Evita la basura digital.",
    xpReward: 150,
    requiredLessonId: "l5_2", 
    requiredLessonName: "5.2 Tipos: Supervisado, No supervisado y Refuerzo",
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
    requiredLessonId: "l3_3", 
    requiredLessonName: "3.3 Aplicación en Inteligencia Artificial Generativa",
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
    requiredLessonId: "l4_4", 
    requiredLessonName: "4.4 Gobernanza en IA y Modularidad",
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