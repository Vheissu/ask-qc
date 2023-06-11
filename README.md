# ask-qc
Ask questions about the Quad Cortex user manual using plain language.

## Askaurelia

The Quad Cortex PDF manual is very dry reading. This app makes it easy to ask questions about the Quad Cortex PDF manual without having to scroll through and find what you're looking for. To keep costs low, there are limits on the number of questions you can ask per day and you need to signin using GitHub. Currently this is 25 queries per day.

Try the app here: https://ask-qc-production.up.railway.app/

## Self-hosted

If you want to host your own version of AskQC, there are a few things.

In `backend` create a new file called `.env` based on the `.env.example` file. Make sure you provide  your OpenAI API key and defined query limit per 24 hours.

Make sure you `npm install` dependencies in both `backend` and `frontend` directories.

Run the backend server with `npm start` in the `backend` directory. The front-end can be run by running `npm start` in the `frontend` directory (make sure the backend is running).

The backend is built using Supabase. Make sure you run the `npx ts-node generate-cli.ts` in the backend directory to generate the embeddings before attempting to use the app.