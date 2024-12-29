import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Terminal, Lock, AlertTriangle, Code } from "lucide-react";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("ACCESS_DENIED: AUTHENTICATION_FAILED");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Matrix-like background effect */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-green-500 font-mono text-lg animate-fade-down"
            style={{
              left: `${i * 10}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: "3s",
            }}
          >
            {Array.from({ length: 15 }).map((_, j) => (
              <div key={j} className="my-4">
                {Math.random().toString(36).substr(2, 1)}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="w-full max-w-md p-8 relative z-10">
        <div className="bg-black p-8 rounded-lg border border-green-500 shadow-lg shadow-green-500/20">
          {/* Decorative top banner */}
          <div className="absolute top-0 left-0 w-full h-1 bg-green-500 opacity-50"></div>

          <div className="flex justify-center mb-6">
            <div className="relative">
              <Terminal className="w-16 h-16 text-green-500 animate-pulse" />
              <div className="absolute -inset-1 bg-green-500 opacity-20 blur-sm animate-pulse"></div>
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-mono text-green-500 mb-2">
              SYSTEM ACCESS
            </h2>
            <div className="text-green-600 font-mono text-xs animate-pulse">
              &gt; INITIATING_LOGIN_SEQUENCE...
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-900/30 border border-red-500 text-red-500 p-3 rounded flex items-center gap-2 animate-pulse">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-mono text-sm">[ERROR] {error}</span>
              </div>
            )}

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-green-500 opacity-20 blur group-hover:opacity-30 transition duration-300 rounded-lg"></div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ENTER_USERNAME"
                className="relative w-full bg-black border border-green-500/50 text-green-500 p-3 rounded font-mono 
                         placeholder:text-green-500/30 focus:outline-none focus:border-green-400 
                         focus:ring-1 focus:ring-green-400"
              />
            </div>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-green-500 opacity-20 blur group-hover:opacity-30 transition duration-300 rounded-lg"></div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="ENTER_PASSWORD"
                className="relative w-full bg-black border border-green-500/50 text-green-500 p-3 rounded font-mono 
                         placeholder:text-green-500/30 focus:outline-none focus:border-green-400 
                         focus:ring-1 focus:ring-green-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-black font-mono py-3 px-4 rounded 
                       flex items-center justify-center gap-2 transition-all duration-300 relative group"
            >
              <div className="absolute -inset-0.5 bg-green-400 opacity-30 blur group-hover:opacity-50 transition duration-300 rounded"></div>
              <Lock className="w-5 h-5" />
              <span className="relative">AUTHENTICATE</span>
            </button>
          </form>

          <div className="mt-8 space-y-2">
            <div className="flex items-center justify-center gap-2 text-green-500/50 font-mono text-xs">
              <Code className="w-4 h-4" />
              <span className="animate-pulse">[SECURE_CONNECTION_ACTIVE]</span>
            </div>
            <div className="text-center text-green-500/30 font-mono text-xs">
              ENCRYPTION_PROTOCOL: RSA-4096
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
