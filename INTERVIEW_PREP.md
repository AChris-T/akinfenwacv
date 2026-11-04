# Full-Stack Engineer Interview Prep — 100 Questions with Answers

For: Akinfenwa Taiwo Christopher · Full Stack Engineer (NSS) interview

How to use this: read the answer, then say it out loud in your own words. Interviewers want understanding, not memorised text. The last two sections (projects and behavioural) matter most, practise those until they feel natural.

> Company: SAI Technology (saitechnology.co), Accra, Ghana. See the "SAI Technology" section near the end for what they do, likely focus and tailored questions.

---

## 1. JavaScript fundamentals (1-15)

**1. What is the difference between `let`, `const` and `var`?**
`var` is function-scoped and hoisted; `let` and `const` are block-scoped. `const` cannot be reassigned (though objects it holds can still be mutated). Use `const` by default, `let` when you must reassign, and avoid `var`.

**2. What is hoisting?**
JavaScript moves variable and function declarations to the top of their scope before running. `var` and function declarations are hoisted and usable early; `let`/`const` are hoisted but sit in a "temporal dead zone" until declared, so using them early throws.

**3. Explain `==` vs `===`.**
`==` compares after type coercion; `===` compares value and type with no coercion. Always prefer `===` to avoid surprising conversions.

**4. What is a closure?**
A function that remembers the variables from the scope where it was created, even after that scope has returned. Useful for data privacy and for callbacks that need to keep state.

**5. What is the `this` keyword?**
`this` refers to the object a function is called on. Its value depends on how the function is called, not where it is defined. Arrow functions don't have their own `this`; they inherit it from the surrounding scope.

**6. What is the event loop?**
JavaScript is single-threaded. The event loop lets it handle async work: synchronous code runs first (the call stack), then queued callbacks (microtasks like promises first, then macrotasks like timers) run when the stack is clear.

**7. Difference between synchronous and asynchronous code?**
Synchronous code runs line by line, blocking until each step finishes. Asynchronous code (promises, async/await, callbacks) starts work and continues, handling the result later, so slow tasks like network calls don't freeze the app.

**8. What are promises?**
An object representing a value that will be available later. It is pending, then fulfilled or rejected. You handle it with `.then()`/`.catch()` or with `async/await`.

**9. What does `async/await` do?**
Syntax that makes promise-based code read like synchronous code. `await` pauses the async function until the promise settles. Wrap it in try/catch to handle errors.

**10. What is the difference between `map`, `filter` and `reduce`?**
`map` transforms each item into a new array of the same length. `filter` returns a subset that passes a test. `reduce` boils an array down to a single value.

**11. What is the spread operator?**
`...` expands an array or object into its elements. Useful for copying (`{...obj}`), merging, and passing array items as arguments.

**12. What is destructuring?**
A shorthand to pull values out of arrays or objects into variables, e.g. `const { name } = user` or `const [first] = list`.

**13. Explain shallow vs deep copy.**
A shallow copy duplicates the top level but shares nested objects by reference. A deep copy duplicates everything. `{...obj}` is shallow; `structuredClone(obj)` makes a deep copy.

**14. What is the difference between `null` and `undefined`?**
`undefined` means a variable has been declared but not assigned. `null` is an intentional "no value" that you set yourself.

**15. What are higher-order functions?**
Functions that take other functions as arguments or return functions. `map`, `filter` and event handlers are common examples.

## 2. TypeScript (16-23)

**16. Why use TypeScript over JavaScript?**
It adds static types, so many bugs are caught at build time instead of in production. It also improves autocomplete, refactoring and self-documentation on larger codebases.

**17. What is the difference between `interface` and `type`?**
Both describe the shape of data. `interface` can be extended and merged and suits object shapes; `type` is more flexible for unions, intersections and primitives. In practice they overlap; pick one and stay consistent.

**18. What are generics?**
A way to write reusable code that works with any type while keeping type safety, e.g. `Array<T>` or a function `identity<T>(value: T): T`.

**19. What is the `any` type and why avoid it?**
`any` turns off type checking for that value. It removes TypeScript's safety, so prefer `unknown` (which forces you to check the type) or a precise type.

