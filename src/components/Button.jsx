export default function Button({ children, className = '', ...props }) {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded-xl bg-[var(--primary)] text-white hover:bg-yellow-500 transition ${className}`}
    >
      {children}
    </button>
  );
}
