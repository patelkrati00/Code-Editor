import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, Play, Save, LogOut, ChevronDown, Sun, Moon, Terminal } from 'lucide-react';
import Editor from '@monaco-editor/react';

const EditorPage = () => {
  // State management
  const [code, setCode] = useState('// Start coding here...\nconsole.log("Hello CodeDitor!");');
  const [output, setOutput] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [editorTheme, setEditorTheme] = useState('vs-dark');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  
  const editorRef = useRef(null);

  // Available languages
  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'json', label: 'JSON' },
  ];

  // Handle editor mount
  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  // Handle theme toggle
  const toggleTheme = () => {
    setEditorTheme(prev => prev === 'vs-dark' ? 'light' : 'vs-dark');
  };

  // Placeholder handlers for buttons
  const handleRun = () => {
    setOutput(`> Running ${selectedLanguage} code...\n> Output will appear here\n> [Execution completed]`);
  };

  const handleSave = () => {
    console.log('Save clicked - code:', code);
  };

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  return (
    <div className="min-h-screen bg-[#0A0B14] text-[#E6E9F0] font-['Inter',sans-serif] flex flex-col">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-50 backdrop-blur-xl bg-gradient-to-r from-[#0A0B14]/80 via-[#0A0B14]/60 to-[#0A0B14]/80 border-b border-[#5B8DEF]/20"
      >
        <div className="max-w-full mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#5B8DEF] to-[#9A7DFF] blur-lg opacity-50"></div>
              <Code2 className="relative w-7 h-7 text-[#5B8DEF]" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#5B8DEF] to-[#9A7DFF] bg-clip-text text-transparent">
              CodeDitor
            </span>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            {/* Run Button */}
            <motion.button
              onClick={handleRun}
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(91, 141, 239, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="relative group px-6 py-2.5 rounded-xl overflow-hidden font-semibold text-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#5B8DEF] to-[#9A7DFF] opacity-100 group-hover:opacity-90 transition-opacity"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#5B8DEF] to-[#9A7DFF] blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
              <span className="relative z-10 flex items-center gap-2">
                <Play className="w-4 h-4" />
                Run
              </span>
            </motion.button>

            {/* Save Button */}
            <motion.button
              onClick={handleSave}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 rounded-xl backdrop-blur-xl bg-[#E6E9F0]/5 border border-[#5B8DEF]/30 hover:border-[#5B8DEF] hover:bg-[#5B8DEF]/10 transition-all duration-300 font-semibold text-sm flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save
            </motion.button>

            {/* Logout Button */}
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 rounded-xl backdrop-blur-xl bg-[#E6E9F0]/5 border border-[#9A7DFF]/30 hover:border-[#9A7DFF] hover:bg-[#9A7DFF]/10 transition-all duration-300 font-semibold text-sm flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Main Editor Container */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4 overflow-hidden">
        {/* Left Panel - Code Editor */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 lg:w-1/2 relative"
        >
          <div className="h-full rounded-2xl overflow-hidden backdrop-blur-xl bg-[#0A0B14]/40 border border-[#5B8DEF]/20 shadow-[0_0_30px_rgba(91,141,239,0.15)]">
            {/* Editor Header */}
            <div className="px-4 py-3 border-b border-[#5B8DEF]/20 flex items-center justify-between backdrop-blur-xl bg-[#0A0B14]/60">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-[#5B8DEF]" />
                <span className="text-sm font-semibold">Code Editor</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#9A7DFF]/40"></div>
                <div className="w-3 h-3 rounded-full bg-[#5B8DEF]/40"></div>
                <div className="w-3 h-3 rounded-full bg-[#E6E9F0]/40"></div>
              </div>
            </div>

            {/* Monaco Editor */}
            <div className="h-[calc(100%-52px)]">
              <Editor
                height="100%"
                language={selectedLanguage}
                value={code}
                onChange={(value) => setCode(value || '')}
                onMount={handleEditorDidMount}
                theme={editorTheme}
                options={{
                  fontSize: 14,
                  fontFamily: "'JetBrains Mono', monospace",
                  minimap: { enabled: true },
                  scrollBeyondLastLine: false,
                  wordWrap: 'on',
                  automaticLayout: true,
                  padding: { top: 16, bottom: 16 },
                  lineNumbers: 'on',
                  roundedSelection: true,
                  cursorBlinking: 'smooth',
                  cursorSmoothCaretAnimation: true,
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Right Panel - Console Output */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex-1 lg:w-1/2 relative"
        >
          <div className="h-full rounded-2xl overflow-hidden backdrop-blur-xl bg-[#0A0B14]/40 border border-[#9A7DFF]/20 shadow-[0_0_30px_rgba(154,125,255,0.15)]">
            {/* Console Header */}
            <div className="px-4 py-3 border-b border-[#9A7DFF]/20 flex items-center justify-between backdrop-blur-xl bg-[#0A0B14]/60">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#9A7DFF]" />
                <span className="text-sm font-semibold">Console Output</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setOutput('')}
                className="text-xs px-3 py-1 rounded-lg bg-[#9A7DFF]/10 hover:bg-[#9A7DFF]/20 border border-[#9A7DFF]/30 transition-all"
              >
                Clear
              </motion.button>
            </div>

            {/* Console Content */}
            <div className="h-[calc(100%-52px)] p-4 overflow-y-auto">
              <pre className="font-['JetBrains_Mono',monospace] text-sm text-[#E6E9F0]/80 whitespace-pre-wrap">
                {output || '// Console output will appear here...\n// Click "Run" to execute your code'}
              </pre>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative z-40 backdrop-blur-xl bg-gradient-to-r from-[#0A0B14]/80 via-[#0A0B14]/60 to-[#0A0B14]/80 border-t border-[#5B8DEF]/20"
      >
        <div className="max-w-full mx-auto px-6 py-3 flex items-center justify-between">
          {/* Language Selector */}
          <div className="relative">
            <motion.button
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg backdrop-blur-xl bg-[#E6E9F0]/5 border border-[#5B8DEF]/30 hover:border-[#5B8DEF] transition-all duration-300 text-sm font-medium"
            >
              <Code2 className="w-4 h-4 text-[#5B8DEF]" />
              {languages.find(lang => lang.value === selectedLanguage)?.label || 'Select Language'}
              <ChevronDown className="w-4 h-4" />
            </motion.button>

            {/* Language Dropdown */}
            {showLanguageDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute bottom-full mb-2 left-0 w-48 rounded-xl backdrop-blur-xl bg-[#0A0B14]/95 border border-[#5B8DEF]/30 shadow-[0_0_30px_rgba(91,141,239,0.2)] overflow-hidden"
              >
                {languages.map((lang) => (
                  <button
                    key={lang.value}
                    onClick={() => {
                      setSelectedLanguage(lang.value);
                      setShowLanguageDropdown(false);
                    }}
                    className={`w-full px-4 py-2.5 text-left text-sm hover:bg-[#5B8DEF]/10 transition-colors ${
                      selectedLanguage === lang.value ? 'bg-[#5B8DEF]/20 text-[#5B8DEF]' : 'text-[#E6E9F0]'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </motion.div>
            )}
          </div>

          {/* Status Info */}
          <div className="flex items-center gap-6 text-sm text-[#E6E9F0]/60">
            <span>Lines: {code.split('\n').length}</span>
            <span>Characters: {code.length}</span>
            <span className="px-3 py-1 rounded-lg bg-[#5B8DEF]/10 border border-[#5B8DEF]/30">
              {selectedLanguage.toUpperCase()}
            </span>
          </div>

          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.05, rotate: 180 }}
            whileTap={{ scale: 0.95 }}
            className="p-2.5 rounded-lg backdrop-blur-xl bg-[#E6E9F0]/5 border border-[#9A7DFF]/30 hover:border-[#9A7DFF] hover:bg-[#9A7DFF]/10 transition-all duration-300"
            title="Toggle Editor Theme"
          >
            {editorTheme === 'vs-dark' ? (
              <Sun className="w-5 h-5 text-[#9A7DFF]" />
            ) : (
              <Moon className="w-5 h-5 text-[#9A7DFF]" />
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Background Glow Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#5B8DEF]/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#9A7DFF]/10 rounded-full blur-[100px]"
        />
      </div>
    </div>
  );
};

export default EditorPage;