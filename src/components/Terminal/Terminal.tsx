import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TerminalInput from "./TerminalInput";
import TerminalOutput from "./TerminalOutput";
import { formatDateTime } from "../../utils/dateUtils";
import { getIPAddress } from "../../utils/ipUtils";
import { commands } from "./commands";
import { CommandResponse, OutputLine, LoginInfo } from "./types";

const Terminal: React.FC = () => {
  const [output, setOutput] = useState<OutputLine[]>([]);
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    time: formatDateTime(new Date()),
    ip: "",
  });
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeTerminal = async () => {
      const ip = await getIPAddress();
      setLoginInfo((prev) => ({ ...prev, ip }));
      setOutput([
        {
          id: "login",
          type: "system",
          content: `Last login: ${loginInfo.time} from ${ip}`,
        },
        {
          id: "welcome",
          type: "info",
          content:
            'Type "navbar" to reveal navigation or "help" for all commands',
        },
      ]);
    };

    initializeTerminal();
  }, []);

  const handleCommand = async (command: string) => {
    const newOutput = [...output];
    newOutput.push({
      id: `command-${Date.now()}`,
      type: "command",
      content: `$ ${command}`,
    });

    if (command === "clear") {
      setOutput([
        {
          id: "login",
          type: "system",
          content: `Last login: ${loginInfo.time} from ${loginInfo.ip}`,
        },
      ]);
      return;
    }

    if (command === "navbar") {
      document.dispatchEvent(new CustomEvent("toggleNavbar"));
      newOutput.push({
        id: `response-${Date.now()}`,
        type: "success",
        content: "Navigation revealed successfully",
      });
    } else if (command in commands) {
      const result = commands[command as keyof typeof commands]();
      newOutput.push({
        id: `response-${Date.now()}`,
        ...result,
      });
    } else {
      newOutput.push({
        id: `error-${Date.now()}`,
        type: "error",
        content: `Command not found: ${command}`,
      });
    }

    setOutput(newOutput);
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <motion.div
      className="w-full max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        ref={terminalRef}
        className="bg-black/80 backdrop-blur-sm border border-green-500/20 rounded-lg p-4 h-[300px] overflow-y-auto relative group"
      >
        <motion.div
          className="absolute inset-0 bg-green-500/5 rounded-lg -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            <TerminalOutput output={output} />
          </AnimatePresence>
          <TerminalInput onCommand={handleCommand} prompt="~/aRyan >" />
        </div>
      </div>
    </motion.div>
  );
};

export default Terminal;
