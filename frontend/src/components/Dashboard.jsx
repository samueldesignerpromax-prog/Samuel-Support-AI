export default function Dashboard({ tickets }) {
  const open = tickets.filter(t => t.status === 'open').length;
  const closed = tickets.filter(t => t.status === 'closed').length;
  return (
    <div className="grid grid-cols-3 gap-4 mb-4">
      <div className="bg-blue-100 p-4 rounded">Open: {open}</div>
      <div className="bg-green-100 p-4 rounded">Closed: {closed}</div>
      <div className="bg-purple-100 p-4 rounded">Total: {tickets.length}</div>
    </div>
  );
}
