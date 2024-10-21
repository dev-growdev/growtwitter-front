import axios from "axios";

interface WordData {
  count: number;
  first_occurrence: string;
}

interface ApiResponse {
  [word: string]: WordData;
}

interface ProcessedItem {
  title: string;
  content: string;
  created_at: string;
}

async function fetchAndProcessWords(): Promise<ProcessedItem[]> {
  try {
    const response = await axios.get<ApiResponse>('http://127.0.0.1:8000/api/words');
    const data = response.data;
    return Object.entries(data).map(([word, wordData]) => ({
      title: word.charAt(0).toUpperCase() + word.slice(1),
      content: `Assunto sobre ${word.charAt(0).toUpperCase() + word.slice(1)}`,
      created_at: wordData.first_occurrence
    }));
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

export const items: ProcessedItem[] = await fetchAndProcessWords();