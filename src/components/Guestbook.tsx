import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowLeft, MessageSquare, Search } from "lucide-react";

interface GuestbookEntry {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

const borderColors = [
  "border-primary",
  "border-secondary",
  "border-accent",
  "border-success",
  "border-warning",
  "border-error",
  "border-info"
];

export function Guestbook({ onViewAll, isFullPage }: { onViewAll?: () => void, isFullPage?: boolean }) {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/guestbook")
      .then(res => res.json())
      .then(data => {
        setEntries(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch guestbook:", err);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const filteredEntries = entries.filter(e => 
    e.name.toLowerCase().includes(search.toLowerCase()) || 
    e.description.toLowerCase().includes(search.toLowerCase())
  );

  const displayEntries = isFullPage ? filteredEntries : entries.slice(0, 6);

  if (isFullPage) {
    return (
      <div className="w-full max-w-6xl mx-auto py-20 px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ x: -5 }}
              onClick={onViewAll}
              className="btn btn-ghost btn-circle"
            >
              <ArrowLeft className="w-6 h-6" />
            </motion.button>
            <div>
              <h1 className="text-4xl font-black flex items-center gap-3">
                <MessageSquare className="text-primary w-8 h-8" />
                Guestbook
              </h1>
              <p className="text-base-content/50 mt-1 font-mono uppercase tracking-widest text-xs">
                {entries.length} signatures in database
              </p>
            </div>
          </div>
          
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search signatures..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input input-bordered pl-12 w-full md:w-72 bg-base-200 border-base-300 focus:border-primary rounded-xl"
            />
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto bg-base-200/50 backdrop-blur-md rounded-2xl border border-base-300 shadow-2xl">
          <table className="table table-lg w-full text-base-content">
            <thead>
              <tr className="border-b border-base-300 text-base-content/50 uppercase tracking-wider text-xs">
                <th className="bg-transparent font-bold">#</th>
                <th className="bg-transparent font-bold">User</th>
                <th className="bg-transparent font-bold">Message</th>
                <th className="bg-transparent font-bold">Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(6)].map((_, i) => (
                  <tr key={i} className="border-b border-base-300/50">
                    <td><div className="skeleton h-4 w-4 bg-base-300"></div></td>
                    <td><div className="skeleton h-4 w-24 bg-base-300"></div></td>
                    <td><div className="skeleton h-4 w-full bg-base-300"></div></td>
                    <td><div className="skeleton h-4 w-32 bg-base-300"></div></td>
                  </tr>
                ))
              ) : (
                <AnimatePresence mode="popLayout">
                  {filteredEntries.map((entry, i) => (
                    <motion.tr 
                      key={entry.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-base-300/50 hover:bg-base-200 transition-colors group cursor-default"
                    >
                      <th className="text-base-content/40 font-mono text-xs font-medium">{entry.id}</th>
                      <td className="font-bold">
                        <span className="text-info font-mono">{entry.name}</span>
                      </td>
                      <td className="text-base-content/80 max-w-md break-words">
                        {entry.description}
                      </td>
                      <td className="text-base-content/40 text-xs font-mono">
                        {formatDate(entry.created_at)}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              )}
            </tbody>
          </table>
          
          {!loading && filteredEntries.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-base-content/50 italic font-medium">No signatures matching "{search}"</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full z-10 mt-12 px-2">
      <div className="flex items-center gap-2 mb-8">
        <motion.div
          animate={{ rotate: [0, -15, 15, -15, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        </motion.div>
        <h2 className="text-2xl font-bold">Guestbook</h2>
        <span className="badge badge-outline text-base-content/40 font-medium">{entries.length} signs</span>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="skeleton h-32 w-full bg-base-200 rounded-xl border border-base-300"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayEntries.map((entry, i) => (
            <motion.div
              key={entry.id}
              className={`group card bg-base-200 backdrop-blur-sm border ${borderColors[i % borderColors.length]} p-5 rounded-xl transition-all duration-300`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.5,
                delay: i * 0.05 
              }}
              whileHover={{ 
                y: -8,
                boxShadow: "0 20px 40px -10px rgba(0,0,0,0.2)",
                scale: 1.02
              }}
            >
              <div className="flex justify-between items-start mb-3">
                <span className="text-info font-mono text-sm font-bold">{entry.name}</span>
              </div>
              <p className="text-base-content/80 text-sm leading-relaxed line-clamp-3 font-medium">{entry.description}</p>
            </motion.div>
          ))}
        </div>
      )}

      <div className="mt-12 flex flex-col items-center gap-4">
        <motion.button 
          onClick={onViewAll}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-outline btn-md rounded-xl px-12"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          View All {entries.length} Signatures
        </motion.button>
        <p className="text-sm text-base-content/40 font-mono font-medium">
          <span className="text-accent">ssh</span> in to leave your mark ✍️
        </p>
      </div>
    </div>
  );
}
