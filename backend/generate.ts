import * as dotenv from 'dotenv';
dotenv.config();

import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

import { createClient } from '@supabase/supabase-js';

import { SupabaseVectorStore } from 'langchain/vectorstores/supabase';
import { Embeddings } from 'langchain/embeddings/base';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { Document } from 'langchain/document';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';

const supabaseClient = createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_PRIVATE_KEY || '');

export async function processPdf(
    openaiApiKey: string = null,
): Promise<void> {
    openaiApiKey = openaiApiKey || process.env.OPENAI_API_KEY;

    try {
        const embeddings = new OpenAIEmbeddings({
            openAIApiKey: openaiApiKey,
        });

        const loader = new PDFLoader('static/Quad+Cortex+User+Manual+2_0_0.pdf');

        const docs = await loader.load();
        const chunks = await splitDocsIntoChunks(docs);

        await embedDocuments(supabaseClient, chunks, embeddings);
    } catch (error) {
        console.error('Error processing PDF document', error);
    }
}

async function embedDocuments(client, docs: Document[], embeddings: Embeddings) {
    console.log('generating embeddings...');
    await SupabaseVectorStore.fromDocuments(docs, embeddings, {
        client,
        tableName: 'documents',
        queryName: 'watch_documents',
    });
    console.log('embeddings generated and stored in supabase');
}

async function splitDocsIntoChunks(docs: Document[]): Promise<Document[]> {
    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 2000,
        chunkOverlap: 200,
    });

    return (await textSplitter.splitDocuments(docs)) as unknown as Document[];
}
