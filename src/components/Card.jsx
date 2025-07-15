export default function Card({ children, className = '' }) {
  return (
    <div className={`p-4 rounded-xl shadow-md bg-[var(--background)] text-[var(--text)] ${className}`}>
      {children}
    </div>
  );
}
