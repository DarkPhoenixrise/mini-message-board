const assert = require("node:assert/strict");
const { after, test } = require("node:test");
const app = require("../server");

const server = app.listen(0);
const baseUrl = `http://localhost:${server.address().port}`;

after(() => new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
}));

test("messages reject blank text and preserve valid text", async () => {
    const invalidResponse = await fetch(`${baseUrl}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: "   " })
    });

    assert.equal(invalidResponse.status, 400);

    const acceptedResponse = await fetch(`${baseUrl}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: " hello " })
    });

    assert.equal(acceptedResponse.status, 200);
    assert.deepEqual(await acceptedResponse.json(), { success: true });

    const messagesResponse = await fetch(`${baseUrl}/messages`);
    assert.deepEqual(await messagesResponse.json(), ["hello"]);
});