**20. What is a union type?**
A value that can be one of several types, e.g. `string | number`. You narrow it with checks before using type-specific behaviour.

**21. What does `?` mean on a property?**
It marks the property as optional, so it may be `undefined`.

**22. What is type narrowing?**
Refining a broad type to a specific one using checks like `typeof`, `in`, or `instanceof`, so TypeScript knows which members are safe to use.

**23. What are enums, and what's an alternative?**
Enums give names to a set of related constants. A common lighter alternative is a union of string literals (`type Status = "open" | "closed"`), which is simpler and tree-shakeable.

## 3. React (24-40)

**24. What is the virtual DOM?**
A lightweight copy of the real DOM kept in memory. React compares the new virtual DOM to the previous one (diffing) and updates only the parts of the real DOM that changed, which is faster.

**25. What are components?**
Reusable, self-contained pieces of UI. In modern React they are functions that take props and return JSX.

**26. Props vs state?**
Props are passed in from a parent and are read-only. State is managed inside a component and can change over time, triggering a re-render.

**27. What is `useState`?**
A hook that adds state to a function component. It returns the current value and a setter: `const [count, setCount] = useState(0)`.

**28. What is `useEffect`?**
A hook for side effects (data fetching, subscriptions, timers). It runs after render, and its dependency array controls when it re-runs. Return a cleanup function to undo effects.

**29. What is the dependency array in `useEffect`?**
The list of values the effect depends on. Empty `[]` runs once on mount; with values, it re-runs when any change; omitted, it runs after every render.

**30. What are keys in lists and why do they matter?**
A unique `key` on each list item helps React track which items changed, were added or removed, so it updates efficiently and avoids UI bugs. Use stable IDs, not array indexes where the list reorders.

**31. What is `useMemo`?**
It caches the result of an expensive calculation and only recomputes when its dependencies change, avoiding wasted work on re-renders.

**32. What is `useCallback`?**
It caches a function so the same instance is reused between renders, which helps avoid unnecessary re-renders of child components that depend on it.

**33. What is `useRef`?**
A hook that holds a mutable value that persists across renders without causing a re-render. Common uses: referencing a DOM element or storing a timer ID.

**34. What is `useContext`?**
It reads a shared value from a Context provider without passing props down every level, useful for things like theme or the current user.

**35. What is prop drilling and how do you avoid it?**
Passing props through many layers just to reach a deep component. Avoid it with Context, or a state library like Redux, or by composing components differently.

**36. What is a controlled vs uncontrolled component?**
A controlled input has its value driven by React state. An uncontrolled input keeps its own state in the DOM and you read it with a ref. Controlled is the common choice for forms.

**37. What is Redux and when do you need it?**
A predictable state container for state shared across many parts of a large app. You often don't need it; Context or local state is enough for smaller apps. I've used Redux Toolkit and RTK Query in production.

**38. What is RTK Query?**
A data-fetching and caching layer built into Redux Toolkit. It handles requests, caching, refetching and loading states with typed endpoints, reducing boilerplate.

**39. How do you optimise React performance?**
Memoise expensive work (`useMemo`, `useCallback`, `React.memo`), use stable keys, split code and lazy-load, avoid unnecessary state, and virtualise long lists. Measure first with the React Profiler.

**40. What are React error boundaries?**
Components that catch errors in their child tree and show a fallback UI instead of crashing the whole app.

## 4. Next.js (41-48)

**41. What is Next.js?**
A React framework that adds routing, server-side rendering, static generation, API routes, image optimisation and more, so you can build full-stack apps with React.

**42. SSR vs SSG vs CSR?**
SSR renders the page on the server per request (fresh data, slower). SSG pre-renders at build time (fast, cached). CSR renders in the browser after load. Next.js lets you choose per route.

**43. What is hydration?**
After server-rendered HTML loads, React attaches event handlers and makes it interactive in the browser. That process is hydration.

**44. What is the App Router?**
Next.js's newer routing system based on folders, with Server Components by default, layouts, and file conventions for pages, loading and errors.

