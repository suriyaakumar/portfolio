export const prerender = false;

const RAG_ENDPOINT = process.env.RAG_ENDPOINT
const APP_SECRET = process.env.APP_SECRET

export async function POST(request: Request) {
    let body;
    try {
        body = await request.json();
    }
    catch (err) {
        return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
    }

    const question = body.question;
    if (!question) {
        return new Response(JSON.stringify({ error: 'Missing question' }), { status: 400 });
    }

    if (!RAG_ENDPOINT || !APP_SECRET) {
    return new Response(JSON.stringify({ error: "Server misconfiguration" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

    try {
        const response = await fetch(RAG_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-App-Secret': APP_SECRET
            },
            body: JSON.stringify({ question }),
        });

        const data = await response.json();

        return new Response(JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json   '
            }
        })
    }
    catch (err) {
        return new Response(JSON.stringify({ error: 'Failed to get answer' }), { status: 500 });
    }

}
