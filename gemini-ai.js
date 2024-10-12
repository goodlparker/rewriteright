const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = (text) => `Rewrite the following text to be grammatically correct and in a casual tone: "${text}". Please provide four different versions as specified below:

1. **Simple and straightforward**: This should be a direct and easy-to-understand rewrite.
2. **Informal and slightly more colloquial**: This should use casual language and expressions.
3. **Slightly more formal, but still casual**: This should have a relaxed tone while incorporating a bit more formality.
4. **A bit more formal, but still accurate**: This should maintain accuracy with a more polished style.

Please return the responses in JSON format as follows:
{
  "simple_straight": "",
  "informal_colloquial": "",
  "formal_still_casual": "",
  "formal_accurate": ""
}`;

/**
 * @typedef {Object} FixedTextResponse
 * @property {string} simple_straight - A simple and straightforward rewrite.
 * @property {string} informal_colloquial - An informal and slightly more colloquial rewrite.
 * @property {string} formal_still_casual - A slightly more formal, but still casual rewrite.
 * @property {string} formal_accurate - A bit more formal, but still accurate rewrite.
 * @property {string} original - The original input text.
 */

/**
 * Generates various responses based on the input text.
 *
 * @param {string} text - The input text that will be rewritten in different styles.
 * @returns {Promise<FixedTextResponse>} resolves the FixedTextResponse
 */
async function rewriteText(text) {
    const result = await model.generateContent(prompt(text), {
        // Optionally define parameters for text generation like temperature, etc.
        temperature: 0.4,
    });

    const response = await result.response;
    const textResponse = response.text();
    const jsonStr = textResponse.replace("```json", "").replace("```", "");
    try {   
        return JSON.parse(jsonStr);
    } catch(err) {
        return {
            original: jsonStr
        }
    }
}

const REVISED_TEXT_TITLES = {
    simple_straight: "Simple and straightforward",
    informal_colloquial: "Informal and slightly more colloquial",
    formal_still_casual: "Slightly more formal, but still casual",
    formal_accurate: "A bit more formal, but still accurate"
}


module.exports = {
    rewriteText,
    REVISED_TEXT_TITLES
}