**45. Server Components vs Client Components?**
Server Components render on the server, can fetch data directly and ship no JS to the browser. Client Components (`"use client"`) run in the browser and can use state and effects. Use client ones only where you need interactivity.

**46. What is ISR (Incremental Static Regeneration)?**
Static pages that rebuild in the background on a set interval or on demand, so you get static speed with content that stays reasonably fresh. I used ISR on the church platform's public site.

**47. What are API routes / route handlers?**
Backend endpoints that live inside your Next.js app, so you can handle requests, talk to a database, or call other services without a separate server.

**48. How does Next.js help performance and SEO?**
Pre-rendering gives fast first loads and crawlable HTML, plus built-in image optimisation, code splitting and metadata APIs. I added metadata, structured data, a sitemap and social cards to my portfolio.

## 5. Node.js and backend (49-60)

**49. What is Node.js?**
A runtime that lets JavaScript run outside the browser, on the server. It's event-driven and non-blocking, which suits I/O-heavy apps like APIs.

**50. What is Express?**
A minimal Node.js web framework for building APIs and servers with routing and middleware.

**51. What is NestJS?**
A structured Node.js framework (built on top of Express/Fastify) using TypeScript, modules, controllers and dependency injection. It suits larger, maintainable backends. I built a NestJS API with 583 endpoints.

**52. What is middleware?**
Functions that run between the request and the response. They can log, authenticate, validate, or modify the request before it reaches the handler.

**53. What is REST?**
An API style using HTTP methods (GET, POST, PUT, PATCH, DELETE) on resources identified by URLs, returning data (usually JSON). It's stateless.

**54. What are HTTP status codes you should know?**
200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 500 Server Error.

**55. What is the difference between PUT and PATCH?**
PUT replaces the whole resource; PATCH updates part of it.

**56. How do you handle authentication?**
Commonly with tokens (JWT) or sessions. The user logs in, receives a token, and sends it on each request. Store tokens securely (for web, in HttpOnly cookies). I've used Supabase auth with tokens kept in secure server-side cookies.

**57. Authentication vs authorization?**
Authentication is proving who you are (login). Authorization is what you're allowed to do (permissions/roles). I built role-based access with nine permission levels.

**58. What is a job queue and when do you use one?**
A queue runs slow or scheduled tasks in the background (emails, reports, follow-ups) so the main request stays fast. I used BullMQ with Redis for this.

**59. How do you keep an API secure?**
Validate all input, use HTTPS, authenticate and authorise requests, rate-limit, never trust client data, hash passwords, and keep secrets out of the codebase.

**60. What is an environment variable?**
A configuration value kept outside the code (API keys, database URLs). They differ per environment and are never committed to git.

## 6. Databases and SQL (61-70)

**61. SQL vs NoSQL?**
SQL databases (PostgreSQL, MySQL) store structured data in tables with relationships and a schema. NoSQL (MongoDB) stores flexible documents. Choose SQL for relational, consistent data; NoSQL for flexible or rapidly changing shapes.

**62. What is a primary key?**
A column that uniquely identifies each row in a table.

**63. What is a foreign key?**
A column that references the primary key of another table, linking the two and enforcing relationships.

**64. What is a JOIN?**
A query that combines rows from two or more tables based on a related column. INNER JOIN returns matches; LEFT JOIN returns all rows from the left table plus any matches.

**65. What is an index and why use one?**
A data structure that makes lookups on a column much faster, at the cost of extra storage and slightly slower writes. Add indexes to columns you filter or join on often.

**66. What is database normalisation?**
Organising tables to reduce duplication and keep data consistent, typically by splitting data into related tables.

**67. What is an ORM?**
A tool that lets you work with the database using code objects instead of raw SQL, e.g. Prisma. It speeds development and adds type safety. I used Prisma with PostgreSQL.

**68. What is a transaction?**
A group of database operations that all succeed or all fail together, keeping data consistent (for example, moving money between accounts).

**69. How do you prevent SQL injection?**
Never build queries by concatenating user input. Use parameterised queries or an ORM, which separate data from the query.

**70. What is Redis used for?**
An in-memory data store used for caching, sessions and queues because it is very fast. I used it to back job queues.

