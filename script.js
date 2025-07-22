async function askGPT() {
    const userInput = document.getElementById('userInput').value;
    const res = await fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput })
    });

    const text = await res.text();
    document.getElementById('response').textContent = text;
}