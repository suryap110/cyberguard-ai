import re
import json

class UniversalChatGPTStructureEngine:
    """
    CYBERGUARD Universal ChatGPT Structure Engine.
    Structures EVERY SINGLE answer (coding, doubts, science, business, general Q&A)
    following ChatGPT's exact 5-Part Structural Blueprint:
    
    1. Warm Conversational Opening ("Sure! Here is...")
    2. Primary Answer / Code Block
    3. Output Box (when applicable)
    4. Quick Explanation (bullet points)
    5. Encouraging Follow-Up Offer
    """

    def generate_response(self, user_prompt: str, user_context: dict = None) -> dict:
        prompt = user_prompt.strip()
        prompt_lower = prompt.lower()

        # 1. DOUBT / QUESTION ASSISTANCE ("i have doubt", "can you help me")
        if any(w in prompt_lower for w in ["i have doubt", "i have a doubt", "doubt", "have question", "can u help me", "can you help me"]):
            return {
                "text": "Sure! 😊 Tell me your doubt. I'll help you understand it step by step.\n\nFeel free to type your question or paste any code/text you want me to analyze!"
            }

        # 2. GREETINGS
        elif prompt_lower in ["hi", "hello", "hey", "hie", "yo", "good morning", "good evening", "hi there"]:
            return {
                "text": "Hi! 👋 What's up? How can I help you today?"
            }

        # 3. CODE / PROGRAMMING REQUESTS (Uses ChatGPT Code Structure)
        elif any(w in prompt_lower for w in ["code", "python", "java", "js", "javascript", "typescript", "react", "fastapi", "sql", "html", "css", "c++", "cpp", "write", "build", "create", "program", "function", "script"]):
            lang = "python"
            if "java" in prompt_lower:
                lang = "java"
            elif "c++" in prompt_lower or "cpp" in prompt_lower:
                lang = "cpp"
            elif "sql" in prompt_lower:
                lang = "sql"
            elif any(k in prompt_lower for k in ["javascript", "js", "react", "typescript"]):
                lang = "typescript"

            return self._format_chatgpt_code_response(prompt, lang)

        # 4. BUSINESS & PITCH REQUESTS (Uses ChatGPT Structured Breakdown)
        elif any(w in prompt_lower for w in ["pitch", "crore", "sell", "business", "investor", "valuation", "hackathon", "revenue", "startup", "vc", "market"]):
            return {
                "text": f"""Sure! Here is a multi-crore strategic pitch breakdown for **CYBERGUARD AI**:

### 📊 Market Opportunity:
- **₹12,000+ Crores** lost annually in India to UPI fraud, deepfake scams, and remote access Trojans.

### ⚡ Product UVP:
- **CYBERGUARD AI** provides real-time proactive fraud interception via deepfake voice harmonics, 6-digit UPI PIN protection, and 1-click SOAR playbooks.

### 💰 Revenue Model:
1. **B2B Bank API Licensing**: ₹15 Lakhs/year per bank.
2. **B2C Premium Subscriptions**: ₹199/month per household.

**Quick explanation:**
- **Proactive Security** → Stops fraud before money leaves the bank account.
- **Enterprise B2B** → Scalable API integration into mobile banking apps.

Let me know if you would like me to expand on any of these sections!"""
            }

        # 5. UNIVERSAL GENERAL QUESTION (Uses ChatGPT Explanation Structure)
        else:
            return self._format_chatgpt_explanation_response(prompt)

    def _format_chatgpt_code_response(self, prompt: str, lang: str) -> dict:
        if lang == "java":
            code = """class Main {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}"""
            output = "Hello World"
            expl = [
                "`class Main` → defines the class container.",
                "`main()` → entrypoint method executed by the Java Virtual Machine.",
                "`System.out.println()` → prints output text to standard console."
            ]
        elif lang == "cpp":
            code = """#include <iostream>

int main() {
    std::cout << "Hello World" << std::endl;
    return 0;
}"""
            output = "Hello World"
            expl = [
                "`#include <iostream>` → includes standard stream I/O header.",
                "`int main()` → main execution function.",
                "`std::cout` → outputs text stream to standard console."
            ]
        elif lang == "sql":
            code = """SELECT user_id, user_email, security_score 
FROM users 
WHERE security_score > 90 
ORDER BY security_score DESC;"""
            output = "3 rows returned (user_id: 101, score: 98)"
            expl = [
                "`SELECT` → specifies columns to retrieve.",
                "`WHERE` → filters records matching high security scores.",
                "`ORDER BY DESC` → sorts results from highest score to lowest."
            ]
        else:
            code = """# Clean Production Python Implementation
def execute_task(input_data):
    print(f"Processing: {input_data}")
    return {"status": "SUCCESS", "result": input_data}

# Test invocation
if __name__ == "__main__":
    result = execute_task("Hello World")
    print(result)"""
            output = """Processing: Hello World
{'status': 'SUCCESS', 'result': 'Hello World'}"""
            expl = [
                "`def execute_task()` → defines the function signature.",
                "`print()` → logs execution parameters to stdout.",
                "`return` → returns structured result dictionary."
            ]

        expl_bullets = "\n".join([f"- {e}" for e in expl])

        text = f"""Sure! Here is the program for **{prompt}**:

```{lang}
{code}
```

**Output:**
```
{output}
```

**Quick explanation:**
{expl_bullets}

Let me know if you'd like me to modify or add anything to this!"""

        return {
            "text": text,
            "codeSnippet": code,
            "codeLang": lang
        }

    def _format_chatgpt_explanation_response(self, prompt: str) -> dict:
        title = prompt.strip().capitalize()
        text = f"""Sure! I'd be happy to explain **{title}**:

Here is how it works step by step:

1. **Core Concept**:
   {title} centers around foundational principles designed to solve specific tasks efficiently and reliably.

2. **Key Execution Steps**:
   - **Step 1**: Establish input parameters and clear boundary conditions.
   - **Step 2**: Apply structured analytical processing to execute tasks.
   - **Step 3**: Validate outputs against expected baseline criteria.

**Quick explanation:**
- **Primary Goal** → Delivers consistent, accurate results.
- **Best Approach** → Focus on core logic and test edge cases.

Let me know if you have any questions about this or if you'd like me to explain further!"""

        return {"text": text}

copilot_engine = UniversalChatGPTStructureEngine()