## 7. APIs, web and the browser (71-80)

**71. What happens when you type a URL and press enter?**
The browser resolves the domain via DNS, opens a connection (TCP/TLS), sends an HTTP request, the server responds with HTML, and the browser parses it, fetches CSS/JS/images, builds the DOM and renders the page.

**72. What is CORS?**
A browser security rule that controls which origins can call your API. The server sends headers to allow specific origins; otherwise the browser blocks the response.

**73. What is the difference between cookies, localStorage and sessionStorage?**
Cookies are small and sent with every request (good for auth, can be HttpOnly). localStorage persists until cleared; sessionStorage lasts for the tab session. Only cookies are sent to the server automatically.

**74. What are Core Web Vitals?**
Google's user-experience metrics: LCP (loading), INP (interactivity) and CLS (visual stability). They affect both experience and SEO.

**75. How do you make a site responsive?**
Fluid layouts, flexible units, CSS media queries or container queries, and mobile-first design so it adapts to any screen.

**76. What is accessibility (a11y) and why does it matter?**
Building so people with disabilities can use the site: semantic HTML, keyboard navigation, screen-reader support, colour contrast and ARIA where needed. It's the right thing to do and often a legal requirement.

**77. What is debouncing and throttling?**
Both limit how often a function runs. Debounce waits until activity stops (good for search inputs); throttle runs at most once per interval (good for scroll handlers).

**78. What is lazy loading?**
Loading resources (images, components, routes) only when needed, which speeds up the initial load.

**79. What is a WebSocket?**
A persistent two-way connection between client and server, used for real-time features like chat or live updates, unlike request-response HTTP.

**80. What is an API rate limit?**
A cap on how many requests a client can make in a time window, to protect the server from overload and abuse.

## 8. Git and tooling (81-85)

**81. What is Git?**
A version control system that tracks changes to code, lets you branch, merge and collaborate, and roll back when needed.

**82. Difference between `git merge` and `git rebase`?**
Merge combines branches and keeps both histories with a merge commit. Rebase replays your commits on top of another branch for a linear history. Rebase rewrites history, so avoid it on shared branches.

**83. What is a pull request?**
A proposal to merge your branch into another, where teammates review the code before it's merged.

**84. What is CI/CD?**
Continuous Integration runs tests and checks automatically on each change; Continuous Delivery/Deployment automates releasing it. It keeps quality high and shipping fast.

**85. What is the difference between `git fetch` and `git pull`?**
`fetch` downloads changes but doesn't apply them; `pull` fetches and merges into your current branch.

## 9. Testing (86-90)

**86. Why write tests?**
To catch bugs early, prevent regressions, document behaviour and let you change code with confidence.

**87. Unit vs integration vs end-to-end tests?**
Unit tests check a small piece in isolation. Integration tests check pieces working together. End-to-end tests drive the whole app like a real user.

**88. What tools have you used for testing?**
Jest and Vitest for unit and integration tests, and testing across unit, integration, component, API and end-to-end levels.

**89. What is test-driven development (TDD)?**
Writing a failing test first, then the code to make it pass, then refactoring. It keeps code focused and well-covered.

**90. What makes a good test?**
It's fast, reliable, independent, tests behaviour not implementation details, and fails with a clear message.

## 10. System design and general (91-93)

**91. How would you design a URL shortener?**
Store a mapping of short code to long URL in a database, generate unique short codes, redirect on lookup, and add caching for popular links and analytics if needed.

**92. How do you approach debugging a production issue?**
Reproduce it, check logs and monitoring (e.g. Sentry), isolate the cause, fix it with a test to prevent regression, and communicate status. I hardened a dashboard so a malformed API response could no longer crash it.

**93. How do you keep a large codebase maintainable?**
Clear structure and naming, small focused modules, typed contracts, tests, code reviews, and consistent conventions. I split a 150-line component into small single-responsibility pieces for this reason.

## 11. Your projects (94-97)

