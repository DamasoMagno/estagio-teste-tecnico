import { Db } from "mongodb";
import { client } from "./mongo";

export let db: Db;

export async function connectToDatabase() {
  try {
    await client.connect();
    db = client.db('api_estagio'); // Substitua pelo nome do seu banco de dados
    console.log('Conectado ao MongoDB');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
  }
}
