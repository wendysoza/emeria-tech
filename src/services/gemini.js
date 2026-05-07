const API_KEY = "AIzaSyDXhjsJL-hn-Z1wHQwNUo7x9NG2OQLiaWE"; 
const MODEL_NAME = "gemini-2.5-flash";

export const geminiService = {
  async askQuestion(question) {
    if (!API_KEY && typeof window === 'undefined') return "Error: API Key no configurada.";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;
    const systemPrompt = "Eres EMERIA AI, asistente experto en Tecnologías Emergentes de la UNESUM (Carrera TI). Ayuda a estudiantes de 8vo semestre con IA, Sistemas Basados en Conocimiento y Machine Learning.";
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: question }] }], systemInstruction: { parts: [{ text: systemPrompt }] } })
      });
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "EMERIA TECH: Error de respuesta.";
    } catch (e) { return "Error de conexión con el núcleo de IA."; }
  }
};