**94. Tell me about a project you're proud of.**
The Everlasting Hills Church platform. I designed and built it on my own in five months: a Next.js web app and a NestJS/Prisma API with 583 endpoints over a 129-model PostgreSQL database. It has role-based access across nine levels, background job queues, online payments via Paystack, and works offline as a PWA. I owned it end to end, from schema to UI.

**95. What's the hardest bug you've fixed?**
At Viro, a filter bug was silently dropping whole voice conversations from the chat history. I traced the mismatch between the frontend and the backend API, fixed the filtering, and hardened the code so a malformed response can no longer crash the dashboard.

**96. Describe working on an AI product.**
At Viro I build the product around the AI. A dedicated ML engineer builds the models and agents; I build the interfaces and integration: a streaming chat assistant, rich result cards with citations, real-time voice with LiveKit, and a command menu that runs the AI's skills. I also handle AI output defensively, fixing blank citations and duplicate messages.

**97. Tell me about building something from scratch.**
SparkPayHQ, a Nigerian payroll platform, was built around local statutory rules that generic tools get wrong: PAYE tax per state, pension (PFA) and National Housing Fund deductions. I worked full-stack across the product.

## 12. Behavioural and fit (98-100)

**98. Why do you want to work here?**
(Tailor to the company once I add the research section.) Keep it specific: name what they build, why it interests you, and how your full-stack, build-from-scratch experience fits.

**99. How do you handle learning something new quickly?**
Give a real example: at Vaultly I moved the project from Expo Go to EAS builds to support native modules I hadn't used before, reading the docs and keeping local builds running so testing was never blocked. I use AI tools to learn faster, then verify and test what I build.

**100. Where do you see yourself growing, and how do you handle feedback?**
Show you want to grow into a stronger engineer, take ownership, and that you value code review and feedback as a way to improve. Give a short example of acting on feedback.

---

## SAI Technology — company research and tailored questions

### What they do
SAI Technology is a tech company in Accra, Ghana. Their line is "Engineering intelligent systems for enterprise growth" and "We build and operate the systems businesses run on." They are not a website agency. They build custom enterprise software and then run it (hosting, monitoring, maintenance and support), which they treat as part of the work, not an add-on.

**Service lines:** enterprise software (custom platforms, portals, dashboards, operational systems), learning management platforms (LMS), Microsoft 365 and business systems, managed site visibility (construction and remote operations), and managed IT and infrastructure.

**Products they build and operate themselves:**
- **Transveo** — freight forwarding, shipment tracking and documentation (African logistics).
- **Swift Transport** — mobility, ticketing and shuttle operations.
- **Casa360** — property management, maintenance and service requests.
- **Nexus** — an AI-powered layer for automating internal workflows, knowledge and decision support.
- **SAI Studio** — a product aimed at smaller businesses.

**Who they serve:** organisations whose work is too operationally complex for off-the-shelf tools: logistics, education, transport, property and enterprise operations.

**How they work (their stated process):** 1) Map the operating reality (document users, workflows, systems, constraints and failure points before choosing architecture). 2) Build the right system (platform, automation, infrastructure, access controls, integrations). 3) Run and improve it (deployment, monitoring, maintenance, documentation). Their value is to start from real workflows, not a technology preference, and to stay accountable after launch.

### What this means for your interview
Their work is **workflow-heavy enterprise systems with lots of integrations, multi-tenant access, and ownership after deployment**. That is a strong match for you: the church platform is exactly an operational system with complex workflows, roles and integrations, and SparkPayHQ was a complex-rules domain (Nigerian payroll). Lead with those. Expect questions about how you understand a business problem before coding, how you build systems that serve different user roles, how you integrate third-party services, and how you keep a system running in production.

They didn't list a tech stack publicly, so **ask what they use**. Your React, Next.js, Node.js, NestJS and PostgreSQL stack fits enterprise systems well.

### Tailored questions and how to answer

**C1. What does SAI Technology do, in your words?**
They build and operate custom software for businesses with complex operations, logistics, education, property, transport, across building the system and then running it (monitoring, maintenance, support). They focus on real workflows, not off-the-shelf tools.

