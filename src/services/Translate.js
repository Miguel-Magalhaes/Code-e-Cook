export const translateText = async (text, from, to) => {
    try {
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        const traducao = data.responseData.translatedText;

        if (!traducao || traducao.startsWith("MYMEMORY WARNING") || data.responseStatus !== 200) {
            throw new Error("Limite de tradução atingido ou erro na API");
        }

        return traducao;

    } catch (error) {
        console.warn("Falha na tradução (usando original):", error.message);
        return null;
    }
};