module.exports = [
"[externals]/react [external] (react, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("react", () => require("react"));

module.exports = mod;
}),
"[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("react/jsx-dev-runtime", () => require("react/jsx-dev-runtime"));

module.exports = mod;
}),
"[project]/apps/web/src/pages/_app.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$store$2f$IDEContext$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/store/IDEContext.tsx [ssr] (ecmascript)");
;
;
;
function MyApp({ Component, pageProps }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$store$2f$IDEContext$2e$tsx__$5b$ssr$5d$__$28$ecmascript$29$__["IDEProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Component, {
            ...pageProps
        }, void 0, false, {
            fileName: "[project]/apps/web/src/pages/_app.tsx",
            lineNumber: 8,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/pages/_app.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
const __TURBOPACK__default__export__ = MyApp;
}),
"[project]/apps/web/src/store/IDEContext.tsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IDEProvider",
    ()=>IDEProvider,
    "useIDE",
    ()=>useIDE
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
;
;
const defaultFiles = [
    {
        id: 'readme',
        name: 'README.md',
        language: 'markdown',
        content: '# Code Engine\n\nA monorepo for a browser-based IDE, backend API, compilation engine, workers, and language runners.'
    },
    {
        id: 'index',
        name: 'index.js',
        language: 'javascript',
        content: '// Welcome to Code Engine!\n\nfunction greet(user) {\n  console.log("Hello, " + user + "!");\n}\n\ngreet("Developer");\n'
    }
];
const IDEContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["createContext"])(undefined);
function IDEProvider({ children }) {
    const [files, setFiles] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(defaultFiles);
    const [activeFileId, setActiveFileId] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('readme');
    const [openFileIds, setOpenFileIds] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([
        'readme',
        'index'
    ]);
    const [terminalOutput, setTerminalOutput] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([
        {
            type: 'system',
            text: 'System ready. Waiting for execution...'
        }
    ]);
    const [isRunning, setIsRunning] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const openFile = (id)=>{
        if (!openFileIds.includes(id)) {
            setOpenFileIds([
                ...openFileIds,
                id
            ]);
        }
        setActiveFileId(id);
    };
    const closeFile = (id)=>{
        const newOpenFiles = openFileIds.filter((fid)=>fid !== id);
        setOpenFileIds(newOpenFiles);
        if (activeFileId === id) {
            setActiveFileId(newOpenFiles.length > 0 ? newOpenFiles[newOpenFiles.length - 1] : null);
        }
    };
    const updateFileContent = (id, content)=>{
        setFiles(files.map((f)=>f.id === id ? {
                ...f,
                content
            } : f));
    };
    const addFile = (name, content = '')=>{
        let language = 'plaintext';
        if (name.endsWith('.js') || name.endsWith('.jsx')) language = 'javascript';
        else if (name.endsWith('.ts') || name.endsWith('.tsx')) language = 'typescript';
        else if (name.endsWith('.md')) language = 'markdown';
        else if (name.endsWith('.html')) language = 'html';
        else if (name.endsWith('.css')) language = 'css';
        else if (name.endsWith('.json')) language = 'json';
        const newFile = {
            id: Date.now().toString(),
            name,
            content,
            language
        };
        setFiles([
            ...files,
            newFile
        ]);
        setOpenFileIds([
            ...openFileIds,
            newFile.id
        ]);
        setActiveFileId(newFile.id);
    };
    const deleteFile = (id)=>{
        setFiles(files.filter((f)=>f.id !== id));
        closeFile(id);
    };
    const addTerminalOutput = (output)=>{
        setTerminalOutput((prev)=>[
                ...prev,
                output
            ]);
    };
    const clearTerminal = ()=>{
        setTerminalOutput([]);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(IDEContext.Provider, {
        value: {
            files,
            activeFileId,
            openFileIds,
            terminalOutput,
            isRunning,
            setActiveFileId,
            openFile,
            closeFile,
            updateFileContent,
            addFile,
            deleteFile,
            addTerminalOutput,
            clearTerminal,
            setIsRunning
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/apps/web/src/store/IDEContext.tsx",
        lineNumber: 112,
        columnNumber: 5
    }, this);
}
function useIDE() {
    const context = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useContext"])(IDEContext);
    if (context === undefined) {
        throw new Error('useIDE must be used within an IDEProvider');
    }
    return context;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1y75uy1._.js.map