**C2. Why do you want to work at SAI Technology?**
I want to build systems that businesses actually run on, not throwaway sites, and that is exactly what SAI does. My strongest work is operational platforms: I built a full management platform with complex roles, workflows and integrations on my own, and a payroll system built around tricky local rules. SAI works on that kind of real, operationally complex software across logistics, property and education, and I'd like to grow as a full-stack engineer owning systems end to end, including after they ship.

**C3. Their process starts by "mapping the operating reality" before building. How would you approach a system for a workflow you don't fully understand yet?**
I'd start by talking to the people who do the work, map the steps, the data that moves, the systems involved and where things currently break, before choosing any architecture. On the church platform I had to model many real workflows (membership, follow-up, giving, events) into one system, so I'm used to understanding the operation first, then designing the data model and APIs around it.

**C4. Many of their products serve different user types (admins, operators, customers). How do you build for multiple roles safely?**
Role-based access control, where each role only sees and does what it should, enforced on the backend, not just hidden in the UI. On the church platform I built nine permission levels scoped by department, with audit logging, so every action is traceable.

**C5. Their products are integration-heavy (logistics, payments, documents). How do you integrate third-party services well?**
Read the docs, isolate each integration behind a clear interface, handle errors and retries, keep API keys in environment variables, and version the integration config so it's easy to upgrade. I've integrated payments (Paystack), KYC (Dojah), banking (Anchor), AI (Gemini) and real-time voice (LiveKit) in production.

**C6. SAI doesn't just build, they run systems in production. How do you support a live system?**
Logging and monitoring to catch issues early (I use Sentry), clear error handling so failures are visible not silent, and defensive coding so bad input or a bad response can't crash the app. I hardened a dashboard so a malformed API response could no longer bring it down.

**C7. Transveo is freight/logistics, Casa360 is property, Operon is procurement. How do you get up to speed in an unfamiliar domain quickly?**
I learn the domain from the people and the workflow first, and I'm comfortable doing it: SparkPayHQ meant learning Nigerian payroll rules (PAYE per state, PFA, NHF), and Vaultly meant learning fintech onboarding and banking APIs. I ask questions, map the process, and build in small, testable pieces.

**C8. They mention an AI product (Nexus) for automating workflows. What's your AI experience?**
I build the product and integration around AI, while ML engineers build the models. I've integrated AI into products (a streaming assistant, tool-driven actions, Gemini summaries) and I handle AI output carefully: validating it, handling failures, and not letting a bad response break the app.

**C9. How do you make sure what you build is maintainable for the team that runs it afterwards?**
Clear structure, typed contracts, tests, documentation and consistent conventions, so the next person can understand and change it safely. I split large components into small focused ones and keep the app and API in sync with checks.

**C10. What would you do in your first weeks here?**
Learn the systems and the domains, read the codebase, understand how they map workflows and run things in production, and start contributing on small, well-scoped tasks while asking a lot of questions.

**C11. (If asked about Microsoft 365 / identity / infrastructure.)**
Be honest: that's not where my hands-on experience is, my strength is full-stack product engineering (React, Next.js, Node, NestJS, PostgreSQL). I learn fast and would get up to speed; for example I picked up EAS mobile builds and native modules on Vaultly when I needed to.

**C12. Questions to ask them**
- What does your tech stack look like across the products?
- How is the engineering team structured, and how would an NSS engineer fit in?
- How do you balance building new systems with running and supporting the existing ones?
- What would a successful first few months in this role look like?
- Which product or domain would I most likely start on?

### Before the interview
- Look at transveo.co, swifttransport.app and casa360.app so you can speak about their real products.
- Read one or two of their "Insights" articles (saitechnology.co/insights) to understand how they think.
- Note: "NSS" is Ghana's National Service Scheme, so this is likely a national-service placement. Expect fundamentals plus a lot about your projects, and show eagerness to learn and contribute.

---

### Final tips
- Practise questions 94-100 out loud until they're natural. Interviewers probe your real projects hardest.
- For anything you haven't done, say so honestly and show how you'd learn it. Never bluff.
- Prepare 3-4 questions to ask them (team size, tech stack, how they work, what success looks like in the first few months).
- Have your portfolio and CV open during the call.
